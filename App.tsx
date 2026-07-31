import React, { useState, useEffect } from "react";
import { 
  Bot, 
  Users, 
  Coins, 
  History, 
  UserX, 
  Ban, 
  UserCheck, 
  TrendingUp, 
  Key, 
  PlusCircle, 
  Download, 
  Settings, 
  RefreshCw, 
  ShieldAlert, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Activity, 
  AlertTriangle 
} from "lucide-react";

function formatMaskedId(userId: any): string {
  const str = String(userId);
  return str.length > 5 ? '****' + str.slice(-5) : '****' + str;
}

export default function App() {
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "players" | "withdrawals" | "giftcodes" | "config">("dashboard");
  const [playerSearch, setPlayerSearch] = useState("");
  
  // Giftcode state
  const [giftCount, setGiftCount] = useState(1);
  const [giftAmount, setGiftAmount] = useState(10000);
  const [generatingGift, setGeneratingGift] = useState(false);

  // Config State
  const [customPot, setCustomPot] = useState<number | "">("");
  const [autoPotRate, setAutoPotRate] = useState<number>(0);
  const [lessBetWinsRate, setLessBetWinsRate] = useState<number>(80);
  const [forceNextRound, setForceNextRound] = useState(false);
  const [updatingConfig, setUpdatingConfig] = useState(false);

  // User Actions state
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [coinAmount, setCoinAmount] = useState<number | "">("");
  const [banReason, setBanReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Withdrawal Actions
  const [witReason, setWitReason] = useState<{[key: string]: string}>({});

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      setStatusData(data);
      if (data?.hu) {
        setAutoPotRate(data.hu.autoPotRate || 0);
        setLessBetWinsRate(data.hu.lessBetWinsRate || 0);
      }
    } catch (e) {
      console.error("fetch status error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingConfig(true);
    try {
      const body: any = {
        autoPotRate: Number(autoPotRate),
        lessBetWinsRate: Number(lessBetWinsRate),
        forceNextRound
      };
      if (customPot !== "") {
        body.pot = Number(customPot);
      }
      const res = await fetch("/api/config/pot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setCustomPot("");
        setForceNextRound(false);
        alert("Cập nhật tham số sòng cược thành công!");
        fetchStatus();
      }
    } catch {
      alert("Lỗi cấu hình sòng cược");
    } finally {
      setUpdatingConfig(false);
    }
  };

  const handleGenerateGiftcodes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (giftCount <= 0 || giftAmount <= 0) return;
    setGeneratingGift(true);
    try {
      const res = await fetch("/api/giftcodes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: giftCount, amount: giftAmount })
      });
      if (res.ok) {
        alert(`Đã tạo thành công ${giftCount} giftcode lộc!`);
        fetchStatus();
      }
    } catch {
      alert("Lỗi tạo giftcode");
    } finally {
      setGeneratingGift(false);
    }
  };

  const handlePlayerAction = async (userId: string, action: "ban" | "unban" | "add" | "subtract") => {
    setActionLoading(true);
    try {
      const body: any = { id: userId, action };
      if (action === "ban") body.reason = banReason || "Admin Web Intervention";
      if (action === "add" || action === "subtract") {
        if (!coinAmount || Number(coinAmount) <= 0) {
          alert("Vui lòng nhập số xu hợp lệ!");
          setActionLoading(false);
          return;
        }
        body.money = Number(coinAmount);
      }

      const res = await fetch("/api/players/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        alert("Thực hiện tác vụ thành công!");
        setCoinAmount("");
        setBanReason("");
        setSelectedUser(null);
        fetchStatus();
      }
    } catch {
      alert("Lỗi tác vụ người chơi");
    } finally {
      setActionLoading(false);
    }
  };

  const handleWithdrawalAction = async (userId: string, amount: number, action: "approve" | "reject") => {
    const reason = witReason[`${userId}_${amount}`] || "";
    if (action === "reject" && !reason) {
      alert("Vui lòng nhập lý do từ chối rút!");
      return;
    }
    try {
      const res = await fetch("/api/withdrawals/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, amount, action, reason })
      });
      if (res.ok) {
        alert(action === "approve" ? "Đã duyệt và chuyển khoản thành công!" : "Đã từ chối đơn rút!");
        setWitReason(prev => {
          const next = { ...prev };
          delete next[`${userId}_${amount}`];
          return next;
        });
        fetchStatus();
      }
    } catch {
      alert("Lỗi xử lý đơn rút tiền");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
        <RefreshCw className="w-12 h-12 text-rose-500 animate-spin mb-4" />
        <p className="text-slate-400 font-mono">Đang kết nối cơ sở dữ liệu sòng cược Dragon v5...</p>
      </div>
    );
  }

  // Statistics calculation
  const users = statusData?.users || [];
  const pendingWithdrawals: any[] = [];
  users.forEach((u: any) => {
    if (u.withdrawHistory) {
      u.withdrawHistory.forEach((h: any) => {
        if (h.status === "Đang xử lý") {
          pendingWithdrawals.push({
            userId: u.id,
            name: u.name,
            amount: h.amount,
            time: h.time,
            bankName: h.bankName,
            bankNo: h.bankNo,
            bankUser: h.bankUser,
            fee: h.fee,
          });
        }
      });
    }
  });

  const filteredUsers = users.filter((u: any) => {
    return (
      u.id.toLowerCase().includes(playerSearch.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(playerSearch.toLowerCase()))
    );
  });

  const hũValue = statusData?.hu?.pot || 10000;
  const gamePhaseLabel = 
    statusData?.gamePhase === "BETTING" ? "🟢 ĐANG ĐẶT CƯỢC" :
    statusData?.gamePhase === "LOCKED" ? "🟡 ĐANG CÂN ĐỐI" :
    statusData?.gamePhase === "ROLLING" ? "🎲 ĐANG LẮC DICE" : "🔴 ĐANG KẾT QUẢ";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-150 font-sans selection:bg-rose-500 selection:text-white">
      {/* Header Banner */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl shadow-lg ring-1 ring-rose-500/30">
              <Bot className="w-5 h-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                DRAGON GAME BOT <span className="text-xs bg-rose-500/10 text-rose-400 font-mono border border-rose-500/20 px-2 py-0.5 rounded-full uppercase">VIP Pro v5</span>
              </h1>
              <p className="text-xs text-slate-500 font-mono">Quản lý sòng cược Hoàng Gia và Hũ Rồng Vàng</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a 
              href="/api/download" 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Tải Mã Nguồn (.ZIP)</span>
            </a>
            <button 
              onClick={fetchStatus}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition"
              title="Làm mới trạng thái"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Game Phase HUD & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl relative overflow-hidden flex flex-col justify-between">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">TRẠNG THÁI HỆ THỐNG</div>
            <div className="text-lg font-black text-white">{gamePhaseLabel}</div>
            <div className="text-xs mt-2 text-slate-400 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>Thời gian còn: <strong className="text-rose-400 font-mono">{statusData?.secondsLeft} Giây</strong></span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl flex flex-col justify-between">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">PHIÊN HIỆN TẠI</div>
            <div className="text-3xl font-black font-mono text-amber-500">#{statusData?.phien}</div>
            <div className="text-xs mt-2 text-slate-400">Tự động tăng khi hết chu kỳ cược</div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl flex flex-col justify-between">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">HŨ RỒNG HIỆN TẠI</div>
            <div className="text-2xl font-black text-rose-500 font-mono">{(hũValue).toLocaleString("vi-VN")} <span className="text-xs text-slate-500">xu</span></div>
            <div className="text-xs mt-2 text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tỷ lệ nổ: <strong className="text-emerald-400 font-mono">{statusData?.hu?.autoPotRate}%</strong></span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl flex flex-col justify-between">
            <div className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">ĐƠN RÚT CHỜ DUYỆT</div>
            <div className="text-3xl font-black font-mono text-emerald-400">{pendingWithdrawals.length} đơn</div>
            <div className="text-xs mt-2 text-slate-400">Xem & duyệt tại tab điều hướng</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-900 gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${activeTab === "dashboard" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}
          >
            <Activity className="w-4 h-4" />
            <span>Tổng quan Bots</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("players")}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${activeTab === "players" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}
          >
            <Users className="w-4 h-4" />
            <span>Thành viên ({users.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab("withdrawals")}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap relative ${activeTab === "withdrawals" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}
          >
            <Coins className="w-4 h-4" />
            <span>Duyệt Rút Bank</span>
            {pendingWithdrawals.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
                {pendingWithdrawals.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setActiveTab("giftcodes")}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${activeTab === "giftcodes" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}
          >
            <Key className="w-4 h-4" />
            <span>Quản lý Giftcodes</span>
          </button>

          <button 
            onClick={() => setActiveTab("config")}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${activeTab === "config" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"}`}
          >
            <Settings className="w-4 h-4" />
            <span>Cấu hình Sòng bạc</span>
          </button>
        </div>

        {/* Dashboard / Bots view */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Bots status section */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-rose-500" />
                <span>Trạng thái kết nối 5 Hệ Bot</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {(statusData?.botsStatus || []).map((b: any, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-900 border border-slate-800 rounded-lg relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-500 font-mono">BOT {idx + 1}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${b.active ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                      </div>
                      <div className="font-bold text-white truncate text-sm">{b.name}</div>
                      <div className="text-xs text-rose-400 mt-1 truncate">@{b.username}</div>
                    </div>
                    {b.error && (
                      <div className="mt-3 p-1.5 bg-rose-950/40 rounded border border-rose-900/40 text-[10px] text-rose-400 truncate">
                        Err: {b.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Session Bets list */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-500" />
                  <span>Tổng cược phiên #{statusData?.phien}</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg">
                    <span className="text-xs text-slate-500">🔵 TÀI (T)</span>
                    <div className="text-lg font-bold font-mono text-white">{(statusData?.totals?.totalBetT || 0).toLocaleString("vi-VN")}</div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg">
                    <span className="text-xs text-slate-500">🔴 XỈU (X)</span>
                    <div className="text-lg font-bold font-mono text-white">{(statusData?.totals?.totalBetX || 0).toLocaleString("vi-VN")}</div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg">
                    <span className="text-xs text-slate-500">⚪ CHẮN (C)</span>
                    <div className="text-lg font-bold font-mono text-white">{(statusData?.totals?.totalBetC || 0).toLocaleString("vi-VN")}</div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg">
                    <span className="text-xs text-slate-500">⚫ LẺ (L)</span>
                    <div className="text-lg font-bold font-mono text-white">{(statusData?.totals?.totalBetL || 0).toLocaleString("vi-VN")}</div>
                  </div>
                </div>

                <div className="border border-slate-900 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 font-mono">
                      <tr>
                        <th className="p-3">Người chơi</th>
                        <th className="p-3">Hạng mục</th>
                        <th className="p-3">Cửa cược</th>
                        <th className="p-3 text-right">Số xu đặt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {(statusData?.betsLog || []).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-6 text-center text-slate-600 font-mono">Chưa có người chơi cược ở phiên này...</td>
                        </tr>
                      ) : (
                        statusData.betsLog.slice(-8).reverse().map((bet: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-900/60 text-slate-300">
                            <td className="p-3 font-semibold">{bet.username} ({formatMaskedId(bet.userId)})</td>
                            <td className="p-3 font-mono text-slate-400">{bet.category}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] border border-slate-700 font-bold uppercase">
                                {bet.betType}
                              </span>
                            </td>
                            <td className="p-3 text-right font-bold text-white font-mono">{bet.amount.toLocaleString("vi-VN")}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cauchy history and charts */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-rose-500" />
                  <span>Lịch sử cầu 15 phiên</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-slate-500 font-mono uppercase block mb-1.5">MẠT TÀI XỈU (🔵/🔴)</span>
                    <div className="flex flex-wrap gap-1 p-3 bg-slate-900 border border-slate-800 rounded-lg">
                      {(statusData?.cau || []).length === 0 ? (
                        <span className="text-xs text-slate-600 font-mono">Chưa ghi nhận phiến nào</span>
                      ) : (
                        statusData.cau.slice(0, 15).map((icon: string, idx: number) => (
                          <span key={idx} className="text-xl leading-none select-none">{icon}</span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 font-mono uppercase block mb-1.5">MẶT CHẮN LẺ (⚪/⚫)</span>
                    <div className="flex flex-wrap gap-1 p-3 bg-slate-900 border border-slate-800 rounded-lg">
                      {(statusData?.chanle || []).length === 0 ? (
                        <span className="text-xs text-slate-600 font-mono">Chưa ghi nhận phiến nào</span>
                      ) : (
                        statusData.chanle.slice(0, 15).map((icon: string, idx: number) => (
                          <span key={idx} className="text-xl leading-none select-none">{icon}</span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-rose-950/20 border border-rose-900/20 rounded-lg text-xs leading-relaxed text-rose-300">
                    💡 <strong>Lưu ý:</strong> Hũ Rồng nổ vàng khi 3 viên đồng bộ mặt 1-1-1 hoặc 6-6-6. Bạn có thể can thiệp kích nổ hũ thủ công tại Tab <i>Cấu hình</i>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Players management Tab */}
        {activeTab === "players" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-72">
                <input 
                  type="text" 
                  placeholder="Tìm thành viên (Tên / ID)..." 
                  value={playerSearch}
                  onChange={(e) => setPlayerSearch(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <span className="text-xs text-slate-500 font-mono">Hiển thị {filteredUsers.length} / {users.length} thành viên sòng bạc</span>
            </div>

            <div className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="p-3">ID liên kết</th>
                    <th className="p-3">Tên tài khoản</th>
                    <th className="p-3">Hạng VIP</th>
                    <th className="p-3 text-right">Ví Số Dư</th>
                    <th className="p-3 text-right">Tổng Nạp</th>
                    <th className="p-3 text-right">Tổng Rút</th>
                    <th className="p-3 text-center">Trạng thái</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-slate-600 font-mono">Không tìm thấy thành viên nào trùng khớp...</td>
                    </tr>
                  ) : (
                    filteredUsers.map((u: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-900/40 text-slate-300">
                        <td className="p-3 font-semibold text-white font-mono">{u.id}</td>
                        <td className="p-3 font-bold text-amber-500">{u.name || "N/A"}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[10px] font-bold flex items-center gap-1">
                              {u.vip} {u.vip === "VIP1" ? "🥉" : u.vip === "VIP2" ? "🥈" : u.vip === "VIP3" ? "🥇" : u.vip === "VIP4" ? "👑" : u.vip === "VIP5" ? "💎" : ""}
                            </span>
                            {(u.nap || 0) >= 20000 ? (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px] font-bold">
                                TÂN THỦ ✅
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[9px] font-bold">
                                KHOÁ 🔒
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-right font-black font-mono text-emerald-400">{Math.floor(u.sd || 0).toLocaleString("vi-VN")} xu</td>
                        <td className="p-3 text-right font-mono text-slate-400">{Math.floor(u.nap || 0).toLocaleString("vi-VN")}</td>
                        <td className="p-3 text-right font-mono text-slate-400">{Math.floor(u.rut || 0).toLocaleString("vi-VN")}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.banned ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                            {u.banned ? "KHÓA" : "HOẠT ĐỘNG"}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => setSelectedUser(u)}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 text-[11px] font-bold transition"
                          >
                            Quản lý ví
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Action Drawer Overlay Modal */}
            {selectedUser && (
              <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-white">Quản lý người chơi</h4>
                      <p className="text-xs text-slate-500 font-mono">Tên: {selectedUser.name} | ID: {selectedUser.id}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedUser(null);
                        setCoinAmount("");
                        setBanReason("");
                      }}
                      className="px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800 rounded"
                    >
                      Đóng
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Coin adjuster form */}
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-slate-400">Điều chỉnh số dư ví xu</label>
                      <input 
                        type="number" 
                        placeholder="Nhập số xu cần thay đổi..." 
                        value={coinAmount}
                        onChange={(e) => setCoinAmount(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                      />
                      <div className="flex gap-2">
                        <button 
                          disabled={actionLoading}
                          onClick={() => handlePlayerAction(selectedUser.id, "add")}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition"
                        >
                          Cộng xu (+)
                        </button>
                        <button 
                          disabled={actionLoading}
                          onClick={() => handlePlayerAction(selectedUser.id, "subtract")}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg text-xs transition"
                        >
                          Khấu trừ xu (-)
                        </button>
                      </div>
                    </div>

                    {/* Ban / Unban section */}
                    <div className="pt-6 border-t border-slate-800 space-y-3">
                      <label className="block text-xs font-semibold text-slate-400">Trạng thái tài khoản</label>
                      {selectedUser.banned ? (
                        <button 
                          disabled={actionLoading}
                          onClick={() => handlePlayerAction(selectedUser.id, "unban")}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span>Khai trừ khỏi danh sách đen</span>
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Nhập lý do phạt khóa..." 
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                          />
                          <button 
                            disabled={actionLoading}
                            onClick={() => handlePlayerAction(selectedUser.id, "ban")}
                            className="w-full py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                          >
                            <Ban className="w-4 h-4 text-rose-500" />
                            <span>Khóa vĩnh viễn tài khoản (BAN)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Withdrawals approvals manager */}
        {activeTab === "withdrawals" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Phê duyệt rút tiền VietQR / Bank</span>
            </h3>

            <div className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="p-3">Hồ sơ</th>
                    <th className="p-3">Ngân hàng</th>
                    <th className="p-3">Số tài khoản</th>
                    <th className="p-3">Chủ tài khoản</th>
                    <th className="p-3 text-right">Số xu rút</th>
                    <th className="p-3">Lý do (nếu hủy)</th>
                    <th className="p-3 text-right">Thao tác duyệt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {pendingWithdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-600 font-mono">Tuyệt vời! Không có yêu cầu rút nào đang chờ xử lý...</td>
                    </tr>
                  ) : (
                    pendingWithdrawals.map((w: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-900/40 text-slate-300">
                        <td className="p-3">
                          <div className="font-bold text-white">{w.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">ID: {w.userId} | {w.time}</div>
                        </td>
                        <td className="p-3 font-semibold text-rose-400">{w.bankName}</td>
                        <td className="p-3 font-mono font-bold text-white">{w.bankNo}</td>
                        <td className="p-3 uppercase font-medium">{w.bankUser}</td>
                        <td className="p-3 text-right font-black font-mono text-emerald-400">
                          {w.amount.toLocaleString("vi-VN")} xu
                        </td>
                        <td className="p-3">
                          <input 
                            type="text" 
                            placeholder="Mục lý do khi từ chối..." 
                            value={witReason[`${w.userId}_${w.amount}`] || ""}
                            onChange={(e) => {
                              const note = e.target.value;
                              setWitReason(prev => ({ ...prev, [`${w.userId}_${w.amount}`]: note }));
                            }}
                            className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] text-white focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-right flex justify-end gap-2 my-1">
                          <button 
                            onClick={() => handleWithdrawalAction(w.userId, w.amount, "approve")}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[11px] transition"
                          >
                            Đồng ý
                          </button>
                          <button 
                            onClick={() => handleWithdrawalAction(w.userId, w.amount, "reject")}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold text-[11px] transition"
                          >
                            Từ chối
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Giftcode generating and listing manager */}
        {activeTab === "giftcodes" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-slate-900/40 border border-slate-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-rose-500" />
                <span>Tạo hàng loạt Giftcode</span>
              </h3>

              <form onSubmit={handleGenerateGiftcodes} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase font-mono">Số lượng mã</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={100}
                    value={giftCount}
                    onChange={(e) => setGiftCount(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase font-mono">Mệnh giá xu lộc</label>
                  <input 
                    type="number" 
                    min={1000}
                    step={1000}
                    value={giftAmount}
                    onChange={(e) => setGiftAmount(Math.max(1000, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={generatingGift}
                  className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-lg text-sm shadow-md transition"
                >
                  {generatingGift ? "Đang xử lý tạo..." : "Xác nhận tạo mã"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-slate-900/40 border border-slate-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" />
                <span>Danh sách mã lộc của hệ sòng bạc</span>
              </h3>

              <div className="border border-slate-900 rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono sticky top-0">
                    <tr>
                      <th className="p-3">Mã Giftcode</th>
                      <th className="p-3 text-right">Giá trị lộc</th>
                      <th className="p-3">Người tạo</th>
                      <th className="p-3">Thời gian tạo</th>
                      <th className="p-3">Người dùng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900">
                    {(statusData?.giftcodes || []).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-10 text-center text-slate-600 font-mono">Không tìm thấy Giftcode nào trong hệ thống...</td>
                      </tr>
                    ) : (
                      statusData.giftcodes.slice().reverse().map((g: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-905 text-slate-300">
                          <td className="p-3 font-mono font-bold text-rose-400 select-all">/{g.gift || g.code}</td>
                          <td className="p-3 text-right font-black font-mono text-white">{g.value.toLocaleString("vi-VN")} xu</td>
                          <td className="p-3 font-mono text-slate-400">{g.creatorId}</td>
                          <td className="p-3 text-slate-500 font-mono">{g.createTime}</td>
                          <td className="p-3">
                            {g.userIdUsed ? (
                              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                                HẾT LỘC: {g.userIdUsed}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                                CHƯA DÙNG
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Global sòng bạc configurations parameters */}
        {activeTab === "config" && (
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6  max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-rose-500" />
              <span>Tham số cân đối và Rig Sòng bạc</span>
            </h3>

            <form onSubmit={handleConfigSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Điều chỉnh Quỹ hũ rồng trực tiếp</label>
                <div className="flex gap-2">
                  <span className="bg-slate-900 border border-slate-800 text-slate-400 px-3 py-2 text-sm rounded-lg font-mono">
                    Hiện có: {hũValue.toLocaleString("vi-VN")}
                  </span>
                  <input 
                    type="number" 
                    placeholder="Đặt quỹ mới..." 
                    value={customPot}
                    onChange={(e) => setCustomPot(e.target.value === "" ? "" : Number(e.target.value))}
                    className="flex-1 px-3 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono">Nếu trống, quỹ hũ giữ nguyên</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Tỷ lệ tự động kích nổ hũ rồng (%)</label>
                <input 
                  type="range" 
                  min={0} 
                  max={100}
                  value={autoPotRate}
                  onChange={(e) => setAutoPotRate(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>0% (Chỉ nổ khi 3 mặt trùng 1/6)</span>
                  <span className="text-rose-400 font-bold">{autoPotRate}%</span>
                  <span>100% (Luôn luôn kích nổ)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase font-mono">Hệ số Rig Xúc Xắc: Nhóm ít cược thắng (%)</label>
                <input 
                  type="range" 
                  min={0} 
                  max={100}
                  value={lessBetWinsRate}
                  onChange={(e) => setLessBetWinsRate(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>0% (Ngẫu nhiên hoàn toàn)</span>
                  <span className="text-amber-400 font-bold">{lessBetWinsRate}%</span>
                  <span>100% (Luôn nghiêng về bên ít cược)</span>
                </div>
                <div className="p-3 bg-amber-950/20 border border-amber-900/20 text-amber-300 rounded text-xs leading-relaxed">
                  ⚠️ <strong>Rig Sòng bạc:</strong> Rig sẽ tác động trực tiếp lên bên Tài-Xỉu hoặc Chẵn-Lẻ thặng dư nhỏ hơn để sòng bảo toàn lợi nhuận tối ưu.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={forceNextRound}
                    onChange={(e) => setForceNextRound(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-rose-500 focus:ring-rose-500"
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">Ép nổ hũ Rồng ở phiên kế tiếp!</span>
                    <span className="text-xs text-slate-500 font-mono">Kích hoạt nổ hũ ngay lập tức khi phiên tiếp theo bắt đầu.</span>
                  </div>
                </label>
              </div>

              <button 
                type="submit"
                disabled={updatingConfig}
                className="w-full py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:opacity-90 text-white font-bold rounded-lg text-sm shadow-lg transition"
              >
                {updatingConfig ? "Đang lưu cấu hình sòng..." : "Cập nhật tham số sòng cược"}
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Footer credits information card */}
      <footer className="mt-16 border-t border-slate-900 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-600 font-mono">Sòng cược LuckyBank v5 &bull; Chạy trên nền tảng Cloud Run độc lập 3000</p>
          <p className="text-[10px] text-slate-500 mt-2">Phát triển bởi Đội ngũ Dragon Sòng Bạc &bull; Bản quyền thuộc về hiepkkkkh@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
