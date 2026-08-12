import express from "express";
import path from "path";
import fs from "fs";
import https from "https";
import AdmZip from "adm-zip";
import moment from "moment-timezone";
import TelegramBot from "node-telegram-bot-api";
import "./bot.js";

// --- TYPES & INTERFACES ---
export interface GameState {
  phien: number;
  secondsLeft: number;
  gamePhase: "BETTING" | "LOCKED" | "ROLLING" | "REVEALING";
  totalBetT: number;
  totalBetX: number;
  totalBetC: number;
  totalBetL: number;
  totalBetTC: number;
  totalBetTL: number;
  totalBetXC: number;
  totalBetXL: number;
  totalBetMM: number;
  userBetsTX: { [userId: string]: { betType: string; amount: number } };
  userBetsCL: { [userId: string]: { betType: string; amount: number } };
  userBetsXien: { [userId: string]: { betType: string; amount: number } };
  userBetsDice: { [userId: string]: { betType: string; amount: number }[] };
  userBetsSum: { [userId: string]: { betType: string; amount: number }[] };
  userBetsMM: { [userId: string]: { betType: string; amount: number }[] };
  betsLog: any[];
  chatLocked: boolean;
  isProcessing: boolean;
  canReceiveCommand: boolean;
  phienAnnounced: boolean;
  isExtension: boolean;
  forceNextPotExplosion: boolean;
  autoPotRate: number;
  lessBetWinsRate: number;
  luckyNumber?: string;
  lastCountdownMessageIds: number[];
}

export interface User {
  id: string;
  name: string;
  sd?: number;
  money?: number;
  cuoc?: number;
  thang?: number;
  thua?: number;
  nap?: number;
  rut?: number;
  dkrut?: number;
  hh?: number;
  lastBetResetDate?: string;
  lastBetWeekId?: string;
  cuocHomNay?: number;
  cuocTuanNay?: number;
  vongCuoc?: number;
  currentWinStreak?: number;
  currentLossStreak?: number;
  bestWinStreakToday?: number;
  bestLossStreakToday?: number;
  lastStreakPhien?: number;
  lastStreakResetDate?: string;
  betHistory?: any[];
  depositHistory?: any[];
  withdrawHistory?: any[];
  activeBetGame?: "ROOM_DEFAULT" | "TELEGRAM_XX" | "LODE_TELEGRAM";
  vipPoints?: number;
  vipPointsTotal?: number;
  vipPointCooldown?: number;
  referrerId?: string;
  // Event check-in (YYYY-MM-DD, timezone Asia/Ho_Chi_Minh)
  eventCheckinLastDate?: string;
  eventCheckinStreak?: number;
  linkViolationCount?: number;
  luckyRewardLastDate?: string;
  bankAccount?: string;
  bankName?: string;
  bankOwner?: string;
  pendingTDBet?: {
    amount: number;
    currentMultiplier: number;
    lastRoll: number[];
    time: number;
  };
}

export interface GiftCode {
  gift: string;
  value: number;
  creatorId: string;
  createTime: string;
  useTime: string | null;
  userIdUsed: string | null;
  maxUses?: number;
  usedCount?: number;
  usedBy?: string[];
}

export interface SoloRoom {
  code: string;
  amount: number;
  ownerId: string;
  ownerName: string;
  ownerChatId: string;
  challengerId: string | null;
  challengerName: string | null;
  challengerChatId: string | null;
  ownerRoll: number[] | null;
  challengerRoll: number[] | null;
  ownerTotal: number | null;
  challengerTotal: number | null;
  winnerId: string | null;
  loserId: string | null;
  payout: number | null;
  status: "OPEN" | "ROLLING" | "FINISHED" | "CANCELLED";
  createdAt: number;
  joinedAt: number | null;
  settledAt: number | null;
  rollDeadlineAt?: number | null;
  pinnedMessageId?: number | null;
  resultReason?: string | null;
}

// --- STATE & DATA MANAGEMENT ---
export const userJsonFile = "user.json";
export const giftJsonFile = "gift.json";
export const banJsonFile = "ban.json";
export const vatphamJsonFile = "vatpham.json";
export const thongkeJsonFile = "thongke.json";
export const phienJsFile = "phien.js";
export const soloRoomsJsonFile = "solo_rooms.json";
export const hourlyGiftStateJsonFile = "hourly_gift_state.json";
export const processedTransactionsJsonFile = "processed_transactions.json";
export const lodeBetsJsonFile = "lode_bets.json";
export const xsmbResultsJsonFile = "xsmb_results.json";

export const adminn = process.env.ADMIN_GROUP || "-1003933306407";
export const groupt = process.env.GAME_GROUP || "-1003928586317";
export const gameRoomLink = process.env.GAME_ROOM_LINK || "https://t.me/dragonnroom";

export const SESSION_LIMIT = 10000000;
export const CANCUA_LIMIT = 5000000;
export const DAILY_STREAK_MIN = 4;
export const DAILY_STREAK_PRIZES = [10000, 10000, 10000];
export const SOLO_MIN_BET = 2000;
export const SOLO_PAYOUT_RATE = 1.9;
export const SOLO_ROLL_TIMEOUT_MS = 5 * 60 * 1000;
export const TELEGRAM_XX_MIN_BET = 2000;
export const TELEGRAM_XX_MAX_BET = 199000;
export const TELEGRAM_XX_PAYOUT_RATE = 1.88;
export const HOURLY_ROOM_GIFTCODE_VALUE = 1111;
export const EVENT_KEYWORD = "Dragon.Room";
export const EVENT_DAILY_MIN_DEPOSIT = 30000;
export const EVENT_STREAK_TARGET_DAYS = 7;
export const EVENT_REWARD_GIFTCODE_VALUE = 20000;
// Dùng đường dẫn tuyệt đối để chạy ổn trên Railway/PM2/Docker
export const welcomeStartImagePath = path.join(process.cwd(), "dragon_room_start.png");
export const gameCatalogImagePath = "danh_sach_tro_choi.jpeg";

export const adminId: number[] = [8691091149];
if (process.env.ADMIN_ID) {
  process.env.ADMIN_ID.split(",").forEach((id) => {
    const num = parseInt(id.trim(), 10);
    if (!isNaN(num) && !adminId.includes(num)) adminId.push(num);
  });
}

export const isAdminUser = (userId?: number) => !!userId && adminId.includes(userId);
export const isNoviceUnlocked = (user: any) => (user?.nap || 0) >= 20000;
export const isAdminGroupChat = (chatId?: string | number) => chatId !== undefined && String(chatId) === String(adminn);
export const isGameRoomChat = (chatId?: string | number) => chatId !== undefined && String(chatId) === String(groupt);

export function resetUserDailyStreaks(user: any, resetDate = moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD")) {
  user.currentWinStreak = 0;
  user.currentLossStreak = 0;
  user.bestWinStreakToday = 0;
  user.bestLossStreakToday = 0;
  user.lastStreakPhien = 0;
  user.lastStreakResetDate = resetDate;
}

export function getLatestCompletedPhien(): number {
  if (state.gamePhase === "REVEALING") return state.phien;
  return Math.max(0, state.phien - 1);
}

export function getUserActiveStreakCounts(user: any, latestCompletedPhien = getLatestCompletedPhien()) {
  const isContinuous = Number(user?.lastStreakPhien || 0) === Number(latestCompletedPhien || 0);
  return {
    win: isContinuous ? Number(user?.currentWinStreak || 0) : 0,
    loss: isContinuous ? Number(user?.currentLossStreak || 0) : 0,
  };
}

export function getUserQualifiedStreak(user: any, targetDay: string, latestCompletedPhien = getLatestCompletedPhien()) {
  if (!user || user.lastStreakResetDate !== targetDay) return null;
  const { win, loss } = getUserActiveStreakCounts(user, latestCompletedPhien);
  if (win < DAILY_STREAK_MIN && loss < DAILY_STREAK_MIN) return null;
  if (win >= loss) {
    return { type: "win", count: win, label: "Dây thắng" };
  }
  return { type: "loss", count: loss, label: "Dây thua" };
}

export function getUserStreakStatusText(user: any, latestCompletedPhien = getLatestCompletedPhien()): string {
  const { win, loss } = getUserActiveStreakCounts(user, latestCompletedPhien);
  if (win >= DAILY_STREAK_MIN) return `Dây thắng ${win} phiên`;
  if (loss >= DAILY_STREAK_MIN) return `Dây thua ${loss} phiên`;
  if (win > 0) return `Đang thắng ${win} phiên (từ ${DAILY_STREAK_MIN} phiên mới tính BXH)`;
  if (loss > 0) return `Đang thua ${loss} phiên (từ ${DAILY_STREAK_MIN} phiên mới tính BXH)`;
  return `Chưa có dây hợp lệ`;
}

export function buildDailyStreakLeaderboard(users: any[], targetDay: string, latestCompletedPhien = getLatestCompletedPhien()) {
  return users
    .map((user: any) => {
      const streak = getUserQualifiedStreak(user, targetDay, latestCompletedPhien);
      if (!streak) return null;
      return { user, streak };
    })
    .filter(Boolean)
    .sort((a: any, b: any) =>
      (b.streak.count - a.streak.count) ||
      ((b.user.cuocHomNay || 0) - (a.user.cuocHomNay || 0)) ||
      ((b.user.cuoc || 0) - (a.user.cuoc || 0))
    );
}

export function formatRoomBotMessage(text: string): string {
  const content = String(text || "").trim();
  if (!content) return `<b>Thông báo trống</b>`;
  if (content.startsWith("<b>") && content.endsWith("</b>")) return content;
  return `<b>${content}</b>`;
}

export function getTopUsersBySd(users: any[], count: number): any[] {
  return users
    .filter((u: any) => (u.sd !== undefined ? u.sd : (u.money || 0)) > 0)
    .sort((a: any, b: any) => (b.sd !== undefined ? b.sd : (b.money || 0)) - (a.sd !== undefined ? a.sd : (a.money || 0)))
    .slice(0, count);
}

export function formatTopUsersMessage(topUsers: any[]): string {
  let response = `🏆 <b>TOP ĐẠI GIA SỐ DƯ</b> 🏆\n`;
  if (topUsers.length === 0) {
    response += `Chưa có người chơi nào trong TOP.`;
  } else {
    topUsers.forEach((u: any, idx: number) => {
      const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🏅";
      const name = u.name || "Người chơi";
      const userId = String(u.id || "");
      const balance = Math.floor(u.sd !== undefined ? u.sd : (u.money || 0));
      response += `${medal} TOP ${idx + 1}: ${name} (ID: <code>${userId}</code>) | Số dư: <b>${balance.toLocaleString("vi-VN")} xu</b>\n`;
    });
  }
  return response.trim();
}

export function formatBetTopMessage(topUsers: any[], title: string): string {
  let response = `👑 <b>Top cược ngày trả thưởng tự động vào tối hôm nay (>3m cược ngày)</b>\n\n`;
  response += `  😀Top 1: 30.000\n`;
  response += `  😀Top 2: 20.000\n`;
  response += `  😀Top 3: 10.000\n`;
  response += `  😀Top 4: 5.000\n`;
  response += `  😀Top 5: 5.000\n`;
  response += `  😀Top 6: 5.000\n`;
  
  response += `\n<b>${title}</b>\n\n`;
  if (topUsers.length === 0) {
    response += `Chưa có dữ liệu.`;
  } else {
    topUsers.slice(0, 6).forEach((u: any, idx: number) => {
      const userId = String(u.id || "");
      const maskedId = userId.length > 5 ? `****${userId.slice(-5)}` : userId;
      const amount = (u.cuocHomNay || u.cuocHomQua || u.cuocTuan || 0);
      let displayAmount = "";
      if (amount >= 1000000) {
        const millions = Math.floor(amount / 1000000);
        const remainder = Math.floor((amount % 1000000) / 1000);
        if (remainder > 0) {
          displayAmount = `${millions}m${remainder}`;
        } else {
          displayAmount = `${millions}m`;
        }
      } else {
        displayAmount = (amount / 1000).toLocaleString("vi-VN", { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + "k";
      }
      response += `Top ${idx + 1}: <b>${maskedId}</b>  |  <b>${displayAmount}</b>\n`;
    });
  }
  return response;
}

export function formatDailyStreakTopRoomMessage(users: any[], type: "win" | "loss", requesterId?: string | number) {
  const todayStr = moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
  const latestCompletedPhien = getLatestCompletedPhien();
  const fullLeaderboard = buildDailyStreakLeaderboard(users, todayStr, latestCompletedPhien)
    .filter((entry: any) => entry?.streak?.type === type);
  const filtered = fullLeaderboard.slice(0, 3);

  const title = type === "win" ? `🏆🎗 Top đu dây THẮNG hôm nay (tính tới hiện tại)` : `🏆🎗 Top đu dây THUA hôm nay (tính tới hiện tại)`;
  const requesterRank = requesterId !== undefined
    ? fullLeaderboard.findIndex((entry: any) => String(entry?.user?.id || "") === String(requesterId))
    : -1;

  let response = `${title}\n\n`;
  
  // Hiển thị Top 1, 2, 3
  for (let i = 0; i < 3; i++) {
    const entry = filtered[i];
    if (entry) {
      const u = entry.user || {};
      const streak = entry.streak || {};
      const userId = String(u.id || "");
      const maskedId = userId.length > 5 ? `*****${userId.slice(-5)}` : userId;
      response += `Top ${i + 1}: ${maskedId} | ${streak.count || 0} trận | thưởng 10.000\n`;
    } else {
      response += `Top ${i + 1}: Trống\n`;
    }
  }

  response += `\n`;
  if (requesterRank >= 0) {
    const requesterEntry = fullLeaderboard[requesterRank];
    response += `Bạn đang có dây ${type === "win" ? "thắng" : "thua"} <b>${requesterEntry?.streak?.count || 0} trận</b> liên tiếp.`;
  } else {
    response += `Bạn chưa có dây hợp lệ hôm nay.`;
  }
  return response;
}

export function generateAutoRewardGiftCode(existingCodes: Set<string>, topIndex: number): string {
  // Đồng nhất format giftcode theo room (không gắn tiền tố TOP để tránh rối format)
  return generateUniqueGiftCode(existingCodes);
}

export function updateUserStreakAfterRound(user: any, settledPhien: number, net: number, totalBetAmount: number = 0) {
  if (totalBetAmount < 5000) {
    user.currentWinStreak = 0;
    user.currentLossStreak = 0;
    user.lastStreakPhien = settledPhien;
    user.lastStreakResetDate = moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
    return;
  }
  const todayStr = moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
  if (user.lastStreakResetDate !== todayStr) {
    resetUserDailyStreaks(user, todayStr);
  }

  user.currentWinStreak = Number(user.currentWinStreak || 0);
  user.currentLossStreak = Number(user.currentLossStreak || 0);
  user.bestWinStreakToday = Number(user.bestWinStreakToday || 0);
  user.bestLossStreakToday = Number(user.bestLossStreakToday || 0);

  if (Number(user.lastStreakPhien || 0) !== settledPhien - 1) {
    user.currentWinStreak = 0;
    user.currentLossStreak = 0;
  }

  if (net > 0) {
    user.currentWinStreak += 1;
    user.currentLossStreak = 0;
    user.bestWinStreakToday = Math.max(user.bestWinStreakToday, user.currentWinStreak);
  } else if (net < 0) {
    user.currentLossStreak += 1;
    user.currentWinStreak = 0;
    user.bestLossStreakToday = Math.max(user.bestLossStreakToday, user.currentLossStreak);
  } else {
    user.currentWinStreak = 0;
    user.currentLossStreak = 0;
  }

  user.lastStreakPhien = settledPhien;
  user.lastStreakResetDate = todayStr;
}

export function formatUserCheckMessage(u: any): string {
  const isUnlocked = isNoviceUnlocked(u);
  const vipInfo = getVipTierInfo(u);
  const redeemablePoints = getVipRedeemablePoints(u);
  const balance = Math.floor(u.sd !== undefined ? u.sd : (u.money || 0));
  return `👤 <b>USER CHECK:</b>\n` +
    `🆔 ID: <code>${u.id}</code>\n` +
    `👤 Tên: <b>${u.name || "N/A"}</b>\n` +
    `💵 Số dư: <b>${balance.toLocaleString("vi-VN")} xu</b>\n` +
    `👑 VIP: <b>${getVipLevel(u)} ${vipInfo.badge} (${vipInfo.name})</b>\n` +
    `🚀 Điểm VIP: <b>${vipInfo.levelPoints.toLocaleString("vi-VN")}/${vipInfo.nextThresholdPoints.toLocaleString("vi-VN")}</b>\n` +
    `🖐️ Điểm VIP có thể đổi: <b>${redeemablePoints.toLocaleString("vi-VN")}</b>\n` +
    `🎯 Doanh số cược: <b>${(u.cuoc || 0).toLocaleString("vi-VN")} xu</b>\n` +
    `📥 Tổng nạp: <b>${(u.nap || 0).toLocaleString("vi-VN")} xu</b>\n` +
    `📤 Tổng rút: <b>${(u.rut || 0).toLocaleString("vi-VN")} xu</b>\n` +
    `🔄 Vòng cược còn lại: <b>${Math.ceil(u.vongCuoc || 0).toLocaleString("vi-VN")} xu</b>\n` +
    `🔥 Dây hiện tại: <b>${getUserStreakStatusText(u)}</b>\n` +
    `🔰 Tân Thủ: <b>${isUnlocked ? "Đã mở khóa ✅" : `Chưa mở khóa ❌ (${(u.nap || 0).toLocaleString("vi-VN")}/20.000 xu)`}</b>`;
}

export let waitingCai = { value: false };
export let currentCai: { value: { id: string; name: string; amount: number; pool: number; time: number } | null } = { value: null };
export let caiTimeout: { value: NodeJS.Timeout | null } = { value: null };

export const state: GameState = {
  phien: 1000,
  secondsLeft: 60,
  gamePhase: "BETTING",
  totalBetT: 0,
  totalBetX: 0,
  totalBetC: 0,
  totalBetL: 0,
  totalBetTC: 0,
  totalBetTL: 0,
  totalBetXC: 0,
  totalBetXL: 0,
  totalBetMM: 0,
  userBetsTX: {},
  userBetsCL: {},
  userBetsXien: {},
  userBetsDice: {},
  userBetsSum: {},
  userBetsMM: {},
  betsLog: [],
  chatLocked: false,
  isProcessing: false,
  canReceiveCommand: true,
  phienAnnounced: false,
  isExtension: false,
  forceNextPotExplosion: false,
  autoPotRate: 0,
  lessBetWinsRate: 80,
  lastCountdownMessageIds: [],
};

// Global Promotion State
export let isExtraPromoActive = { value: false };
export let promoTimeout: { value: NodeJS.Timeout | null } = { value: null };
export let promoPinnedMessageId: { value: number | null } = { value: null };

export const readJson = (file: string, def = "[]") => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, def, "utf8");
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return JSON.parse(def);
  }
};

export const writeJson = (file: string, obj: any) => {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2), "utf8");
};

/**
 * Adds deposit to a user with specific logic:
 * - If user cumulative deposit (nap) is < 20,000, then their prior balance (sd, money)
 *   is wiped to 0 BEFORE adding the new deposit amount.
 * - Adds the new deposit (amount) to their balance (sd, money).
 * - Increases u.nap by amount.
 * - Increases u.vongCuoc by amount (x1 wagering).
 */
export function addDepositToUser(user: any, amount: number): { baseResetOccurred: boolean, newlyUnlocked: boolean, totalNapBefore: number, totalNapAfter: number, promoAmount: number, promoRate: number } {
  const totalNapBefore = user.nap || 0;
  const isAlreadyUnlocked = totalNapBefore >= 20000;
  let baseResetOccurred = false;

  if (!isAlreadyUnlocked) {
    user.sd = 0;
    if (user.money !== undefined) user.money = 0;
    baseResetOccurred = true;
  }

  const promoRate = isExtraPromoActive.value ? 0.15 : 0.03;
  const promoAmount = Math.floor(amount * promoRate);
  const totalAdded = amount + promoAmount;

  user.sd = (user.sd || 0) + totalAdded;
  if (user.money !== undefined) user.money = (user.money || 0) + totalAdded;
  user.nap = (user.nap || 0) + amount;
  user.vongCuoc = (user.vongCuoc || 0) + totalAdded;

  const totalNapAfter = user.nap;
  const newlyUnlocked = !isAlreadyUnlocked && (totalNapAfter >= 20000);

  return {
    baseResetOccurred,
    newlyUnlocked,
    totalNapBefore,
    totalNapAfter,
    promoAmount,
    promoRate: promoRate * 100
  };
}

export function createManualDepositRequest(user: any, userId: string | number, amount: number) {
  const now = moment().tz("Asia/Ho_Chi_Minh");
  const time = now.format("YYYY-MM-DD HH:mm:ss");
  const requestId = `${moment().tz("Asia/Ho_Chi_Minh").format("HHmmss")}${Math.floor(100 + Math.random() * 900)}`;
  const content = `MUA ${userId}`;

  if (!user.depositHistory) user.depositHistory = [];
  user.depositHistory.unshift({
    time,
    createdAt: time,
    amount: amount.toLocaleString("vi-VN"),
    status: "Chờ chuyển khoản",
    transferContent: content,
    expiresAt: moment().tz("Asia/Ho_Chi_Minh").add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
    requestId,
    adminNotified: false
  });

  return { time, content, requestId };
}

export const DEPOSIT_ORDER_COOLDOWN_SECONDS = 150;

export function getDepositOrderCooldownRemainingSeconds(user: any) {
  const latestDepositOrder = Array.isArray(user?.depositHistory) && user.depositHistory.length > 0
    ? user.depositHistory[0]
    : null;

  if (!latestDepositOrder) return 0;
  if (!latestDepositOrder.requestId) return 0;

  const currentStatus = String(latestDepositOrder.status || "").trim();
  const isPendingDepositOrder = currentStatus === "Chờ chuyển khoản" || currentStatus === "Chờ kiểm tra";
  if (!isPendingDepositOrder) return 0;

  const createdAtText = latestDepositOrder.createdAt
    || latestDepositOrder.time
    || (latestDepositOrder.expiresAt
      ? moment.tz(latestDepositOrder.expiresAt, "Asia/Ho_Chi_Minh").subtract(10, "minutes").format("YYYY-MM-DD HH:mm:ss")
      : "");

  if (!createdAtText) return 0;

  const createdAt = moment.tz(createdAtText, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
  if (!createdAt.isValid()) return 0;

  const elapsedSeconds = moment().tz("Asia/Ho_Chi_Minh").diff(createdAt, "seconds");
  return Math.max(0, DEPOSIT_ORDER_COOLDOWN_SECONDS - elapsedSeconds);
}

export const DEPOSIT_BANK_CODE = "MB";
export const DEPOSIT_BANK_NAME = "MBBank";
export const DEPOSIT_ACCOUNT_NO = "02222229092002";
export const DEPOSIT_ACCOUNT_NAME = "TO KHANH HIEP";

export function buildDepositQrImageUrl(amount: number, content: string) {
  const accountName = encodeURIComponent(DEPOSIT_ACCOUNT_NAME);
  const addInfo = encodeURIComponent(content);
  return `https://img.vietqr.io/image/${DEPOSIT_BANK_CODE}-${DEPOSIT_ACCOUNT_NO}-qr_only.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
}

export function formatDepositOrderCaption(amount: number, content: string) {
  return `📌 <b>Lệnh nạp ${amount.toLocaleString("vi-VN")} đã tạo.</b>\n\n🏦 <b>Ngân hàng:</b> ${DEPOSIT_BANK_NAME}\n💳 <b>Số TK:</b> <code>${DEPOSIT_ACCOUNT_NO}</code>\n👤 <b>Chủ TK:</b> <b>${DEPOSIT_ACCOUNT_NAME}</b>\n💰 <b>Số tiền:</b> <b>${amount.toLocaleString("vi-VN")}</b>\n📝 <b>Nội dung:</b> <code>${content}</code>\n⏳ <b>Hiệu lực:</b> ~10 phút <i>(Sau khi chuyển khoản xong, bấm nút "Đã Chuyển Khoản" bên dưới để gửi đơn nạp về admin.)</i>`;
}

export function normalizeMoneyNumber(input: any): number {
  if (input === null || input === undefined) return 0;
  if (typeof input === "number") return Math.floor(input);
  const s = String(input).replace(/[^\d]/g, "");
  const n = parseInt(s, 10);
  return isNaN(n) ? 0 : n;
}

export function getVNDateKey(date = moment().tz("Asia/Ho_Chi_Minh")): string {
  return date.format("YYYY-MM-DD");
}

export function isSuccessfulDepositStatus(status: any): boolean {
  const s = String(status || "").toLowerCase();
  return s.includes("thành công");
}

export function getDepositItemDateKey(item: any): string {
  const raw = item?.time || item?.createdAt || item?.useTime || item?.createTime || "";
  if (typeof raw === "string" && raw.length >= 10) return raw.slice(0, 10);
  const m = moment.tz(String(raw), "Asia/Ho_Chi_Minh");
  return m.isValid() ? m.format("YYYY-MM-DD") : "";
}

export function getUserSuccessfulDepositTotalOnDate(user: any, dateKey: string): number {
  const history = Array.isArray(user?.depositHistory) ? user.depositHistory : [];
  let total = 0;
  for (const item of history) {
    if (!isSuccessfulDepositStatus(item?.status)) continue;
    if (getDepositItemDateKey(item) !== dateKey) continue;
    total += normalizeMoneyNumber(item?.amount);
  }
  return total;
}

export function hasUserSuccessfulDepositInLastDays(user: any, days: number): boolean {
  const history = Array.isArray(user?.depositHistory) ? user.depositHistory : [];
  const since = moment().tz("Asia/Ho_Chi_Minh").startOf("day").subtract(Math.max(0, days - 1), "days");
  for (const item of history) {
    if (!isSuccessfulDepositStatus(item?.status)) continue;
    const key = getDepositItemDateKey(item);
    if (!key) continue;
    const m = moment.tz(key, "YYYY-MM-DD", "Asia/Ho_Chi_Minh");
    if (m.isValid() && m.isSameOrAfter(since, "day")) return true;
  }
  return false;
}

export function isTelegramNameQualified(from: any, keyword = EVENT_KEYWORD): boolean {
  const kw = String(keyword).toLowerCase();
  const fullName = `${from?.first_name || ""} ${from?.last_name || ""}`.trim().toLowerCase();
  const username = String(from?.username || "").toLowerCase();
  return fullName.includes(kw) || username.includes(kw);
}

export function createGiftcodeData(code: string, value: number, creatorId: string, maxUses = 1, createTime = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")): GiftCode {
  return {
    gift: normalizeRoomGiftcode(code),
    value,
    creatorId,
    createTime,
    useTime: null,
    userIdUsed: null,
    maxUses: Math.max(1, Math.floor(Number(maxUses) || 1)),
    usedCount: 0,
    usedBy: [],
  };
}

export function createGiftcodeRecord(value: number, creatorId: string, maxUses = 1) {
  const list = readJson(giftJsonFile);
  const existing = new Set<string>(list.map((g: any) => String(g.gift).toUpperCase()));
  const code = generateUniqueGiftCode(existing);
  const record = createGiftcodeData(code, value, creatorId, maxUses);
  writeJson(giftJsonFile, [...list, record]);
  return code;
}

export function initJsonFiles() {
  readJson(userJsonFile, "[]");
  readJson(giftJsonFile, "[]");
  readJson(banJsonFile, "[]");
  readJson(vatphamJsonFile, "[]");
  readJson(thongkeJsonFile, "[]");
  readJson(soloRoomsJsonFile, "[]");
  readJson(hourlyGiftStateJsonFile, "{}");
  readJson("cau.json", "[]");
  readJson("chanle.json", "[]");
  readJson("hu.json", '{"pot": 10000, "history": []}');
  readJson(lodeBetsJsonFile, "[]");
  readJson(xsmbResultsJsonFile, "{}");
  
  if (!fs.existsSync(phienJsFile)) {
    fs.writeFileSync(phienJsFile, "1000", "utf8");
  } else {
    const saved = parseInt(fs.readFileSync(phienJsFile, "utf8"), 10);
    if (!isNaN(saved)) state.phien = saved;
  }

  const hu = readJson("hu.json", '{"pot": 10000, "history": []}');
  hu.pot = 10000;
  writeJson("hu.json", hu);
  if (typeof hu.autoPotRate === "number") state.autoPotRate = hu.autoPotRate;
  if (typeof hu.lessBetWinsRate === "number") state.lessBetWinsRate = hu.lessBetWinsRate;

  const lbFile = "leaderboard_state.json";
  if (!fs.existsSync(lbFile)) {
    writeJson(lbFile, {
      lastResetDay: moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD"),
      lastResetWeek: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-W"),
    });
  }
}

export function savePhien() {
  fs.writeFileSync(phienJsFile, String(state.phien), "utf8");
}

// --- TELEGRAM BOT CONFIGURATION ---
export const tokenBot1 = process.env.BOT_TOKEN_1 || "8925099337:AAG9Qnfmn16qOaGzd_zifUPtSQIFedMJxuY";
export const tokenBot2 = process.env.BOT_TOKEN_2 || "8791648429:AAEnvaEE5SN35np7q_iMC9uTfC7sEuJu8-M";
export const tokenBot3 = process.env.BOT_TOKEN_3 || "8814013514:AAHLziGV5TcIwZUYiPhIxaNc6SygaQiIvq0";
export const tokenBot4 = process.env.BOT_TOKEN_4 || "8575655957:AAEJVpRzOYMDQFDm5gwma83a3OKx9NI2UbY";
export const tokenBot5 = process.env.BOT_TOKEN_5 || "8385475918:AAGDXUOGVOQqRidBsdQdKQWSa3rdAhR-8BI";

export function isTokenValid(token: string) {
  return token && token.trim() !== "" && token.includes(":");
}

const pollDisabled = process.env.DISABLE_TELEGRAM_POLLING === "true";
const botOptions = { polling: !pollDisabled };

export const bot1 = isTokenValid(tokenBot1) ? new TelegramBot(tokenBot1, botOptions) : new TelegramBot("123:dummy1", { polling: false });
export const bot2 = isTokenValid(tokenBot2) ? new TelegramBot(tokenBot2, botOptions) : new TelegramBot("123:dummy2", { polling: false });
export const bot3 = isTokenValid(tokenBot3) ? new TelegramBot(tokenBot3, botOptions) : new TelegramBot("123:dummy3", { polling: false });
export const bot4 = isTokenValid(tokenBot4) ? new TelegramBot(tokenBot4, botOptions) : new TelegramBot("123:dummy4", { polling: false });
export const bot5 = isTokenValid(tokenBot5) ? new TelegramBot(tokenBot5, botOptions) : new TelegramBot("123:dummy5", { polling: false });

export const bots = [bot1, bot2, bot3, bot4, bot5];
export const botUsernames = ["Dragon_1gon_bot", "Dragon_2gon_bot", "Dragon_3gon_bot", "Dragon_4gon_bot", "Dragon_5gon_bot"];
export const botErrors: (string | null)[] = [null, null, null, null, null];

bots.forEach((bot, idx) => {
    bot.on("polling_error", (err) => {
      botErrors[idx] = err.message || "Unknown Error";
    });

    const originSendMessage = bot.sendMessage;
  bot.sendMessage = function(chatId: string | number, text: string, options: any = {}) {
    const finalOpts = { ...options };
    let finalText = text;
    if (String(chatId) === String(groupt)) {
      finalText = formatRoomBotMessage(String(text || ""));
      finalOpts.parse_mode = "HTML";
      
      if (!finalOpts.reply_markup) {
        finalOpts.reply_markup = { remove_keyboard: true };
      }
    }
    return originSendMessage.call(this, chatId, finalText, finalOpts);
  };
});

bots.forEach((bot) => {
  const b = bot as any;
  if (b.options?.polling && typeof b.deleteWebHook === "function") {
    b.deleteWebHook().catch(() => {});
  }
});

if (isTokenValid(tokenBot1)) bot1.getMe().then(me => { botUsernames[0] = me.username || botUsernames[0]; }).catch(e => botErrors[0] = e.message);
if (isTokenValid(tokenBot2)) bot2.getMe().then(me => { botUsernames[1] = me.username || botUsernames[1]; }).catch(e => botErrors[1] = e.message);
if (isTokenValid(tokenBot3)) bot3.getMe().then(me => { botUsernames[2] = me.username || botUsernames[2]; }).catch(e => botErrors[2] = e.message);
if (isTokenValid(tokenBot4)) bot4.getMe().then(me => { botUsernames[3] = me.username || botUsernames[3]; }).catch(e => botErrors[3] = e.message);
if (isTokenValid(tokenBot5)) bot5.getMe().then(me => { botUsernames[4] = me.username || botUsernames[4]; }).catch(e => botErrors[4] = e.message);

export async function sendMessageToRoom(text: string, options: any = {}) {
  const list = [bot1, bot2, bot3, bot4, bot5];
  const trySend = async (idx: number): Promise<any> => {
    if (idx >= list.length) return null;
    try {
      const bot = list[idx];
      // Gỡ bỏ hoàn toàn logic tự động lấy _currentMsgId để reply ngầm
      return await bot.sendMessage(groupt, text, options);
    } catch {
      return await trySend(idx + 1);
    }
  };
  return await trySend(0);
}

export function sendResilientReply(chatId: string | number, text: string, options: any = {}) {
  const list = [bot3, bot1, bot2, bot5, bot4];
  const trySend = (idx: number) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(chatId, text, options).catch(() => trySend(idx + 1));
  };
  trySend(0);
}

export function sendSoloReply(chatId: string | number, text: string, options = {}) {
  return bot1.sendMessage(chatId, text, options).catch(() => null);
}

export function sendSoloRoomAnnouncement(text: string, options = {}) {
  return bot1.sendMessage(groupt, text, options).catch(() => null);
}

export function sendMessageToAdminGroup(text: string, options = {}) {
  const list = [bot1, bot2, bot3, bot5, bot4];
  const trySend = (idx: number) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(adminn, text, options).catch(() => trySend(idx + 1));
  };
  trySend(0);
}

export function getMainMenuReplyMarkup() {
  return {
    keyboard: [
      [{ text: "📚 Danh Sách Game" }, { text: "👤 Ví Cá Nhân" }],
      [{ text: "🎖 Đua Tôp" }, { text: "🏮 Đại Lý Hoa Hồng" }],
      [{ text: "🎪 EVENT" }, { text: "🆘 Hỗ Trợ" }],
    ],
    resize_keyboard: true,
  };
}

export function getWelcomeStartCaption(chatId: string | number, name: string, balance: number): string {
  return `🥂 Xin chào chủ nhân Hihiiii!\n\n` +
    `⭐ ID của bạn là: <code>${chatId}</code>\n` +
    `⭐ Số dư: <b>${balance.toLocaleString("vi-VN")}đ</b>\n\n` +
    `Tham gia Room nhận giftcode hàng ngày: https://t.me/dragonnroom nhé`;
}

export function sendWelcomeStartMessage(chatId: string | number, name: string = "Hảo Hán") {
  const users = readJson(userJsonFile);
  const user = users.find((u: any) => String(u.id) === String(chatId));
  const balance = user ? (user.sd !== undefined ? user.sd : (user.money || 0)) : 0;
  
  const caption = getWelcomeStartCaption(chatId, name, balance);
  const options = {
    parse_mode: "HTML" as const,
    disable_web_page_preview: true,
    reply_markup: getMainMenuReplyMarkup(),
  };

  const imgPath = String(welcomeStartImagePath);
  const photo: any = fs.existsSync(imgPath) ? fs.createReadStream(imgPath) : imgPath;

  bot1.sendPhoto(chatId, photo, {
    caption,
    parse_mode: "HTML",
    reply_markup: getMainMenuReplyMarkup(),
  }).catch((err) => {
    console.log("sendPhoto failed:", err);
    console.log("image exists?", fs.existsSync(imgPath), imgPath);
    bot1.sendMessage(chatId, caption, options).catch(() => null);
  });
  return;

  bot1.sendMessage(chatId, caption, options).catch(() => null);
}

export function sendAndPinToAdminGroup(text: string, onPinned?: (id: number) => void) {
  const list = [bot1, bot2, bot3, bot4, bot5];
  const trySend = (idx: number) => {
    if (idx >= list.length) return;
    const bot = list[idx];
    bot.sendMessage(adminn, text, { parse_mode: "HTML" }).then((msg) => {
      bot.pinChatMessage(adminn, msg.message_id).then(() => {
        if (onPinned) onPinned(msg.message_id);
      }).catch(() => {
        if (onPinned) onPinned(msg.message_id);
      });
    }).catch(() => trySend(idx + 1));
  };
  trySend(0);
}

export function unpinFromAdminGroup(messageId: number) {
  const list = [bot1, bot2, bot3, bot4, bot5];
  const msgIdNum = parseInt(String(messageId), 10);
  if (isNaN(msgIdNum)) return;
  list.forEach((bot) => {
    bot.unpinChatMessage(adminn, { message_id: msgIdNum }).catch(() => {});
    bot.unpinChatMessage(adminn, { messageId: msgIdNum } as any).catch(() => {});
  });
}

export function pinGroupMessageWithResilience(chatId: string, messageId: number) {
  const list = [bot2, bot5, bot1, bot3, bot4];
  const tryPin = (idx: number) => {
    if (idx >= list.length) return;
    list[idx].pinChatMessage(chatId, messageId).catch(() => tryPin(idx + 1));
  };
  tryPin(0);
}

export function sendAndPinToGameRoom(text: string, options: any = {}, onPinned?: (id: number) => void) {
  const finalOpts = { parse_mode: "HTML", ...options };
  const list = [bot1, bot2, bot5, bot3, bot4];
  const trySend = (idx: number) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(groupt, text, finalOpts).then((msg) => {
      pinGroupMessageWithResilience(groupt, msg.message_id);
      if (onPinned) onPinned(msg.message_id);
    }).catch(() => trySend(idx + 1));
  };
  trySend(0);
}

export function unpinFromGameRoom(messageId: number) {
  const msgIdNum = parseInt(String(messageId), 10);
  if (isNaN(msgIdNum)) return;
  [bot1, bot2, bot3, bot4, bot5].forEach((bot) => {
    bot.unpinChatMessage(groupt, { message_id: msgIdNum }).catch(() => {});
    bot.unpinChatMessage(groupt, { messageId: msgIdNum } as any).catch(() => {});
  });
}

export function removePinnedSoloRoomMessage(messageId: number) {
  const msgIdNum = parseInt(String(messageId), 10);
  if (isNaN(msgIdNum)) return;
  unpinFromGameRoom(msgIdNum);
  [bot1, bot2, bot3, bot4, bot5].forEach((bot) => {
    bot.deleteMessage(groupt, String(msgIdNum)).catch(() => {});
  });
}

export function clearSoloRoomPin(room?: SoloRoom | null) {
  const msgIdNum = parseInt(String(room?.pinnedMessageId || ""), 10);
  if (isNaN(msgIdNum)) return;
  removePinnedSoloRoomMessage(msgIdNum);
  room!.pinnedMessageId = null;
}

export function lockGroupChat() {
  state.chatLocked = true;
  bot5.setChatPermissions(groupt, {
    can_send_messages: false,
    can_send_media_messages: false,
    can_send_polls: false,
    can_send_other_messages: false,
    can_add_web_page_previews: false,
  } as any).catch(() => {});
}

export function unlockGroupChat() {
  state.chatLocked = false;
  bot5.setChatPermissions(groupt, {
    can_send_messages: true,
    can_send_media_messages: true,
    can_send_polls: true,
    can_send_other_messages: true,
    can_add_web_page_previews: true,
  } as any).catch(() => {});
}

// --- UTILITIES ---
export function formatMaskedId(id: string | number): string {
  const s = String(id);
  return s.length > 5 ? "*****" + s.slice(-5) : s;
}

export function parseBetText(inputText: string): { category: string; type: string; amountStr: string } | null {
  const raw = inputText.trim().toLowerCase();
  const words = raw.split(/\s+/);
  if (words.length < 2) return null;

  // MM [1-9] [tiền]
  if (words[0] === "mm" && words.length >= 3) {
    if (/^[1-9]$/.test(words[1])) {
      return { category: "MM", type: `mm${words[1]}`, amountStr: words[2] };
    }
    return null;
  }

  const dict: { [key: string]: { cat: string; type: string } } = {
    t: { cat: "TX", type: "t" }, tai: { cat: "TX", type: "t" },
    x: { cat: "TX", type: "x" }, xiu: { cat: "TX", type: "x" },
    c: { cat: "CL", type: "c" }, chan: { cat: "CL", type: "c" },
    l: { cat: "CL", type: "l" }, le: { cat: "CL", type: "l" },
    tt: { cat: "TX", type: "t" }, xx: { cat: "TX", type: "x" },
    cc: { cat: "CL", type: "c" }, ll: { cat: "CL", type: "l" },
    tc: { cat: "XIÊN", type: "tc" }, tl: { cat: "XIÊN", type: "tl" },
    xc: { cat: "XIÊN", type: "xc" }, xl: { cat: "XIÊN", type: "xl" },
    xxc: { cat: "DICE", type: "xxc" }, xxl: { cat: "DICE", type: "xxl" },
    xxx: { cat: "DICE", type: "xxx" }, xxt: { cat: "DICE", type: "xxt" },
  };

  const choice = dict[words[0]];
  if (choice) {
    return { category: choice.cat, type: choice.type, amountStr: words[1] };
  }

  if (/^d[1-6]$/.test(words[0])) {
    return { category: "DICE", type: words[0], amountStr: words[1] };
  }

  if (/^sb(1[0-8]|[3-9])$/.test(words[0])) {
    return { category: "SUM", type: words[0], amountStr: words[1] };
  }

  if (words[0] === "sb" && words.length >= 3) {
    if (/^(1[0-8]|[3-9])$/.test(words[1])) {
      return { category: "SUM", type: "sb" + words[1], amountStr: words[2] };
    }
  }

  if (words[0] === "td") {
    return { category: "TD", type: "td", amountStr: words[1] };
  }

  return null;
}

export function parseBetAmount(amountText: string, balance: number, combined: number, sessionLimit: number): number {
  const raw = String(amountText || "").trim().toLowerCase();
  if (!raw) return Number.NaN;

  if (raw === "max" || raw === "all") {
    return Math.min(balance, sessionLimit - combined, 5000000);
  }

  const normalized = raw.replace(/[,_\s]/g, "");
  const match = normalized.match(/^(\d+(?:\.\d+)?)([km])?$/);
  if (!match) return Number.NaN;

  const baseValue = Number(match[1]);
  if (!Number.isFinite(baseValue)) return Number.NaN;

  const multiplier = match[2] === "m" ? 1000000 : match[2] === "k" ? 1000 : 1;
  return Math.floor(baseValue * multiplier);
}

export function isTaiSideType(type: string): boolean {
  const normalized = String(type || "").toLowerCase();
  return normalized === "t" || normalized === "tc" || normalized === "tl";
}

export function isXiuSideType(type: string): boolean {
  const normalized = String(type || "").toLowerCase();
  return normalized === "x" || normalized === "xc" || normalized === "xl";
}

export const VIP_TIERS = [
  { level: 0, badge: "🥉", name: "Đồng", thresholdPoints: 0, exchangeRate: 100 },
  { level: 1, badge: "🥈", name: "Bạc", thresholdPoints: 10, exchangeRate: 100 },
  { level: 2, badge: "🥇", name: "Vàng", thresholdPoints: 50, exchangeRate: 200 },
  { level: 3, badge: "⭐", name: "Bạch Kim", thresholdPoints: 100, exchangeRate: 300 },
  { level: 4, badge: "💎", name: "Kim Cương", thresholdPoints: 500, exchangeRate: 400 },
  { level: 5, badge: "🏆", name: "Cao Thủ", thresholdPoints: 1000, exchangeRate: 500 },
  { level: 6, badge: "⚔️", name: "Chiến Tướng", thresholdPoints: 5000, exchangeRate: 600 },
  { level: 7, badge: "💎", name: "Đại Tướng", thresholdPoints: 10000, exchangeRate: 700 },
  { level: 8, badge: "👑", name: "Huyền Thoại", thresholdPoints: 50000, exchangeRate: 800 },
  { level: 9, badge: "💰", name: "Chí Tôn", thresholdPoints: 100000, exchangeRate: 1000 },
];

export function getVipPoints(user: any): number {
  return Math.max(0, Number(user?.vipPoints || 0));
}

export function getVipRedeemablePoints(user: any): number {
  return getVipPoints(user);
}

export function getVipTierInfo(user: any) {
  const points = getVipPoints(user);
  // Khởi tạo vipPointsTotal nếu chưa có
  if (user.vipPointsTotal === undefined) {
    user.vipPointsTotal = points;
  }
  // Sử dụng vipPointsTotal để tính cấp VIP
  const levelPoints = Math.max(points, user.vipPointsTotal);
  
  let tier = VIP_TIERS[0];
  for (const item of VIP_TIERS) {
    if (levelPoints >= item.thresholdPoints) tier = item;
  }
  const nextTier = VIP_TIERS.find((item) => item.level === tier.level + 1) || null;
  return {
    ...tier,
    points, // Điểm hiện có để đổi
    levelPoints, // Điểm dùng để tính cấp VIP
    nextTier,
    nextThresholdPoints: nextTier?.thresholdPoints || tier.thresholdPoints,
  };
}

export function getVipLevel(user: any): string {
  return `VIP${getVipTierInfo(user).level}`;
}

export function isTelegramXXBetType(type: string): boolean {
  return ["xxc", "xxl", "xxx", "xxt"].includes(String(type || "").toLowerCase());
}

export function getUserActiveBetGame(user: any): "ROOM_DEFAULT" | "TELEGRAM_XX" | "LODE_TELEGRAM" {
  if (user?.activeBetGame === "TELEGRAM_XX") return "TELEGRAM_XX";
  if (user?.activeBetGame === "LODE_TELEGRAM") return "LODE_TELEGRAM";
  return "ROOM_DEFAULT";
}

export function getTelegramXXLabel(type: string): string {
  const map: { [key: string]: string } = {
    xxc: "XXC",
    xxl: "XXL",
    xxx: "XXX",
    xxt: "XXT",
  };
  return map[String(type || "").toLowerCase()] || String(type || "").toUpperCase();
}

export function isTelegramXXWin(type: string, diceValue: number): boolean {
  const normalized = String(type || "").toLowerCase();
  if (normalized === "xxc") return [2, 4, 6].includes(diceValue);
  if (normalized === "xxl") return [1, 3, 5].includes(diceValue);
  if (normalized === "xxx") return [1, 2, 3].includes(diceValue);
  if (normalized === "xxt") return [4, 5, 6].includes(diceValue);
  return false;
}

export function getVipBadge(user: any): string {
  const info = getVipTierInfo(user);
  return info.badge || "";
}

export function getVipRoomBadgePrefix(user: any): string {
  const info = getVipTierInfo(user);
  return `${info.badge}VIP${info.level} `;
}

export function toBoldDigits(value: string | number): string {
  const digitMap: Record<string, string> = {
    "0": "𝟬",
    "1": "𝟭",
    "2": "𝟮",
    "3": "𝟯",
    "4": "𝟰",
    "5": "𝟱",
    "6": "𝟲",
    "7": "𝟳",
    "8": "𝟴",
    "9": "𝟵",
  };
  return String(value ?? "").replace(/\d/g, (digit) => digitMap[digit] || digit);
}

// --- GAME TREN DUOI (TD) LOGIC ---

export function getTDMultiplier(currentSum: number, prediction: "up" | "down"): number {
  let winProb = 0;
  const counts: { [key: number]: number } = { 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:5, 9:4, 10:3, 11:2, 12:1 };
  
  if (prediction === "up") {
    for (let i = currentSum + 1; i <= 12; i++) {
      winProb += counts[i] / 36;
    }
  } else {
    for (let i = 2; i < currentSum; i++) {
      winProb += counts[i] / 36;
    }
  }

  if (winProb <= 0) return 10.0;
  const rawMul = 0.95 / winProb; 
  return Math.max(1.01, parseFloat(rawMul.toFixed(2)));
}

export function getTDRelatedMultipliers(currentSum: number) {
  return {
    up: getTDMultiplier(currentSum, "up"),
    down: getTDMultiplier(currentSum, "down")
  };
}

export function getTDReplyMarkup(currentSum: number, multiplier: number = 1.0) {
  const muls = getTDRelatedMultipliers(currentSum);
  return {
    inline_keyboard: [
      [
        { text: `⬇️ Dưới x${muls.down}`, callback_data: `td_down` },
        { text: `⬆️ Trên x${muls.up}`, callback_data: `td_up` }
      ],
      [{ text: `💵 Nhận tiền x${multiplier.toFixed(2)}`, callback_data: `td_claim` }]
    ]
  };
}

export async function handleTDCommand(userId: string, amount: number, chatId: string | number) {
  const users = readJson(userJsonFile);
  const user = users.find((u: any) => String(u.id) === String(userId));
  if (!user) return;

  const balance = getUserBalance(user);
  if (balance < amount) {
    bot1.sendMessage(chatId, `⚠️ Số dư không đủ để cược ${amount.toLocaleString("vi-VN")} xu!`).catch(() => {});
    return;
  }

  // Tung xúc xắc Telegram thực tế
  const d1 = await bot1.sendDice(chatId);
  const d2 = await bot1.sendDice(chatId);
  const roll1 = [d1.dice?.value || 1, d2.dice?.value || 1];
  const sum1 = roll1[0] + roll1[1];
  
  setUserBalance(user, balance - amount);
  user.cuoc = (user.cuoc || 0) + amount;
  user.cuocHomNay = (user.cuocHomNay || 0) + amount;
  user.cuocTuanNay = (user.cuocTuanNay || 0) + amount;
  applyVipPointFromBet(user, amount);

  user.pendingTDBet = {
    amount: amount,
    currentMultiplier: 1.0,
    lastRoll: roll1,
    time: Date.now()
  };
  writeJson(userJsonFile, users);

  const msg = `${roll1[0]} + ${roll1[1]} = ${sum1}\n` +
    `💰 Mức cược: <b>${amount.toLocaleString("vi-VN")} xu</b>\n\n` +
    `👉 Dự đoán lượt tung tiếp theo cao hơn hay thấp hơn <b>${sum1}</b>?`;

  bot1.sendMessage(chatId, msg, {
    parse_mode: "HTML",
    reply_markup: getTDReplyMarkup(sum1, 1.0)
  });
}

export async function handleTDAction(userId: string, action: string, chatId: string | number, messageId: number) {
  const users = readJson(userJsonFile);
  const user = users.find((u: any) => String(u.id) === String(userId));
  if (!user || !user.pendingTDBet) return;

  const game = user.pendingTDBet;
  const lastSum = game.lastRoll[0] + game.lastRoll[1];

  if (action === "td_claim") {
    const winAmount = Math.floor(game.amount * game.currentMultiplier);
    const balance = getUserBalance(user);
    setUserBalance(user, balance + winAmount);
    user.thang = (user.thang || 0) + winAmount;
    
    const resultMsg = `┏ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━\n` +
      `┣➤ Nội dung cược: <b>TD</b>\n` +
      `┣➤ Số tiền cược: <b>${game.amount.toLocaleString("vi-VN")} xu</b>\n` +
      `┣➤ Tỉ lệ thắng: <b>x${game.currentMultiplier.toFixed(2)}</b>\n` +
      `┣➤ Số tiền nhận: <b>${winAmount.toLocaleString("vi-VN")} xu</b>\n` +
      `┣➤ Số dư mới: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>\n` +
      `┗ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━ ━`;
    
    bot1.editMessageText(resultMsg, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML"
    }).catch(() => {});
    
    delete user.pendingTDBet;
    writeJson(userJsonFile, users);
    return;
  }

  const prediction = action === "td_up" ? "up" : "down";
  const muls = getTDRelatedMultipliers(lastSum);
  const chosenMul = prediction === "up" ? muls.up : muls.down;

  // Tung xúc xắc mới
  const d1 = await bot1.sendDice(chatId);
  const d2 = await bot1.sendDice(chatId);
  const roll2 = [d1.dice?.value || 1, d2.dice?.value || 1];
  const sum2 = roll2[0] + roll2[1];
  
  let isWin = false;
  let isDraw = false;
  
  if (prediction === "up" && sum2 > lastSum) isWin = true;
  else if (prediction === "down" && sum2 < lastSum) isWin = true;
  else if (sum2 === lastSum) isDraw = true;

  if (isWin) {
    const oldMul = game.currentMultiplier;
    game.currentMultiplier *= chosenMul;
    game.lastRoll = roll2;
    game.time = Date.now();
    writeJson(userJsonFile, users);

    const winDiff = Math.floor(game.amount * (game.currentMultiplier - oldMul));
    const msg = `${roll2[0]} + ${roll2[1]} = ${sum2}\n` +
      `✅ <b>Thắng x${chosenMul} (+${winDiff.toLocaleString("vi-VN")})</b>`;
    
    bot1.editMessageText(msg, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      reply_markup: getTDReplyMarkup(sum2, game.currentMultiplier)
    }).catch(() => {});
  } else if (isDraw) {
    const refund = Math.floor(game.amount * game.currentMultiplier * 0.5);
    const balance = getUserBalance(user);
    setUserBalance(user, balance + refund);
    
    const msg = `${roll2[0]} + ${roll2[1]} = ${sum2}\n` +
      `⚪️ <b>Hòa! Bạn nhận lại 50% tiền cược (${refund.toLocaleString("vi-VN")} xu)</b>\n` +
      `Số dư: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>`;
    
    bot1.editMessageText(msg, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML"
    }).catch(() => {});
    
    delete user.pendingTDBet;
    writeJson(userJsonFile, users);
  } else {
    const msg = `${roll2[0]} + ${roll2[1]} = ${sum2}\n` +
      `❌ <b>Bạn đã thua cược!</b>\n` +
      `Số dư: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>`;
    
    bot1.editMessageText(msg, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML"
    }).catch(() => {});
    
    delete user.pendingTDBet;
    writeJson(userJsonFile, users);
  }
}


export function getVipExchangeRate(user: any): number {
  return Math.max(0, Number(getVipTierInfo(user)?.exchangeRate || 0));
}

export function formatVipGuideMessage(user: any): string {
  const info = getVipTierInfo(user);
  const nextLevelText = info.nextTier
    ? `${info.levelPoints.toLocaleString("vi-VN")}/${info.nextThresholdPoints.toLocaleString("vi-VN")} up VIP ${info.nextTier.level}`
    : `${info.levelPoints.toLocaleString("vi-VN")} điểm | Đã đạt VIP tối đa`;
  const redeemablePoints = getVipRedeemablePoints(user);
  const currentRate = getVipExchangeRate(user);
  const vipLines = VIP_TIERS
    .map((item) => `VIP ${item.level}: ${item.badge} (${item.name})`)
    .join("\n");
  const pointLines = VIP_TIERS
    .filter((item) => item.level > 0)
    .map((item) => `VIP ${item.level}: ${item.thresholdPoints.toLocaleString("vi-VN")}`)
    .join("\n");
  const rateLines = VIP_TIERS
    .filter((item) => item.level > 0)
    .map((item) => `VIP ${item.level}: 1 điểm = ${item.exchangeRate.toLocaleString("vi-VN")}`)
    .join("\n");

  return `👑 Cấp VIP hiện tại: ${info.level} ${info.badge} (${info.name})\n` +
    `🚀 Điểm VIP: <b>${nextLevelText}</b>\n` +
    `🖐 Số điểm VIP có thể đổi: <b>${redeemablePoints.toLocaleString("vi-VN")}</b>\n\n` +
    `Với mỗi <b>300K</b> tiền cược, bạn nhận <b>1</b> điểm VIP.\n` +
    `Điểm này dùng để xét tăng cấp VIP và đổi thưởng.\n\n` +
    `💎 Tỉ lệ quy đổi hiện tại: <b>1 điểm = ${currentRate.toLocaleString("vi-VN")}</b>\n\n` +
    `🏆 <b>CẤP VIP VÀ BIỂU TƯỢNG</b>\n` +
    `${vipLines}\n\n` +
    `📌 <b>ĐIỂM YÊU CẦU ĐỂ ĐẠT CẤP VIP</b>\n` +
    `${pointLines}\n\n` +
    `💎 <b>TỈ LỆ QUY ĐỔI ĐIỂM</b>\n` +
    `${rateLines}\n\n` +
    `❤️ <b>Cách đổi điểm VIP</b>\n` +
    `<code>/doidiemvip [số điểm]</code>\n` +
    `VD: <code>/doidiemvip 100</code>`;
}

export function applyVipPointFromBet(user: any, betValue: number): boolean {
  user.vipPoints = Math.max(0, Number(user.vipPoints || 0));
  user.vipPointsTotal = Math.max(user.vipPoints, Number(user.vipPointsTotal || 0));
  user.vipBetAccumulated = Math.max(0, Number(user.vipBetAccumulated || 0));

  const validBet = Math.max(0, Number(betValue || 0));
  if (validBet <= 0) return false;

  user.vipBetAccumulated += validBet;
  const gained = Math.floor(user.vipBetAccumulated / 300000);
  if (gained <= 0) return false;

  user.vipPoints += gained;
  user.vipPointsTotal += gained;
  user.vipBetAccumulated = user.vipBetAccumulated % 300000;
  return true;
}

export function checkAndResetUserBets(user: any) {
  const nowVN = moment().tz("Asia/Ho_Chi_Minh");
  const todayStr = nowVN.format("YYYY/MM/DD");
  const weekId = nowVN.format("YYYY-W");
  if (user.lastBetResetDate !== todayStr) {
    user.cuocHomQua = user.cuocHomNay || 0;
    user.cuocHomNay = 0;
    user.lastBetResetDate = todayStr;
    resetUserDailyStreaks(user, todayStr);
  }
  if (user.lastBetWeekId !== weekId) {
    user.cuocTuan = user.cuocTuanNay || 0;
    user.cuocTuanNay = 0;
    user.lastBetWeekId = weekId;
  }
}

export function isBanned(userId: string | number): boolean {
  const banned = readJson(banJsonFile);
  return banned.some((u: any) => String(u.id) === String(userId));
}

export const ROOM_GIFTCODE_PREFIX = "DRAGON";

export function normalizeRoomGiftcode(code: string): string {
  const raw = String(code ?? "").trim().toUpperCase();
  const prefix = `${ROOM_GIFTCODE_PREFIX}-`;
  if (!raw) return `${prefix}${generateRandomSuffix(8)}`;
  if (raw.startsWith(prefix)) return raw;
  if (raw.startsWith(ROOM_GIFTCODE_PREFIX)) {
    const rest = raw.slice(ROOM_GIFTCODE_PREFIX.length).replace(/^[-_]+/, "");
    return `${prefix}${rest}`;
  }
  return `${prefix}${raw}`;
}

export function generateGiftCode(): string {
  return normalizeRoomGiftcode(generateRandomSuffix(8));
}

export function generateUniqueGiftCode(existingCodes: Set<string>): string {
  let code = "";
  do {
    code = generateGiftCode().toUpperCase();
  } while (existingCodes.has(code));
  existingCodes.add(code);
  return code;
}


export function generateUniqueAdminGiftCode(existingCodes: Set<string>): string {
  // Đồng nhất format giftcode theo room
  return generateUniqueGiftCode(existingCodes);
}

export function generateRandomSuffix(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let res = "";
  const safeLen = Math.max(4, Math.floor(Number(length) || 8));
  for (let i = 0; i < safeLen; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
  return res;
}

// formatMaskedId removed (duplicate)

export function getUserBalance(user: any): number {
  return Math.floor(user?.sd !== undefined ? user.sd : (user?.money || 0));
}

export function getShortInsufficientBalanceMessage(user: any): string {
  const balance = getUserBalance(user);
  if (!isNoviceUnlocked(user) && balance <= 0) {
    return "⚠️ <b>Số Dư Không Đủ!</b> ❌";
  }
  return "⚠️ <b>Số Dư Không Đủ!</b> ❌";
}

export function setUserBalance(user: any, balance: number) {
  user.sd = Math.floor(balance);
  if (user.money !== undefined) user.money = Math.floor(balance);
}

export function readSoloRooms(): SoloRoom[] {
  return readJson(soloRoomsJsonFile, "[]");
}

export function writeSoloRooms(rooms: SoloRoom[]) {
  const normalized = rooms.slice(-200);
  writeJson(soloRoomsJsonFile, normalized);
}

export function generateSoloRoomCode(existingCodes: Set<string>): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  do {
    code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  } while (existingCodes.has(code));
  return code;
}

export function getOpenSoloRooms(rooms: SoloRoom[] = readSoloRooms()): SoloRoom[] {
  return rooms
    .filter((room) => room.status === "OPEN" && !room.challengerId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function formatSoloOpenRooms(rooms: SoloRoom[] = readSoloRooms()): string {
  const openRooms = getOpenSoloRooms(rooms);
  if (openRooms.length === 0) {
    return `(Chưa có phòng mở. Gõ <code>solo [số tiền]</code> để tạo phòng.)`;
  }

  return openRooms.slice(0, 20).map((room, idx) =>
    `${idx + 1}. <b>${room.code}</b> | Chủ phòng: <b>${room.ownerName}</b> | Cược: <b>${room.amount.toLocaleString("vi-VN")} xu</b>`
  ).join("\n");
}

export function formatSoloLobbyMessage(rooms: SoloRoom[] = readSoloRooms()): string {
  return `🎲 <b>GAME SOLO XÚC XẮC</b> 🎲\n` +
    `Tạo phòng và mời bạn bè tham gia đấu xúc xắc. Mỗi người tung <b>1 viên xúc xắc 3D Telegram</b>. Người có kết quả cao hơn sẽ thắng.\n\n` +
    `👉 Số tiền chơi tối thiểu là <b>${SOLO_MIN_BET.toLocaleString("vi-VN")}</b> (không giới hạn tối đa theo cấu hình game, chỉ cần đủ số dư).\n` +
    `- Tỉ lệ trả thưởng <b>${SOLO_PAYOUT_RATE.toFixed(2)}</b>\n\n` +
    `Cách chơi:\n` +
    `<code>solo [Số tiền]</code> để tạo phòng chơi\n` +
    `<code>/solo [Mã phòng]</code> để vào phòng chơi\n` +
    `<code>/xx [Mã phòng]</code> hoặc bấm nút <b>Tung XX</b> để tung xúc xắc\n` +
    `<code>/huy [Mã phòng]</code> để huỷ phòng (Chỉ huỷ khi chưa có ai vào, chỉ được huỷ sau 1 phút tạo phòng)\n\n` +
    `Danh sách các phòng SOLO hiện tại:\n` +
    `${formatSoloOpenRooms(rooms)}`;
}

export function formatRoomDefaultGuideMessage(): string {
  return `💥 <b>GAME TÀI XỈU SĂN HŨ</b> 💥\n` +
    `🏛 Nhóm chơi game: ${gameRoomLink}\n\n` +
    `- T: Tổng 3 viên XX từ 11 - 18 Tài.\n` +
    `- X: Tổng 3 viên XX từ 3 - 10 Xỉu.\n` +
    `- C: Tổng 3 viên XX là Chẵn.\n` +
    `- L: Tổng 3 viên XX là Lẻ.\n\n` +
    `• Tỷ lệ T/X: x1.90 (07:00–19:59) · x1.96 khung 20:00–06:59\n` +
    `• Tỷ lệ C/L: theo bảng game\n` +
    `• Nổ hũ khi 3 viên xúc xắc giống nhau\n\n` +
    `Lệnh cược: [T/X/C/L] [tiền chơi]\n` +
    `VD: T 20000\n\n` +
    `- Cược ẩn danh: TT/XX/CC/LL [tiền chơi]\n` +
    `- Cược tất tay: T max hoặc C max`;
}

export function buildSoloRoomDeepLink(roomCode: string): string {
  return `https://t.me/${botUsernames[0]}?start=solo_${roomCode}`;
}

export function buildReferralDeepLink(userId: string): string {
  return `https://t.me/${botUsernames[0]}?start=ref_${userId}`;
}

export function awardReferralCommission(users: User[], loser: User | undefined, lossAmount: number): void {
  if (!loser || !lossAmount || lossAmount <= 0) return;
  const referrerId = String(loser.referrerId || "").trim();
  if (!referrerId || referrerId === String(loser.id)) return;
  const referrer = users.find((u) => String(u.id) === referrerId);
  if (!referrer) return;
  const commission = Math.floor(lossAmount * 0.01);
  if (commission <= 0) return;
  referrer.hh = (referrer.hh || 0) + commission;
}

export function ensureRandomHourlyGiftSchedule(now = moment().tz("Asia/Ho_Chi_Minh")) {
  const state = readJson(hourlyGiftStateJsonFile, "{}");
  const currentHour = now.hour();
  const windowStartHour = currentHour - (currentHour % 2);
  const windowStart = now.clone().startOf("day").add(windowStartHour, "hours");
  const windowEnd = windowStart.clone().add(2, "hours").subtract(1, "millisecond");
  const windowKey = `${windowStart.format("YYYY-MM-DD-HH")}_2H`;
  const currentNextRunAt = Number(state.nextRunAt || 0);
  const isScheduleValid = state.scheduledWindowKey === windowKey && currentNextRunAt >= windowStart.valueOf() && currentNextRunAt <= windowEnd.valueOf();

  if (!isScheduleValid) {
    const minRunAt = Math.min(windowEnd.valueOf(), now.valueOf() + 15000);
    const randomOffset = Math.max(0, windowEnd.valueOf() - minRunAt);
    state.scheduledWindowKey = windowKey;
    state.nextRunAt = minRunAt + Math.floor(Math.random() * (randomOffset + 1));
    writeJson(hourlyGiftStateJsonFile, state);
  }

  return state;
}

export function maybeDispatchRandomHourlyGiftCode() {
  const now = moment().tz("Asia/Ho_Chi_Minh");
  const currentHour = now.hour();
  const windowStartHour = currentHour - (currentHour % 2);
  const windowKey = `${now.clone().startOf("day").add(windowStartHour, "hours").format("YYYY-MM-DD-HH")}_2H`;
  const state = ensureRandomHourlyGiftSchedule(now);
  if (state.lastDispatchWindowKey === windowKey) return;
  if (Date.now() < Number(state.nextRunAt || 0)) return;

  const giftData = readJson(giftJsonFile);
  const codes: string[] = [];
  for (let i = 0; i < 3; i++) {
    const existingCodes = new Set<string>((giftData || []).map((g: any) => String(g.gift || "").toUpperCase()));
    const newCode = generateUniqueGiftCode(existingCodes);
    codes.push(newCode);
    giftData.push(createGiftcodeData(newCode, HOURLY_ROOM_GIFTCODE_VALUE, "AUTO_HOURLY_ROOM", 1, now.format("YYYY-MM-DD HH:mm:ss")));
  }
  writeJson(giftJsonFile, giftData);

  state.lastDispatchWindowKey = windowKey;
  state.lastGiftCode = codes[0];
  writeJson(hourlyGiftStateJsonFile, state);

  const codesText = codes.map((c, idx) => `${idx + 1}. <tg-spoiler>${c}</tg-spoiler>`).join("\n");
  sendMessageToRoom(
    `🎁<b>CODE TỰ ĐỘNG</b>\n` +
    `⏰<b>Phát ngẫu nhiên</b>\n\n` +
    `${codesText}\n\n` +
    `<i>(Chỉ áp dụng cho người chơi có nạp tiền trong ngày)</i>`,
    { parse_mode: "HTML" }
  ).then((msg) => {
    if (msg && msg.message_id) {
      setTimeout(() => {
        bot1.deleteMessage(groupt, msg.message_id).catch(() => {});
      }, 3 * 60 * 1000); // Tự động xóa sau 3 phút
    }
  });
}

export function formatSoloPinnedRoomMessage(room: SoloRoom): string {
  return `🎲 <b>GAME SOLO XÚC XẮC</b>\n` +
    `👑 Chủ phòng: <b>${room.ownerName}</b>\n` +
    `🎟 Mã phòng: <code>${room.code}</code>\n` +
    `💰 Mức cược: <b>${room.amount.toLocaleString("vi-VN")} xu</b>\n` +
    `⚔️ Vào bot chính để nhập lệnh <code>/solo ${room.code}</code>`;
}

export function formatTelegramXXGuideMessage(): string {
  return `🎲 <b>XÚC XẮC TELEGRAM</b> 🎲\n\n` +
    `Chế độ chơi trực tiếp trong bot chính.\n\n` +
    `Nội dung | Kết quả 1 xúc xắc | Tỷ lệ ăn\n` +
    `<code>XXC</code> | <b>2,4,6</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>\n` +
    `<code>XXL</code> | <b>1,3,5</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>\n` +
    `<code>XXX</code> | <b>1,2,3</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>\n` +
    `<code>XXT</code> | <b>4,5,6</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>\n\n` +
    `👉 Tối thiểu là <b>${TELEGRAM_XX_MIN_BET.toLocaleString("vi-VN")}</b> và tối đa là <b>${TELEGRAM_XX_MAX_BET.toLocaleString("vi-VN")}</b>\n\n` +
    `🔖 Cách chơi: <code>tung xx [Nội dung] [tiền cược]</code>\n` +
    `VD: <code>tung xx XXC 10000</code> hoặc <code>tung xx XXL 10000</code>`;
}

// --- LÔ ĐỀ TELEGRAM ---
export const LODE_MIN_ORDER = 2000;
export const LODE_MAX_ORDER = 2_000_000;
export const LODE_LO_POINT_PRICE = 23_000;
export const LODE_DE_POINT_PRICE = 1_000;
export const LODE_XIEN_POINT_PRICE = 1_000;

export const LODE_LO_PAYOUT_PER_POINT = 80_000; // "23 ăn 80"
export const LODE_DE_PAYOUT_PER_POINT = 90_000; // "Đề: x90" (1 điểm 1k ăn 90k)
export const LODE_XIEN2_MULTIPLIER = 15;
export const LODE_XIEN3_MULTIPLIER = 40;
export const LODE_XIEN4_MULTIPLIER = 100;

export type LoDeBetType = "LO" | "DE" | "XIEN2" | "XIEN3" | "XIEN4";
export interface LoDeBetRecord {
  id: string;
  dateKey: string; // YYYY-MM-DD (Asia/Ho_Chi_Minh)
  userId: string;
  userName: string;
  type: LoDeBetType;
  numbers: string[]; // 2-digit strings
  points: number;
  stake: number; // tiền trừ khi đặt (xu)
  createdAt: number;
  settled?: boolean;
  isWin?: boolean;
  payout?: number; // tiền trả (xu)
  note?: string;
}

export interface XsmbResult {
  dateKey: string; // YYYY-MM-DD
  source: string;
  fetchedAt: number;
  db: string; // giải ĐB
  allPrizeNumbers: string[];
  loto2d: string[]; // danh sách 2 số cuối (có lặp)
  xienPrizeNumbers?: string[]; // giải 1 đến giải 7
  xien2d?: string[]; // 2 số cuối của giải 1 đến giải 7
}

export function formatLoDeTelegramGuideMessage(): string {
  return (
    `🍀<b>LÔ ĐỀ TELEGRAM</b>🍀\n\n` +
    `➡ Kết quả được xác định thông qua <b>KẾT QUẢ XỔ SỐ MIỀN BẮC</b> ngày hôm đó.\n\n` +
    `➡ <b>TỈ LỆ ĐIỂM</b>\n` +
    `• Lô ► 1 điểm ► 23.000 đ\n` +
    `• Đề ► 1 điểm ► 1.000 đ\n` +
    `• Lô Xiên ► 1 điểm ► 1.000 đ\n\n` +
    `🔖 <b>THỂ LỆ</b>\n` +
    `• Lô: 23 ăn 80\n` +
    `• Đề: x90\n` +
    `• Xiên 2: x15\n` +
    `• Xiên 3: x40\n` +
    `• Xiên 4: x100\n\n` +
    `🎮 <b>CÁCH CHƠI</b>\n` +
    `<code>/lo 00 10d</code>\n` +
    `<code>/de 00 10d</code>\n` +
    `<code>/xienhai 00,01 10d</code>\n` +
    `<code>/xienba 00,01,02 10d</code>\n` +
    `<code>/xienbon 00,01,02,03 10d</code>\n\n` +
    `➡ <b>TỔNG TIỀN MỖI LỆNH:</b> 2.000 - 2.000.000\n\n` +
    `💡 Hệ thống tự đối chiếu KQ XSMB và tự trả thưởng sau khi có kết quả.\n` +
    `🎯 Đề lấy theo <b>2 số cuối giải Đặc Biệt</b>.\n` +
    `🔗 Lô Xiên đối chiếu theo <b>giải 1 đến giải 7</b>.\n` +
    `• Xiên 2: phải đủ <b>2 cặp số</b> xuất hiện trong 2 số cuối từ giải 1 đến giải 7.\n` +
    `• Xiên 3: phải đủ <b>3 cặp số</b> xuất hiện trong 2 số cuối từ giải 1 đến giải 7.\n` +
    `• Xiên 4: phải đủ <b>4 cặp số</b> xuất hiện trong 2 số cuối từ giải 1 đến giải 7.\n` +
    `⏰ Thời gian khóa cược: <b>17:30 - 18:50</b> hàng ngày (Thời gian còn lại mở cược bình thường).`
  );
}

function normalize2d(value: string): string | null {
  const v = String(value || "").trim();
  if (!/^\d{2}$/.test(v)) return null;
  return v;
}

function getTodayLoDeDateKey() {
  return moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
}

function getLoDeLockMoment(dateKey: string) {
  // Giờ quay XSMB thường ~18:15, khoá lệnh từ 18:10 (giảm rủi ro vào sát giờ)
  return moment.tz(`${dateKey} 18:50:00`, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
}

export function isLoDeBettingOpen(): boolean {
  const now = moment().tz("Asia/Ho_Chi_Minh");
  const dateKey = now.format("YYYY-MM-DD");
  const lockStartTime = moment.tz(`${dateKey} 17:30:00`, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
  const lockEndTime = moment.tz(`${dateKey} 18:50:00`, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
  
  // Chỉ khóa cược nếu thời gian hiện tại nằm trong khoảng 17:30 - 18:50
  const isInsideLockWindow = now.isSameOrAfter(lockStartTime) && now.isBefore(lockEndTime);
  return !isInsideLockWindow;
}

function httpGetText(url: string, timeoutMs = 20_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; DragonRoomBot/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      }
    }, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("Request timeout"));
    });
  });
}

function dmyToDateKey(dmy: string): string | null {
  const m = String(dmy || "").trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

export async function fetchXsmbResultFromXosoComVn(dateKey: string): Promise<XsmbResult | null> {
  try {
    const target = moment.tz(dateKey, "YYYY-MM-DD", "Asia/Ho_Chi_Minh");
    if (!target.isValid()) return null;

    const slug = target.format("DD-MM-YYYY");
    const dateMarker = `id=kqngay_${target.format("DDMMYYYY")}_kq`;
    const todayKey = getTodayLoDeDateKey();
    const urls = dateKey === todayKey
      ? [
          `https://xoso.com.vn/xsmb-${slug}.html`,
          "https://xoso.com.vn/xo-so-mien-bac/xsmb-p1.html",
        ]
      : [`https://xoso.com.vn/xsmb-${slug}.html`];

    for (const url of urls) {
      const html = await httpGetText(url);
      if (!html || !html.includes(dateMarker)) continue;

      const dbMatch = html.match(/id=(?:"|')?mb_prizeDB_item0(?:"|')?[^>]*>\s*(\d{5})\s*<\/span>/i);
      if (!dbMatch) continue;

      const allPrizeNumbers = Array.from(
        html.matchAll(/id=(?:"|')?mb_prize(?:DB|\d+)_item\d+(?:"|')?[^>]*>\s*(\d{2,6})\s*<\/span>/gi)
      ).map((m) => m[1].trim());

      if (allPrizeNumbers.length === 0) continue;

      const db = dbMatch[1].trim();
      const loto2d = allPrizeNumbers.map((n) => String(n).slice(-2).padStart(2, "0"));
      const xienPrizeNumbers = Array.from(
        html.matchAll(/id=(?:"|')?mb_prize([1-7])_item\d+(?:"|')?[^>]*>\s*(\d{2,6})\s*<\/span>/gi)
      ).map((m) => m[2].trim());
      const xien2d = xienPrizeNumbers.map((n) => String(n).slice(-2).padStart(2, "0"));

      return {
        dateKey,
        source: "xoso.com.vn",
        fetchedAt: Date.now(),
        db,
        allPrizeNumbers,
        loto2d,
        xienPrizeNumbers,
        xien2d,
      };
    }

    return null;
  } catch (e) {
    console.error("fetchXsmbResultFromXosoComVn error:", e);
    return null;
  }
}

let isLoDeSettling = false;
export async function settleLoDeForDate(dateKey: string) {
  if (isLoDeSettling) return;
  isLoDeSettling = true;
  try {
    const users = readJson(userJsonFile);
    const bets: LoDeBetRecord[] = readJson(lodeBetsJsonFile, "[]");
    const resultsCache = readJson(xsmbResultsJsonFile, "{}");

    let result: XsmbResult | null = resultsCache?.[dateKey] || null;
    if (!result) {
      result = await fetchXsmbResultFromXosoComVn(dateKey);
      if (!result) return;
      resultsCache[dateKey] = result;
      writeJson(xsmbResultsJsonFile, resultsCache);
    }

    const db2d = String(result.db || "").slice(-2).padStart(2, "0");
    const counts = new Map<string, number>();
    (result.loto2d || []).forEach((x) => counts.set(x, (counts.get(x) || 0) + 1));
    const xienCounts = new Map<string, number>();
    const xien2d = Array.isArray(result.xien2d) && result.xien2d.length > 0
      ? result.xien2d
      : (result.allPrizeNumbers || []).slice(1).map((n) => String(n).slice(-2).padStart(2, "0"));
    xien2d.forEach((x) => xienCounts.set(x, (xienCounts.get(x) || 0) + 1));

    const pending = bets.filter(b => b.dateKey === dateKey && !b.settled);
    if (pending.length === 0) return;

    const perUserSummary = new Map<string, { win: number; lose: number; payout: number; stake: number }>();

    for (const bet of pending) {
      const u = users.find((x: any) => String(x.id) === String(bet.userId));
      if (!u) {
        bet.settled = true;
        bet.isWin = false;
        bet.payout = 0;
        bet.note = "Không tìm thấy user để trả thưởng.";
        continue;
      }

      const points = Math.max(0, Math.floor(Number(bet.points) || 0));
      const nums = Array.isArray(bet.numbers) ? bet.numbers : [];
      let payout = 0;
      let isWin = false;
      let note = "";

      if (bet.type === "LO") {
        const n = nums[0];
        const hit = counts.get(n) || 0;
        if (hit > 0 && points > 0) {
          payout = points * LODE_LO_PAYOUT_PER_POINT * hit;
          isWin = true;
          note = `Trúng ${hit} nháy`;
        }
      } else if (bet.type === "DE") {
        const n = nums[0];
        if (n === db2d && points > 0) {
          payout = points * LODE_DE_PAYOUT_PER_POINT;
          isWin = true;
          note = "Trúng Đề giải Đặc Biệt";
        }
      } else if (bet.type === "XIEN2" || bet.type === "XIEN3" || bet.type === "XIEN4") {
        const required = getRequiredXiCount(bet.type);
        const okCount = nums.slice(0, required).every((n) => (xienCounts.get(n) || 0) > 0);
        if (okCount && points > 0) {
          const mul = bet.type === "XIEN2" ? LODE_XIEN2_MULTIPLIER : bet.type === "XIEN3" ? LODE_XIEN3_MULTIPLIER : LODE_XIEN4_MULTIPLIER;
          payout = points * LODE_XIEN_POINT_PRICE * mul;
          isWin = true;
          note = "Trúng Xiên theo giải 1 đến giải 7";
        }
      }

      if (payout > 0) {
        setUserBalance(u, getUserBalance(u) + payout);
        u.thang = (u.thang || 0) + payout;
      } else {
        u.thua = (u.thua || 0) + (bet.stake || 0);
      }

      u.cuoc = (u.cuoc || 0) + (bet.stake || 0);
      u.cuocHomNay = (u.cuocHomNay || 0) + (bet.stake || 0);
      u.cuocTuanNay = (u.cuocTuanNay || 0) + (bet.stake || 0);

      bet.settled = true;
      bet.isWin = isWin;
      bet.payout = payout;
      bet.note = note;

      const statusIcon = isWin ? "🎉" : "💀";
      const statusText = isWin ? "Thắng" : "Thua";
      const typeLabel = getLoDeTypeLabel(bet.type);
      
      // Gửi thông báo riêng cho từng lệnh cược
      const userNotify = `${statusIcon} <b>${statusText} Lệnh ${typeLabel}</b> ${statusIcon}\n` +
                         `${statusIcon} <b>Số cược:</b> <code>${nums.join(",")}</code>\n` +
                         `${statusIcon} <b>Số tiền:</b> <b>${isWin ? "+" + payout.toLocaleString("vi-VN") : "-" + (bet.stake || 0).toLocaleString("vi-VN")} xu</b>\n` +
                         `💵 <b>Số dư hiện tại:</b> <b>${getUserBalance(u).toLocaleString("vi-VN")} xu</b>`;
      bot1.sendMessage(bet.userId, userNotify, { parse_mode: "HTML" }).catch(() => {});

      // Nếu thắng thì gửi thêm thông báo lên room theo định dạng THẮNG LỚN
      if (isWin) {
        const maskedId = bet.userId.length > 5 ? `*****${bet.userId.slice(-5)}` : bet.userId;
        const bigWinMsg = `🎉 <b>THẮNG LỚN</b> 🎉\n` +
                          `👤 <b>Người chơi:</b> <code>${maskedId}</code>\n` +
                          `🎮 <b>Game:</b> <b>Lô Đề ${typeLabel}</b>\n` +
                          `💵 <b>Tiền cược:</b> <b>${(bet.stake || 0).toLocaleString("vi-VN")}</b>\n` +
                          `💰 <b>Tiền nhận:</b> <b>${payout.toLocaleString("vi-VN")}</b>`;
        bot1.sendMessage(groupt, bigWinMsg, { parse_mode: "HTML" }).catch(() => {});
      }

      const sum = perUserSummary.get(String(bet.userId)) || { win: 0, lose: 0, payout: 0, stake: 0 };
      sum.stake += bet.stake || 0;
      if (payout > 0) {
        sum.win += 1;
        sum.payout += payout;
      } else {
        sum.lose += 1;
      }
      perUserSummary.set(String(bet.userId), sum);
    }

    writeJson(userJsonFile, users);
    writeJson(lodeBetsJsonFile, bets);

    // Gửi thông báo tổng hợp kết quả ngày cho user
    for (const [uid, sum] of perUserSummary.entries()) {
      const text =
        `🍀 <b>KẾT QUẢ LÔ ĐỀ (${dateKey})</b>\n` +
        `Đề (2 số ĐB): <b>${db2d}</b>\n\n` +
        `✅ Tổng lệnh trúng: <b>${sum.win}</b>\n` +
        `❌ Tổng lệnh trượt: <b>${sum.lose}</b>\n` +
        `💸 Tổng tiền nhận: <b>${sum.payout.toLocaleString("vi-VN")} xu</b>`;
      bot1.sendMessage(uid, text, { parse_mode: "HTML" }).catch(() => {});
    }
  } finally {
    isLoDeSettling = false;
  }
}

export async function maybeAutoSettleLoDe() {
  const now = moment().tz("Asia/Ho_Chi_Minh");
  const dateKey = now.format("YYYY-MM-DD");
  // chỉ chạy sau 18:50
  if (now.isBefore(moment.tz(`${dateKey} 18:50:00`, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh"))) return;
  await settleLoDeForDate(dateKey);
}

function parseLoDePointsToken(raw: string): number | null {
  const m = String(raw || "").trim().match(/^(\d+)\s*(d|đ)$/i);
  if (!m) return null;
  const points = parseInt(m[1], 10);
  if (!Number.isFinite(points) || points <= 0) return null;
  return points;
}

function getLoDeStake(type: LoDeBetType, points: number) {
  if (type === "LO") return points * LODE_LO_POINT_PRICE;
  if (type === "DE") return points * LODE_DE_POINT_PRICE;
  return points * LODE_XIEN_POINT_PRICE;
}

function getLoDeTypeLabel(type: LoDeBetType) {
  if (type === "LO") return "Lô";
  if (type === "DE") return "Đề";
  if (type === "XIEN2") return "Xiên 2";
  if (type === "XIEN3") return "Xiên 3";
  return "Xiên 4";
}

function getRequiredXiCount(type: LoDeBetType): number {
  if (type === "XIEN2") return 2;
  if (type === "XIEN3") return 3;
  if (type === "XIEN4") return 4;
  return 0;
}

async function placeLoDeBetForUser(chatId: string | number, type: LoDeBetType, numbers: string[], points: number) {
  const now = moment().tz("Asia/Ho_Chi_Minh");
  let dateKey = now.format("YYYY-MM-DD");

  // Logic: Sau 18:50 sẽ tính cho ngày hôm sau
  const thresholdTime = moment.tz(`${dateKey} 18:50:00`, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
  if (now.isSameOrAfter(thresholdTime)) {
    dateKey = now.clone().add(1, "day").format("YYYY-MM-DD");
  }

  if (!isLoDeBettingOpen()) {
    bot1.sendMessage(chatId, `⛔ <b>Đã khóa lệnh Lô Đề</b>\nLô Đề tạm khóa cược trong khung giờ kết quả (17:30 - 18:50). Vui lòng cược lại sau 18:50.`, { parse_mode: "HTML" }).catch(() => {});
    return;
  }

  if (type === "XIEN2" || type === "XIEN3" || type === "XIEN4") {
    const required = getRequiredXiCount(type);
    const uniqueNumbers = Array.from(new Set(numbers));
    if (numbers.length !== required || uniqueNumbers.length !== required) {
      bot1.sendMessage(
        chatId,
        `⚠️ <b>${getLoDeTypeLabel(type)}</b> phải nhập đúng <b>${required} cặp số khác nhau</b>.`,
        { parse_mode: "HTML" }
      ).catch(() => {});
      return;
    }
  }

  const stake = getLoDeStake(type, points);
  if (stake < LODE_MIN_ORDER || stake > LODE_MAX_ORDER) {
    bot1.sendMessage(
      chatId,
      `⚠️ Tổng tiền mỗi lệnh phải trong khoảng <b>${LODE_MIN_ORDER.toLocaleString("vi-VN")}</b> - <b>${LODE_MAX_ORDER.toLocaleString("vi-VN")}</b> xu.`,
      { parse_mode: "HTML" }
    ).catch(() => {});
    return;
  }

  const users = readJson(userJsonFile);
  const uIdx = users.findIndex((u: any) => String(u.id) === String(chatId));
  if (uIdx === -1) {
    bot1.sendMessage(chatId, `⚠️ Bạn chưa start bot! Gõ <code>/start</code> để đăng ký.`, { parse_mode: "HTML" }).catch(() => {});
    return;
  }

  const user = users[uIdx];
  const activeBetGame = getUserActiveBetGame(user);
  if (activeBetGame !== "LODE_TELEGRAM") {
    bot1.sendMessage(chatId, `⚠️ Lô Đề đang bị khóa. Vào <b>Danh Sách Game</b> và chọn <b>🍀 Lô Đề Telegram</b> trước.`, { parse_mode: "HTML" }).catch(() => {});
    return;
  }

  const bal = getUserBalance(user);
  if (bal < stake) {
    bot1.sendMessage(chatId, getShortInsufficientBalanceMessage(user)).catch(() => {});
    return;
  }

  setUserBalance(user, bal - stake);
  user.cuoc = (user.cuoc || 0) + stake;
  user.cuocHomNay = (user.cuocHomNay || 0) + stake;
  user.cuocTuanNay = (user.cuocTuanNay || 0) + stake;

  const bets: LoDeBetRecord[] = readJson(lodeBetsJsonFile, "[]");
  const rec: LoDeBetRecord = {
    id: `LODE_${dateKey}_${chatId}_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
    dateKey,
    userId: String(chatId),
    userName: String(user.name || "Người chơi"),
    type,
    numbers,
    points,
    stake,
    createdAt: Date.now(),
    settled: false,
  };
  bets.push(rec);

  writeJson(userJsonFile, users);
  writeJson(lodeBetsJsonFile, bets);

  bot1.sendMessage(
    chatId,
    `✅ <b>Đã nhận lệnh ${getLoDeTypeLabel(type)}</b>\n` +
      `🎟 Số: <code>${numbers.join(",")}</code>\n` +
      `🔢 Điểm: <b>${points}d</b>\n` +
      `💵 Tiền: <b>${stake.toLocaleString("vi-VN")} xu</b>\n` +
      `📅 KQ theo XSMB: <b>${dateKey}</b>\n` +
      `💰 Số dư còn lại: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>`,
    { parse_mode: "HTML" }
  ).catch(() => {});

  // Thông báo cược lên room bắt mắt hơn
  const maskedId = String(chatId).length > 5 ? `*****${String(chatId).slice(-5)}` : chatId;
  const roomMsg = `🍀 <b>THÔNG BÁO CƯỢC</b> 🍀\n` +
                  `👤 <b>Người chơi:</b> <code>${maskedId}</code>\n` +
                  `🎮 <b>Game:</b> <b>Lô Đề ${getLoDeTypeLabel(type)}</b>\n` +
                  `🎟 <b>Số cược:</b> <code>${numbers.join(",")}</code>\n` +
                  `💵 <b>Tiền cược:</b> <b>${stake.toLocaleString("vi-VN")} xu</b>\n` +
                  `🚀 <i>Chúc bạn may mắn!</i>`;
  bot1.sendMessage(groupt, roomMsg, { parse_mode: "HTML" }).catch(() => {});
}

export function formatGameCatalogMessage(rooms: SoloRoom[] = readSoloRooms()): string {
  return `🎮 <b>Chọn Game Chơi Ngay</b>\n` +
    `Chúc Ông Chủ May Mắn`;
}

export function getGameCatalogReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "🧧 Tài Xỉu Room", callback_data: "game_catalog_room_default" }],
      [
        { text: "🎲 Solo Xúc Xắc", callback_data: "game_catalog_solo" },
        { text: "🎯 Xúc Xắc Telegram", callback_data: "game_catalog_telegram" }
      ],
      [
        { text: "🍀 Lô Đề Telegram", callback_data: "game_catalog_lode" },
        { text: "⬆️ Trên Dưới ⬇️", callback_data: "game_catalog_td" }
      ]
    ]
  };
}

export function getDuaTopReplyMarkup() {
  return {
    inline_keyboard: [
      [
        { text: "Tốp Hôm Nay", callback_data: "duatop_today" },
        { text: "Tốp Hôm Qua", callback_data: "duatop_yesterday" },
        { text: "Tốp Tuần", callback_data: "duatop_week" }
      ],
      [{ text: "🔥 BXH ĐU DÂY", callback_data: "duatop_du_day" }]
    ]
  };
}

export function getSoloRollReplyMarkup(roomCode: string) {
  return {
    inline_keyboard: [[{ text: "🎲 Tung XX", callback_data: `solo_roll_${roomCode}` }]]
  };
}

export function formatSoloRollPrompt(room: SoloRoom, targetUserId: string): string {
  const isOwner = String(room.ownerId) === String(targetUserId);
  const myRole = isOwner ? "Chủ phòng" : "Đối thủ";
  const enemyName = isOwner ? (room.challengerName || "Đối thủ") : room.ownerName;
  const myRolled = isOwner ? !!room.ownerRoll : !!room.challengerRoll;
  const enemyRolled = isOwner ? !!room.challengerRoll : !!room.ownerRoll;
  const deadlineText = room.rollDeadlineAt
    ? moment(room.rollDeadlineAt).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss DD/MM")
    : "N/A";

  return `🎲 <b>GAME SOLO XÚC XẮC</b>\n` +
    `🎟 Mã phòng: <code>${room.code}</code>\n` +
    `👤 Vai trò: <b>${myRole}</b>\n` +
    `⚔️ Đối thủ: <b>${enemyName}</b>\n` +
    `💰 Mức cược: <b>${room.amount.toLocaleString("vi-VN")} xu</b>\n` +
    `⏰ Hạn tung XX: <b>${deadlineText}</b>\n` +
    `📌 Trạng thái: Bạn <b>${myRolled ? "đã tung" : "chưa tung"}</b> | Đối thủ <b>${enemyRolled ? "đã tung" : "chưa tung"}</b>\n\n` +
    `${myRolled ? `✅ Bạn đã tung 1 viên XX Telegram rồi, chờ đối thủ.` : `👉 Bấm nút bên dưới hoặc gõ <code>/xx ${room.code}</code> để tung 1 viên xúc xắc 3D Telegram.`}`;
}

export function compareSoloRolls(ownerRoll: number[], challengerRoll: number[]): number {
  const ownerTotal = ownerRoll.reduce((sum, value) => sum + value, 0);
  const challengerTotal = challengerRoll.reduce((sum, value) => sum + value, 0);
  if (ownerTotal !== challengerTotal) return ownerTotal - challengerTotal;

  const ownerSorted = [...ownerRoll].sort((a, b) => b - a);
  const challengerSorted = [...challengerRoll].sort((a, b) => b - a);
  for (let i = 0; i < ownerSorted.length; i++) {
    if (ownerSorted[i] !== challengerSorted[i]) return ownerSorted[i] - challengerSorted[i];
  }
  return 0;
}

export async function sendSoloTelegramDice(chatId: string | number): Promise<number | null> {
  try {
    const msg = await bot1.sendDice(chatId);
    return msg?.dice?.value || null;
  } catch {
    return null;
  }
}

export function formatSoloRoomAnnouncement(room: SoloRoom, users: any[]): string {
  const winner = users.find((u: any) => String(u.id) === String(room.winnerId || ""));
  const loser = users.find((u: any) => String(u.id) === String(room.loserId || ""));

  if (!winner || !loser) {
    return `🎲 <b>GAME SOLO XÚC XẮC</b>\n🎟 Mã phòng: <code>${room.code}</code>\n⚠️ Kèo này chưa thể chốt người thắng thua.`;
  }

  const winnerRollText = String(room.winnerId) === String(room.ownerId)
    ? (room.ownerTotal !== null ? String(room.ownerTotal) : "Chưa tung")
    : (room.challengerTotal !== null ? String(room.challengerTotal) : "Chưa tung");
  const loserRollText = String(room.loserId) === String(room.ownerId)
    ? (room.ownerTotal !== null ? String(room.ownerTotal) : "Chưa tung")
    : (room.challengerTotal !== null ? String(room.challengerTotal) : "Chưa tung");

  return `🎲 <b>GAME SOLO XÚC XẮC</b>\n` +
    `🎟 Mã phòng: <code>${room.code}</code>\n` +
    `💰 Mức cược: <b>${room.amount.toLocaleString("vi-VN")} xu</b>\n\n` +
    `🏆 Người chiến thắng: <b>${winner.name || "Người chơi"}</b>\n` +
    `🆔 ID: <code>${winner.id}</code>\n` +
    `🎲 Tung ra: <b>${winnerRollText}</b>\n` +
    `💸 Ăn được: <b>${(room.payout || 0).toLocaleString("vi-VN")} xu</b>\n\n` +
    `😭 Người thua: <b>${loser.name || "Người chơi"}</b>\n` +
    `🆔 ID: <code>${loser.id}</code>\n` +
    `🎲 Tung ra: <b>${loserRollText}</b>\n` +
    `📌 Kết luận: <b>Còn Cái Nịt</b>`;
}

export function finalizeSoloRoom(room: SoloRoom, users: any[], reason = "") {
  const owner = users.find((u: any) => String(u.id) === String(room.ownerId));
  const challenger = users.find((u: any) => String(u.id) === String(room.challengerId || ""));
  if (!owner || !challenger) {
    room.status = "CANCELLED";
    room.settledAt = Date.now();
    room.resultReason = "Không đủ người chơi hợp lệ để kết toán.";
    return null;
  }

  let winner: any = null;
  let loser: any = null;
  let payout = 0;
  let resultReason = reason;

  if (!room.ownerRoll && !room.challengerRoll) {
    setUserBalance(owner, getUserBalance(owner) + room.amount);
    setUserBalance(challenger, getUserBalance(challenger) + room.amount);
    room.status = "CANCELLED";
    room.settledAt = Date.now();
    room.resultReason = reason || "Hết 5 phút nhưng cả 2 bên đều chưa tung xúc xắc, hệ thống hoàn tiền.";
    room.payout = 0;
    return {
      mode: "refund",
      message: `🎲 <b>GAME SOLO XÚC XẮC</b>\n🎟 Mã phòng: <code>${room.code}</code>\n⚠️ ${room.resultReason}`,
      roomAnnouncement: `🎲 <b>GAME SOLO XÚC XẮC</b>\n🎟 Mã phòng: <code>${room.code}</code>\n⚠️ ${room.resultReason}`
    };
  }

  if (room.ownerRoll && !room.challengerRoll) {
    winner = owner;
    loser = challenger;
    resultReason = reason || `Đối thủ không tung xúc xắc trong 5 phút nên thua.`;
  } else if (!room.ownerRoll && room.challengerRoll) {
    winner = challenger;
    loser = owner;
    resultReason = reason || `Chủ phòng không tung xúc xắc trong 5 phút nên thua.`;
  } else {
    const diff = compareSoloRolls(room.ownerRoll!, room.challengerRoll!);
    if (diff === 0) {
      setUserBalance(owner, getUserBalance(owner) + room.amount);
      setUserBalance(challenger, getUserBalance(challenger) + room.amount);
      room.status = "CANCELLED";
      room.settledAt = Date.now();
      room.resultReason = "Hai bên hòa tuyệt đối, hệ thống hoàn tiền.";
      room.payout = 0;
      return {
        mode: "refund",
        message: `🎲 <b>GAME SOLO XÚC XẮC</b>\n🎟 Mã phòng: <code>${room.code}</code>\n👑 ${room.ownerName}: <b>${room.ownerRoll!.join(" - ")}</b> (Tổng <b>${room.ownerTotal}</b>)\n⚔️ ${room.challengerName}: <b>${room.challengerRoll!.join(" - ")}</b> (Tổng <b>${room.challengerTotal}</b>)\n⚠️ ${room.resultReason}`,
        roomAnnouncement: `🎲 <b>GAME SOLO XÚC XẮC</b>\n🎟 Mã phòng: <code>${room.code}</code>\n⚠️ Hai bên hòa kèo, hoàn tiền.`
      };
    }
    winner = diff > 0 ? owner : challenger;
    loser = diff > 0 ? challenger : owner;
    resultReason = reason || "Cả hai đã tung xúc xắc, hệ thống chốt kết quả.";
  }

  payout = Math.floor(room.amount * SOLO_PAYOUT_RATE);
  setUserBalance(winner, getUserBalance(winner) + payout);
  winner.thang = (winner.thang || 0) + payout;
  loser.thua = (loser.thua || 0) + room.amount;
  awardReferralCommission(users, loser, room.amount);

  room.winnerId = String(winner.id);
  room.loserId = String(loser.id);
  room.payout = payout;
  room.status = "FINISHED";
  room.settledAt = Date.now();
  room.resultReason = resultReason;

  return {
    mode: "win",
    message: `🎲 <b>GAME SOLO XÚC XẮC</b>\n` +
      `🎟 Mã phòng: <code>${room.code}</code>\n` +
      `💰 Mức cược mỗi bên: <b>${room.amount.toLocaleString("vi-VN")} xu</b>\n` +
      `👑 Chủ phòng <b>${room.ownerName}</b>: <b>${room.ownerRoll ? room.ownerRoll.join(" - ") : "Chưa tung"}</b>${room.ownerTotal !== null ? ` (Tổng <b>${room.ownerTotal}</b>)` : ""}\n` +
      `⚔️ Đối thủ <b>${room.challengerName}</b>: <b>${room.challengerRoll ? room.challengerRoll.join(" - ") : "Chưa tung"}</b>${room.challengerTotal !== null ? ` (Tổng <b>${room.challengerTotal}</b>)` : ""}\n\n` +
      `🏆 Người thắng: <b>${winner.name || `User****${String(winner.id).slice(-4)}`}</b>\n` +
      `💸 Trả thưởng: <b>${payout.toLocaleString("vi-VN")} xu</b> (${SOLO_PAYOUT_RATE.toFixed(2)})\n` +
      `📌 Kết luận: ${resultReason}`,
    roomAnnouncement: formatSoloRoomAnnouncement(room, users)
  };
}

export function processSoloRoomTimeouts() {
  const rooms = readSoloRooms();
  const users = readJson(userJsonFile);
  let changed = false;

  rooms.forEach((room) => {
    if (room.status !== "ROLLING" || !room.rollDeadlineAt || Date.now() < room.rollDeadlineAt) return;
    const result = finalizeSoloRoom(room, users, "Hết 5 phút, bên chưa tung xúc xắc bị xử thua.");
    clearSoloRoomPin(room);
    if (result) {
      if (room.ownerChatId) sendSoloReply(room.ownerChatId, result.message, { parse_mode: "HTML" });
      if (room.challengerChatId && String(room.challengerChatId) !== String(room.ownerChatId)) {
        sendSoloReply(room.challengerChatId, result.message, { parse_mode: "HTML" });
      }
      if ((result as any).roomAnnouncement) sendSoloRoomAnnouncement((result as any).roomAnnouncement, { parse_mode: "HTML" });
    }
    changed = true;
  });

  if (changed) {
    writeJson(userJsonFile, users);
    writeSoloRooms(rooms);
  }
}

export async function handleSoloRollAction(roomCode: string, actorId: string, replyChatId: string | number) {
  const soloRooms = readSoloRooms();
  const users = readJson(userJsonFile);
  const room = soloRooms.find((item) => item.code === roomCode);

  if (!room || room.status !== "ROLLING") {
    return { ok: false, callbackText: "Phòng SOLO không còn hợp lệ.", showAlert: true };
  }

  if (![String(room.ownerId), String(room.challengerId || "")].includes(String(actorId))) {
    return { ok: false, callbackText: "Bạn không thuộc phòng SOLO này.", showAlert: true };
  }

  if (room.rollDeadlineAt && Date.now() > room.rollDeadlineAt) {
    processSoloRoomTimeouts();
    return { ok: false, callbackText: "Đã hết thời gian tung xúc xắc.", showAlert: true };
  }

  const isOwner = String(room.ownerId) === String(actorId);
  if ((isOwner && room.ownerRoll) || (!isOwner && room.challengerRoll)) {
    return { ok: false, callbackText: "Bạn đã tung rồi.", showAlert: false };
  }

  const diceValue = await sendSoloTelegramDice(replyChatId);
  if (!diceValue) {
    return { ok: false, callbackText: "Không tung được xúc xắc 3D Telegram, thử lại sau.", showAlert: true };
  }

  if (isOwner) {
    room.ownerRoll = [diceValue];
    room.ownerTotal = diceValue;
  } else {
    room.challengerRoll = [diceValue];
    room.challengerTotal = diceValue;
  }

  let replyMsg = `🎲 <b>GAME SOLO XÚC XẮC</b>\n🎟 Mã phòng: <code>${room.code}</code>\n✅ Bạn đã tung 1 viên XX Telegram: <b>${diceValue}</b>`;
  if (room.ownerRoll && room.challengerRoll) {
    const result = finalizeSoloRoom(room, users);
    writeJson(userJsonFile, users);
    writeSoloRooms(soloRooms);
    if (result) {
      sendSoloReply(room.ownerChatId, result.message, { parse_mode: "HTML" });
      if (room.challengerChatId && String(room.challengerChatId) !== String(room.ownerChatId)) {
        sendSoloReply(room.challengerChatId, result.message, { parse_mode: "HTML" });
      }
      if ((result as any).roomAnnouncement) sendSoloRoomAnnouncement((result as any).roomAnnouncement, { parse_mode: "HTML" });
    }
    return { ok: true, callbackText: `Bạn đã tung ${diceValue}` };
  }

  writeSoloRooms(soloRooms);
  replyMsg += `\n⏳ Đang chờ đối thủ tung xúc xắc.`;
  sendSoloReply(replyChatId, replyMsg, { parse_mode: "HTML" });
  return { ok: true, callbackText: `Bạn đã tung ${diceValue}` };
}

export function handleSoloJoinByCode(roomCode: string, userId: string, chatId: string | number, displayName?: string) {
  const users = readJson(userJsonFile);
  const joiner = users.find((u: any) => String(u.id) === String(userId));
  if (!joiner) {
    bot1.sendMessage(chatId, `❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.`);
    return;
  }

  const soloRooms = readSoloRooms();
  const room = soloRooms.find((item) => item.code === roomCode);
  if (!room) {
    bot1.sendMessage(chatId, `❌ Mã phòng SOLO không tồn tại hoặc đã được khớp.`);
    return;
  }

  if (room.status === "ROLLING" && [String(room.ownerId), String(room.challengerId || "")].includes(String(userId))) {
    sendSoloReply(chatId, formatSoloRollPrompt(room, userId), {
      parse_mode: "HTML",
      reply_markup: getSoloRollReplyMarkup(room.code)
    });
    return;
  }

  if (room.status !== "OPEN" || room.challengerId) {
    bot1.sendMessage(chatId, `❌ Mã phòng SOLO không tồn tại hoặc đã được khớp.`);
    return;
  }

  if (String(room.ownerId) === String(userId)) {
    bot1.sendMessage(chatId, `⚠️ Đây là phòng SOLO của bạn. Hãy chờ người khác vào phòng.`, { parse_mode: "HTML" });
    return;
  }

  const occupied = soloRooms.some((item) =>
    ["OPEN", "ROLLING"].includes(item.status) &&
    (String(item.ownerId) === String(userId) || String(item.challengerId || "") === String(userId))
  );
  if (occupied) {
    bot1.sendMessage(chatId, `❌ Bạn đang có một phòng SOLO đang chờ xử lý.`);
    return;
  }

  const balance = getUserBalance(joiner);
  if (balance < room.amount) {
    bot1.sendMessage(chatId, `❌ Số dư không đủ vào phòng. Cần <b>${room.amount.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
    return;
  }

  const owner = users.find((u: any) => String(u.id) === String(room.ownerId));
  if (!owner) {
    room.status = "CANCELLED";
    room.settledAt = Date.now();
    room.resultReason = "Chủ phòng không còn hợp lệ.";
    clearSoloRoomPin(room);
    writeSoloRooms(soloRooms);
    bot1.sendMessage(chatId, `❌ Chủ phòng không còn hợp lệ. Vui lòng thử phòng khác.`);
    return;
  }

  setUserBalance(joiner, balance - room.amount);
  joiner.cuoc = (joiner.cuoc || 0) + room.amount;
  joiner.cuocHomNay = (joiner.cuocHomNay || 0) + room.amount;
  joiner.cuocTuanNay = (joiner.cuocTuanNay || 0) + room.amount;
  if (joiner.vongCuoc && joiner.vongCuoc > 0) joiner.vongCuoc = Math.max(0, joiner.vongCuoc - room.amount);

  room.challengerId = String(userId);
  room.challengerName = joiner.name || displayName || "Đối thủ";
  room.challengerChatId = String(userId);
  room.joinedAt = Date.now();
  room.status = "ROLLING";
  room.rollDeadlineAt = Date.now() + SOLO_ROLL_TIMEOUT_MS;
  room.resultReason = null;

  clearSoloRoomPin(room);

  writeJson(userJsonFile, users);
  writeSoloRooms(soloRooms);

  const ownerPrompt = formatSoloRollPrompt(room, room.ownerId);
  const challengerPrompt = formatSoloRollPrompt(room, room.challengerId!);
  sendSoloReply(room.ownerChatId, ownerPrompt, { parse_mode: "HTML", reply_markup: getSoloRollReplyMarkup(room.code) });
  sendSoloReply(room.challengerChatId || chatId, challengerPrompt, { parse_mode: "HTML", reply_markup: getSoloRollReplyMarkup(room.code) });
}

export async function handleTelegramXXDirectRoll(userId: string, username: string, betType: string, amount: number, replyChatId: string | number) {
  const users = readJson(userJsonFile);
  const userIdx = users.findIndex((u: any) => String(u.id) === String(userId));
  if (userIdx === -1) {
    return { ok: false, message: `❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.` };
  }
  const user = users[userIdx];

  if (isBanned(userId)) {
    return { ok: false, message: `❌ Tài khoản của bạn đã bị cấm.` };
  }

  if (!isTelegramXXBetType(betType)) {
    return { ok: false, message: `⚠️ Loại cược không hợp lệ. Các loại cược hợp lệ: XXC, XXL, XXX, XXT.` };
  }

  if (isNaN(amount) || amount < TELEGRAM_XX_MIN_BET) {
    return { ok: false, message: `⚠️ Cược ${getTelegramXXLabel(betType)} tối thiểu từ <b>${TELEGRAM_XX_MIN_BET.toLocaleString("vi-VN")} xu</b>!`, parse_mode: "HTML" };
  }
  if (amount > TELEGRAM_XX_MAX_BET) {
    return { ok: false, message: `⚠️ Cược ${getTelegramXXLabel(betType)} tối đa <b>${TELEGRAM_XX_MAX_BET.toLocaleString("vi-VN")} xu</b>!`, parse_mode: "HTML" };
  }

  const balance = getUserBalance(user);
  if (balance < amount) {
    return { ok: false, message: `⚠️ Số dư ví cược của bạn không đủ! Bạn đang có <b>${balance.toLocaleString("vi-VN")} xu</b>.`, parse_mode: "HTML" };
  }

  // Deduct bet amount
  setUserBalance(user, balance - amount);
  user.cuoc = (user.cuoc || 0) + amount;
  user.cuocHomNay = (user.cuocHomNay || 0) + amount;
  user.cuocTuanNay = (user.cuocTuanNay || 0) + amount;
  if (user.vongCuoc && user.vongCuoc > 0) user.vongCuoc = Math.max(0, user.vongCuoc - amount);
  applyVipPointFromBet(user, amount);

  // Store pending bet and ask user to roll dice
  user.pendingXXBet = {
    betType,
    amount,
    time: Date.now()
  };

  writeJson(userJsonFile, users);

  let message = `🎲 <b>XÚC XẮC TELEGRAM</b> 🎲\n`;
  message += `Bạn đã cược <b>${getTelegramXXLabel(betType)}</b> với <b>${amount.toLocaleString("vi-VN")} xu</b>.\n\n`;
  message += `👉 <b>Bây giờ hãy bấm vào icon 🎲 bên dưới hoặc tự tung 1 viên xúc xắc 3D Telegram để xem kết quả!</b>`;

  return { 
    ok: true, 
    message: message, 
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [[{ text: "🎲" }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };
}

export function rollSoloDiceSet(): number[] {
  return [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
}

export function rollSoloBattleResult() {
  let ownerRoll = rollSoloDiceSet();
  let challengerRoll = rollSoloDiceSet();
  let ownerTotal = ownerRoll.reduce((sum, value) => sum + value, 0);
  let challengerTotal = challengerRoll.reduce((sum, value) => sum + value, 0);
  let guard = 0;

  while (ownerTotal === challengerTotal && guard < 50) {
    ownerRoll = rollSoloDiceSet();
    challengerRoll = rollSoloDiceSet();
    ownerTotal = ownerRoll.reduce((sum, value) => sum + value, 0);
    challengerTotal = challengerRoll.reduce((sum, value) => sum + value, 0);
    guard += 1;
  }

  return { ownerRoll, challengerRoll, ownerTotal, challengerTotal };
}

// --- GAME LOGIC ---
export function resetBettingSession() {
  state.totalBetT = state.totalBetX = state.totalBetC = state.totalBetL = state.totalBetTC = state.totalBetTL = state.totalBetXC = state.totalBetXL = state.totalBetMM = 0;
  state.userBetsTX = {};
  state.userBetsCL = {};
  state.userBetsXien = {};
  state.userBetsDice = {};
  state.userBetsSum = {};
  state.userBetsMM = {};
  state.betsLog = [];
  state.isProcessing = false;
  state.phienAnnounced = false;
  state.lastCountdownMessageIds = [];
}

export function checkSpecialRoll(dice: number[]): boolean {
  return dice.every((v) => v === dice[0]) && (dice[0] === 1 || dice[0] === 6);
}

export function distributePotToWinners(potAmount: number, winners: { [key: string]: number }) {
  const winnersArray = Object.entries(winners);
  if (winnersArray.length === 0) return [];
  const totalBetAmount = winnersArray.reduce((acc, cur) => acc + cur[1], 0);
  if (winnersArray.length === 1) {
    return [{ userId: winnersArray[0][0], betAmount: winnersArray[0][1], winAmount: Math.floor(potAmount * 0.7) }];
  }
  return winnersArray.map(([userId, amount]) => ({
    userId,
    betAmount: amount,
    winAmount: Math.floor(potAmount * 0.7 * (amount / totalBetAmount)),
  }));
}

export function handlePot(
  potAmount: number,
  betters: string[] = [],
  winners: { [key: string]: number } = {},
  resultInfo: { diceResults?: number[]; sumCat?: string } = {}
) {
  const payouts = distributePotToWinners(potAmount, winners);
  let users = readJson(userJsonFile);
  const winnerDetails: any[] = [];

  payouts.forEach(({ userId, betAmount, winAmount }) => {
    const user = users.find((u: any) => String(u.id) === String(userId));
    let currentSd = 0;
    if (user) {
      user.sd = (user.sd || 0) + winAmount;
      if (user.money !== undefined) user.money = (user.money || 0) + winAmount;
      winnerDetails.push({ userId, name: user.name || `User****${String(userId).slice(-4)}`, betAmount, winAmount });
      currentSd = Math.floor(user.sd || user.money || 0);
    } else {
      winnerDetails.push({ userId, name: `User****${String(userId).slice(-4)}`, betAmount, winAmount });
    }
    
    const personalMsg = `🎉 <b>Chúc Mừng Nổ Hũ</b> 🎉:\n` +
      `💰 +<b>${winAmount.toLocaleString("vi-VN")} xu</b>\n` +
      `💵 Số dư hiện tại: <b>${currentSd.toLocaleString("vi-VN")} xu</b>`;
    bot1.sendMessage(userId, personalMsg, { parse_mode: "HTML" }).catch(() => {});
  });

  const remainingPot = payouts.length > 0 ? Math.floor(potAmount * 0.3) : potAmount;
  let huData = { pot: remainingPot, history: [] as any[], autoPotRate: state.autoPotRate, lessBetWinsRate: state.lessBetWinsRate };
  
  try {
    const raw = readJson("hu.json");
    huData.history = raw.history || [];
  } catch {}

  huData.pot = remainingPot;
  if (!huData.history) huData.history = [];
  if (payouts.length > 0) {
    huData.history.unshift({
      phien: state.phien,
      time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      potAmount,
      winners: winnerDetails,
    });
    if (huData.history.length > 50) huData.history.pop();
  }

  writeJson("hu.json", huData);
  writeJson(userJsonFile, users);

  const diceResults = Array.isArray(resultInfo.diceResults) ? resultInfo.diceResults : [];
  const diceText = diceResults.length === 3 ? diceResults.join(" ") : "NỔ HŨ";
  const huTitle = diceResults.length === 3 && diceResults.every((v) => v === 6)
    ? "Vàng"
    : diceResults.length === 3 && diceResults.every((v) => v === 1)
      ? "Bạc"
      : "Rồng";
  const sumLabel = resultInfo.sumCat || "";
  const maskUserId = (userId: string | number) => {
    const raw = String(userId || "");
    const visible = raw.slice(-5);
    return `*****${visible}`;
  };

  const listWinnersText = payouts.length > 0
    ? payouts.map((w, i) => `${i + 1}. <b>${maskUserId(w.userId)}</b> | <b>${sumLabel} ${Number(w.betAmount || 0).toLocaleString("vi-VN")}</b> | +<b>${w.winAmount.toLocaleString("vi-VN")}</b>`).join("\n")
    : `<i>Chưa có người nhận hũ</i>`;

  const totalPaid = payouts.reduce((sum, item) => sum + (Number(item.winAmount) || 0), 0);
  const msg = `🔥 <b>Nổ hũ ${huTitle} ${diceText}</b> 🔥\n${listWinnersText}\n💰 <b>Quỹ trả hũ:</b> <b>${potAmount.toLocaleString("vi-VN")} xu</b>\n🏆 <b>Đã trả:</b> <b>${totalPaid.toLocaleString("vi-VN")} xu</b>\n💎 <b>Số tiền trong hũ còn lại:</b> <b>${remainingPot.toLocaleString("vi-VN")} xu</b>`;

  const potMessageOptions = {
    parse_mode: "HTML" as const,
    disable_web_page_preview: true,
    // reply_markup: {
    //   inline_keyboard: [[{ text: "💬 Vào phòng cược ngay", url: gameRoomLink }]]
    // }
  };

  bot2.sendMessage(groupt, msg, potMessageOptions).then((s) => {
    pinGroupMessageWithResilience(groupt, s.message_id);
  }).catch(() => {});
}

export async function sendDice() {
  state.isProcessing = true;
  const diceResults: number[] = [];

  const diffTX = Math.abs(state.totalBetT - state.totalBetX);
  const diffCL = Math.abs(state.totalBetC - state.totalBetL);

  let targetTX: "TÀI" | "XỈU" | null = null;
  let targetCL: "CHẮN" | "LẺ" | null = null;

  if (diffTX > 0 || diffCL > 0) {
    if (diffTX >= diffCL) {
      targetTX = state.totalBetT < state.totalBetX ? "TÀI" : "XỈU";
    } else {
      targetCL = state.totalBetC < state.totalBetL ? "CHẮN" : "LẺ";
    }
  }

  const shouldRig = state.lessBetWinsRate > 0 && Math.random() * 100 < state.lessBetWinsRate;

  try {
    for (let i = 0; i < 3; i++) {
      const msg = await bot5.sendDice(groupt);
      if (msg?.dice) {
        diceResults.push(msg.dice.value);
      } else {
        throw new Error("sendDice failed");
      }
      if (i < 2) await new Promise((resolve) => setTimeout(resolve, 800));
    }
  } catch (err) {
    let matched = false;
    let attempts = 0;
    while (!matched && attempts < 1000) {
      attempts++;
      diceResults.length = 0;
      diceResults.push(
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      );
      const sum = diceResults[0] + diceResults[1] + diceResults[2];
      const sumCat = sum > 10 ? "TÀI" : "XỈU";
      const clCat = sum % 2 === 0 ? "CHẮN" : "LẺ";

      let txMatch = !shouldRig || !targetTX || sumCat === targetTX;
      let clMatch = !shouldRig || !targetCL || clCat === targetCL;
      if (txMatch && clMatch) matched = true;
    }
  }

  if (diceResults.length !== 3) {
    diceResults.push(
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Tung hết viên XX thứ 3 mới mở khoá chat
  if (state.chatLocked) unlockGroupChat();

  const telegramDiceValue = diceResults[0] || (Math.floor(Math.random() * 6) + 1);
  const sumOfResults = diceResults.reduce((a, b) => a + b, 0);
  const sumCat = sumOfResults > 10 ? "TÀI" : "XỈU";
  const clCat = sumOfResults % 2 === 0 ? "CHẮN" : "LẺ";
  const taixiuEmoji = sumCat === "TÀI" ? "🔵" : "🔴";
  const chanleEmoji = clCat === "CHẮN" ? "⚪" : "⚫";
  
  // Logic can thiệp kết quả MM: Chọn số có tổng cược thấp nhất
  let quayPrize = Math.floor(Math.random() * 9) + 1;
  if (state.userBetsMM && Object.keys(state.userBetsMM).length > 0) {
    const mmTotals: { [num: number]: number } = {};
    for (let i = 1; i <= 9; i++) mmTotals[i] = 0;

    Object.values(state.userBetsMM).forEach((bets: any) => {
      bets.forEach((bet: any) => {
        const num = parseInt(String(bet.betType || "").toLowerCase().replace("mm", ""), 10);
        if (!isNaN(num) && num >= 1 && num <= 9) {
          mmTotals[num] += bet.amount;
        }
      });
    });

    const minBetValue = Math.min(...Object.values(mmTotals));
    const candidateNumbers = Object.keys(mmTotals)
      .map(Number)
      .filter((num) => mmTotals[num] === minBetValue);
    
    // Chọn ngẫu nhiên một số trong danh sách các số có tiền cược thấp nhất (hoặc không có người cược)
    quayPrize = candidateNumbers[Math.floor(Math.random() * candidateNumbers.length)];
  }

  let potAmount = 10000;
  try {
    const rawHU = readJson("hu.json");
    potAmount = rawHU.pot || 10000;
  } catch (e) {}

  let users = readJson(userJsonFile);
  let totalWin = 0, totalLoss = 0, potIncrease = 0;
  const playerReports: { [key: string]: any[] } = {};

  const winTXTotal = sumCat === "TÀI" ? state.totalBetT : state.totalBetX;
  const loseTXTotal = sumCat === "TÀI" ? state.totalBetX : state.totalBetT;
  const isTxPotEligible = winTXTotal <= loseTXTotal;

  const winCLTotal = clCat === "CHẮN" ? state.totalBetC : state.totalBetL;
  const loseCLTotal = clCat === "CHẮN" ? state.totalBetL : state.totalBetC;
  const isClPotEligible = winCLTotal <= loseCLTotal;

  const winningXien = sumCat === "TÀI" ? (clCat === "CHẮN" ? "tc" : "tl") : (clCat === "CHẮN" ? "xc" : "xl");
  let betTC = 0, betTL = 0, betXC = 0, betXL = 0;
  Object.entries(state.userBetsXien).forEach(([_, bet]) => {
    if (bet.betType === "tc") betTC += bet.amount;
    if (bet.betType === "tl") betTL += bet.amount;
    if (bet.betType === "xc") betXC += bet.amount;
    if (bet.betType === "xl") betXL += bet.amount;
  });
  const winXienTotal = winningXien === "tc" ? betTC : winningXien === "tl" ? betTL : winningXien === "xc" ? betXC : betXL;
  const totalXienBet = betTC + betTL + betXC + betXL;
  const isXienPotEligible = winXienTotal <= (totalXienBet - winXienTotal);

  // TX Settlements
  Object.entries(state.userBetsTX).forEach(([userId, bet]) => {
    const isWin = (bet.betType === "t" && sumCat === "TÀI") || (bet.betType === "x" && sumCat === "XỈU");
    const usr = users.find((u: any) => String(u.id) === String(userId));
    if (usr) {
      const payout = isWin ? Math.floor(bet.amount * 1.92) : 0;
      if (isWin) {
        usr.sd = (usr.sd || 0) + payout;
        if (usr.money !== undefined) usr.money = (usr.money || 0) + payout;
        usr.thang = (usr.thang || 0) + payout;
        totalWin += payout;
      } else {
        usr.thua = (usr.thua || 0) + bet.amount;
        awardReferralCommission(users, usr, bet.amount);
        if (isTxPotEligible) potIncrease += Math.floor(bet.amount * 0.02 * 0.75);
        totalLoss += bet.amount;
      }
      if (!playerReports[userId]) playerReports[userId] = [];
      playerReports[userId].push({ category: "TX", betType: bet.betType === "t" ? "TÀI" : "XỈU", amount: bet.amount, isWin, payout });
    }
  });

  // CL Settlements
  Object.entries(state.userBetsCL).forEach(([userId, bet]) => {
    const isWin = (bet.betType === "c" && clCat === "CHẮN") || (bet.betType === "l" && clCat === "LẺ");
    const usr = users.find((u: any) => String(u.id) === String(userId));
    if (usr) {
      const payout = isWin ? Math.floor(bet.amount * 1.92) : 0;
      if (isWin) {
        usr.sd = (usr.sd || 0) + payout;
        if (usr.money !== undefined) usr.money = (usr.money || 0) + payout;
        usr.thang = (usr.thang || 0) + payout;
        totalWin += payout;
      } else {
        usr.thua = (usr.thua || 0) + bet.amount;
        awardReferralCommission(users, usr, bet.amount);
        if (isClPotEligible) potIncrease += Math.floor(bet.amount * 0.02 * 0.75);
        totalLoss += bet.amount;
      }
      if (!playerReports[userId]) playerReports[userId] = [];
      playerReports[userId].push({ category: "CL", betType: bet.betType === "c" ? "CHẮN" : "LẺ", amount: bet.amount, isWin, payout });
    }
  });

  // Xien Settlements
  Object.entries(state.userBetsXien).forEach(([userId, bet]) => {
    const isWin = bet.betType === winningXien;
    const usr = users.find((u: any) => String(u.id) === String(userId));
    if (usr) {
      const payout = isWin ? Math.floor(bet.amount * 2.5) : 0;
      if (isWin) {
        usr.sd = (usr.sd || 0) + payout;
        if (usr.money !== undefined) usr.money = (usr.money || 0) + payout;
        usr.thang = (usr.thang || 0) + payout;
        totalWin += payout;
      } else {
        usr.thua = (usr.thua || 0) + bet.amount;
        awardReferralCommission(users, usr, bet.amount);
        if (isXienPotEligible) potIncrease += Math.floor(bet.amount * 0.02 * 0.75);
        totalLoss += bet.amount;
      }
      if (!playerReports[userId]) playerReports[userId] = [];
      playerReports[userId].push({ category: "XIÊN", betType: bet.betType.toUpperCase(), amount: bet.amount, isWin, payout });
    }
  });

  // Dice Settlements
  if (state.userBetsDice) {
    Object.entries(state.userBetsDice).forEach(([userId, bets]) => {
      bets.forEach((bet) => {
        const normalizedType = String(bet.betType || "").toLowerCase();
        const numToMatch = parseInt(normalizedType.replace("d", ""), 10);
        const isWin = isTelegramXXBetType(normalizedType)
          ? isTelegramXXWin(normalizedType, telegramDiceValue)
          : diceResults.includes(numToMatch);
        const usr = users.find((u: any) => String(u.id) === String(userId));
        if (usr) {
          const payout = isWin
            ? Math.floor(bet.amount * (isTelegramXXBetType(normalizedType) ? TELEGRAM_XX_PAYOUT_RATE : 1.93))
            : 0;
          if (isWin) {
            usr.sd = (usr.sd || 0) + payout;
            if (usr.money !== undefined) usr.money = (usr.money || 0) + payout;
            usr.thang = (usr.thang || 0) + payout;
            totalWin += payout;
          } else {
            usr.thua = (usr.thua || 0) + bet.amount;
            awardReferralCommission(users, usr, bet.amount);
            totalLoss += bet.amount;
          }
          if (!playerReports[userId]) playerReports[userId] = [];
          playerReports[userId].push({ category: "DICE", betType: isTelegramXXBetType(normalizedType) ? getTelegramXXLabel(normalizedType) : bet.betType.toUpperCase(), amount: bet.amount, isWin, payout });
        }
      });
    });
  }

  // SB Settlements
  if (state.userBetsSum) {
    Object.entries(state.userBetsSum).forEach(([userId, bets]) => {
      bets.forEach((bet) => {
        const sumToMatch = parseInt(bet.betType.replace("sb", ""), 10);
        const isWin = sumOfResults === sumToMatch;
        const usr = users.find((u: any) => String(u.id) === String(userId));
        if (usr) {
          const payout = isWin ? Math.floor(bet.amount * 2.3) : 0;
          if (isWin) {
            usr.sd = (usr.sd || 0) + payout;
            if (usr.money !== undefined) usr.money = (usr.money || 0) + payout;
            usr.thang = (usr.thang || 0) + payout;
            totalWin += payout;
          } else {
            usr.thua = (usr.thua || 0) + bet.amount;
            awardReferralCommission(users, usr, bet.amount);
            totalLoss += bet.amount;
          }
          if (!playerReports[userId]) playerReports[userId] = [];
          playerReports[userId].push({ category: "SUM", betType: bet.betType.toUpperCase(), amount: bet.amount, isWin, payout });
        }
      });
    });
  }

  // MM Settlements (Vòng quay may mắn 1-9)
  if (state.userBetsMM) {
    Object.entries(state.userBetsMM).forEach(([userId, bets]) => {
      bets.forEach((bet) => {
        const mmNum = parseInt(String(bet.betType || "").toLowerCase().replace("mm", ""), 10);
        if (isNaN(mmNum) || mmNum < 1 || mmNum > 9) return;
        const isWin = mmNum === quayPrize;
        const usr = users.find((u: any) => String(u.id) === String(userId));
        if (usr) {
          const payout = isWin ? Math.floor(bet.amount * 10) : 0;
          if (isWin) {
            usr.sd = (usr.sd || 0) + payout;
            if (usr.money !== undefined) usr.money = (usr.money || 0) + payout;
            usr.thang = (usr.thang || 0) + payout;
            totalWin += payout;
          } else {
            usr.thua = (usr.thua || 0) + bet.amount;
            awardReferralCommission(users, usr, bet.amount);
            totalLoss += bet.amount;
          }
          if (!playerReports[userId]) playerReports[userId] = [];
          playerReports[userId].push({ category: "MM", betType: `MM ${mmNum}`, amount: bet.amount, isWin, payout });
        }
      });
    });
  }

  if (totalWin > totalLoss) potIncrease = 0;
  potAmount = Math.floor(potAmount + potIncrease);

  // Save history
  Object.entries(playerReports).forEach(([uid, bets]) => {
    const usr = users.find((u: any) => String(u.id) === String(uid));
    if (usr) {
      if (!usr.betHistory) usr.betHistory = [];
      let net = 0;
      let totalBetAmount = 0;
      bets.forEach((b) => {
        net += b.isWin ? (b.payout - b.amount) : -b.amount;
        if (b.category === "TX") totalBetAmount += b.amount;
      });
      updateUserStreakAfterRound(usr, state.phien, net, totalBetAmount);
      usr.betHistory.push({
        phien: state.phien,
        time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        dice: diceResults.join("-"),
        total: sumOfResults,
        result: `${sumCat} ${clCat}`,
        bets: bets.map((b: any) => ({ category: b.category, betType: b.betType, amount: b.amount, isWin: b.isWin, payout: b.payout })),
        net,
        streak: {
          currentWin: usr.currentWinStreak || 0,
          currentLoss: usr.currentLossStreak || 0,
          qualified: getUserStreakStatusText(usr, state.phien)
        }
      });
      if (usr.betHistory.length > 20) usr.betHistory.shift();
    }
  });

  // Banker Settle
  if (currentCai.value) {
    const bankerId = String(currentCai.value.id);
    const bankerUser = users.find((u: any) => String(u.id) === bankerId);
    let totalBetsPlaced = 0;
    if (state.userBetsTX) Object.values(state.userBetsTX).forEach((b: any) => totalBetsPlaced += b.amount);
    if (state.userBetsCL) Object.values(state.userBetsCL).forEach((b: any) => totalBetsPlaced += b.amount);
    if (state.userBetsXien) Object.values(state.userBetsXien).forEach((b: any) => totalBetsPlaced += b.amount);
    if (state.userBetsDice) Object.values(state.userBetsDice).forEach((arr: any) => arr.forEach((b: any) => totalBetsPlaced += b.amount));
    if (state.userBetsSum) Object.values(state.userBetsSum).forEach((arr: any) => arr.forEach((b: any) => totalBetsPlaced += b.amount));
    if (state.userBetsMM) Object.values(state.userBetsMM).forEach((arr: any) => arr.forEach((b: any) => totalBetsPlaced += b.amount));

    const netResult = totalBetsPlaced - totalWin;
    let finalPool = currentCai.value.pool + netResult;
    if (finalPool < 0) finalPool = 0;

    if (bankerUser) {
      const originalSd = bankerUser.sd !== undefined ? bankerUser.sd : (bankerUser.money || 0);
      const newSd = Math.floor(originalSd + finalPool);
      bankerUser.sd = newSd;
      if (bankerUser.money !== undefined) bankerUser.money = newSd;

      if (!bankerUser.depositHistory) bankerUser.depositHistory = [];
      bankerUser.depositHistory.unshift({
        time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        amount: finalPool.toLocaleString("vi-VN"),
        status: `Kết toán Làm Cái phiên #${state.phien} (${netResult >= 0 ? "+" : ""}${netResult.toLocaleString("vi-VN")} xu)`
      });
    }

    const bankerMsg = `👑 <b>KẾT TOÁN LÀM CÁI PHIÊN #${state.phien}</b>\n🎰 Chủ cái: <b>${currentCai.value.name}</b>\n💵 Tiền làm cái: <b>${currentCai.value.pool.toLocaleString("vi-VN")} xu</b>\n💵 Tổng cược nhận: <b>${totalBetsPlaced.toLocaleString("vi-VN")} xu</b>\n💸 Tổng trả thưởng: <b>${totalWin.toLocaleString("vi-VN")} xu</b>\n📊 Biến động: <b>${netResult >= 0 ? "🟢 +" + netResult.toLocaleString("vi-VN") : "🔴 -" + Math.abs(netResult).toLocaleString("vi-VN")} xu</b>\n🏦 Nhận lại số dư: <b>${finalPool.toLocaleString("vi-VN")} xu</b>`;
    bot1.sendMessage(bankerId, bankerMsg, { parse_mode: "HTML" }).catch(() => {});
    sendMessageToRoom(bankerMsg, { parse_mode: "HTML" });
  }

  writeJson("hu.json", { pot: potAmount });
  writeJson(userJsonFile, users);

  // Send player reports
  Object.entries(playerReports).forEach(([uid, bets]) => {
    const usr = users.find((u: any) => String(u.id) === String(uid));
    if (!usr) return;
    let msg = "";
    let net = 0;
    let totalPayout = 0;
    const isOverallWin = bets.some(b => b.isWin);
    
    msg += `${isOverallWin ? "✅ Thắng" : "❌ Thua"} phiên #${state.phien}\n`;
    
    bets.forEach((b) => {
      const labelType = typeof b.betType === "function" ? (clCat === "CHẮN" ? "CHẮN" : "LẺ") : b.betType;
      msg += `${b.isWin ? "✅ Thắng" : "❌ Thua"} ${labelType} - ${b.amount.toLocaleString("vi-VN")} ${b.isWin ? `(+${b.payout.toLocaleString("vi-VN")})` : ""}\n`;
      net += b.isWin ? (b.payout - b.amount) : -b.amount;
      totalPayout += b.payout;
    });
    
    msg += `Tiền nhận: ${totalPayout.toLocaleString("vi-VN")}\n`;
    msg += `Số dư mới: ${Math.floor(usr.sd || usr.money || 0).toLocaleString("vi-VN")}`;
    bot1.sendMessage(uid, msg, { parse_mode: "HTML" }).catch(() => {});

    // Thêm logic thông báo THẮNG LỚN vào room chính
    bets.forEach((b) => {
      // Điều kiện: thắng các cửa xxc, xxl, xxx, xxt và tiền nhận >= 100.000 xu
      const specialTypes = ["xxc", "xxl", "xxx", "xxt"];
      const bType = String(b.betType || "").toLowerCase();
      if (b.isWin && specialTypes.includes(bType) && b.payout >= 100000) {
        const maskedId = uid.length > 5 ? `*****${uid.slice(-5)}` : uid;
        const bigWinMsg = `🎉 THẮNG LỚN 🎉\n` +
          `👤 Người chơi: ${maskedId}\n` +
          `🎮 Game: Xúc Xắc ${bType.toUpperCase()}\n` +
          `💵 Tiền cược: ${b.amount.toLocaleString("vi-VN")}\n` +
          `💰 Tiền nhận: ${b.payout.toLocaleString("vi-VN")}`;
        
        sendMessageToRoom(bigWinMsg, { parse_mode: "HTML" });
      }
    });
  });

  const cauList = readJson("cau.json");
  cauList.unshift(taixiuEmoji);
  if (cauList.length > 24) cauList.pop();
  writeJson("cau.json", cauList);

  const chanleList = readJson("chanle.json");
  chanleList.unshift(chanleEmoji);
  if (chanleList.length > 24) chanleList.pop();
  writeJson("chanle.json", chanleList);

  const recentTxStats = cauList.slice(0, 12).reverse().join("");
  const recentClStats = chanleList.slice(0, 12).reverse().join("");
  const boldDiceResults = diceResults.map((item) => toBoldDigits(item)).join("  ");
  const boldSumOfResults = toBoldDigits(sumOfResults);
  const boldQuayPrize = toBoldDigits(quayPrize);
  const boldTotalWin = toBoldDigits(totalWin.toLocaleString("vi-VN"));
  const boldTotalLoss = toBoldDigits(totalLoss.toLocaleString("vi-VN"));
  const boldPotIncrease = toBoldDigits(potIncrease.toLocaleString("vi-VN"));
  const boldPotAmount = toBoldDigits(potAmount.toLocaleString("vi-VN"));
  const lobbyMsg = `🎲 <b>Kết quả XX phiên #${state.phien}</b>\n` +
    `<pre>┏━━━━━━━━━━━━┓
┃  ${boldDiceResults}  👉[${boldSumOfResults}] ${sumCat} ${clCat} ${taixiuEmoji}${chanleEmoji}
┃ 🎡 Giải số cược vòng quay: ${boldQuayPrize} (1-9)
┃
┃ Tổng thắng: ${boldTotalWin}
┃ Tổng thua: ${boldTotalLoss}
┃ Cộng hũ  : +${boldPotIncrease}
┃ Hũ hiện tại: ${boldPotAmount}
┗━━━━━━━━━━━━┛</pre>
Thống kê kết quả gần đây:
${recentTxStats}
      🔵  <b>Tài</b>             🔴   <b>XỈU</b>
${recentClStats}
      ⚪️  <b>Chẵn</b>        ⚫️   <b>Lẻ</b>`;
  // Gửi kết quả phiên trước, rồi mới gửi thông báo "làm cái" để đảm bảo thứ tự hiển thị
  const lobbySent = await bot2.sendMessage(groupt, lobbyMsg, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "💵 Nạp Tiền Ngay", url: `https://t.me/${botUsernames[0]}?start=deposit` },
        { text: "📊 Lịch Sử Phiên", url: "https://t.me/lichsuphiendragon" }
      ]],
    },
  }).catch(() => null);

  const resultToGroup = `🎲 Kết quả phiên ${state.phien} 🎲\n ${diceResults.join("  ")} 👉 ${sumCat} ${clCat} ${taixiuEmoji} ${chanleEmoji}`;
  bot2.sendMessage("-1004298002180", resultToGroup).catch(() => {});

  let triggerPot = false;
  if (state.forceNextPotExplosion) {
    triggerPot = true;
    state.forceNextPotExplosion = false;
  } else if (state.autoPotRate > 0 && Math.random() * 100 < state.autoPotRate) {
    triggerPot = true;
  } else if (checkSpecialRoll(diceResults)) {
    triggerPot = true;
  }

  if (triggerPot) {
    const betters = Array.from(new Set([
      ...Object.keys(state.userBetsTX || {}),
      ...Object.keys(state.userBetsCL || {}),
      ...Object.keys(state.userBetsXien || {}),
      ...Object.keys(state.userBetsDice || {}),
      ...Object.keys(state.userBetsSum || {}),
      ...Object.keys(state.userBetsMM || {}),
    ]));
    const winnersDict: { [key: string]: number } = {};
    for (const uid of betters) {
      const bets = playerReports?.[uid] || [];
      const wins = bets.filter(b => b.isWin === true);
      if (wins.length > 0) {
        const totalBetAmountForUser = bets.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
        if (totalBetAmountForUser >= 10000) {
          winnersDict[uid] = wins.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
        }
      }
    }
    handlePot(potAmount, betters, winnersDict, { diceResults, sumCat });
  }

  currentCai.value = null;
  waitingCai.value = false;
  if (caiTimeout.value) {
    clearTimeout(caiTimeout.value);
    caiTimeout.value = null;
  }

  // Sinh số may mắn mới cho phiên tiếp theo (00-99)
  state.luckyNumber = Math.floor(Math.random() * 100).toString().padStart(2, '0');

  // Khôi phục các thông báo theo yêu cầu (không reply)
  const luckyWheelText =
    `🎡 <b>Vòng quay may mắn</b> (số 1-9): đặt <code>MM [số] [tiền]</code>\n` +
    `VD: <code>MM 5 20000</code>\n` +
    `- Tỉ lệ trả thưởng: <b>x10</b>`;

  const luckyNumberText =
    `🎯 <b>Con số may mắn của phiên này:</b> <code>${state.luckyNumber}</code>\n` +
    `🎁 <b>Tiền thưởng:</b> <code>5.000</code>\n` +
    `<i>Nếu 2 số cuối ID của bạn trùng số may mắn thì chat lệnh <code>/nhanthuong</code> để nhận.</i>`;

  const lamCaiText = `⏰ Còn 20s để LÀM CÁI phiên #${state.phien + 1}\n\n✅ /lamcai [số tiền] (1.000.000 - 5.000.000)\n⚠️ Khi làm CÁI hệ thống sẽ tạm giữ số tiền tương ứng (2× số tiền làm cái làm giới hạn trả thưởng phiên).`;

  if (lobbySent) {
    await bot2.sendMessage(groupt, luckyWheelText, { parse_mode: "HTML" }).catch(() => {});
    await bot2.sendMessage(groupt, luckyNumberText, { parse_mode: "HTML" }).catch(() => {});
    await bot2.sendMessage(groupt, lamCaiText, { parse_mode: "HTML" }).catch(() => {});
  } else {
    sendMessageToRoom(luckyWheelText, { parse_mode: "HTML" });
    sendMessageToRoom(luckyNumberText, { parse_mode: "HTML" });
    sendMessageToRoom(lamCaiText, { parse_mode: "HTML" });
  }

  waitingCai.value = true;
  caiTimeout.value = setTimeout(() => {
    waitingCai.value = false;
    // Sau 20s làm cái mới bắt đầu hiện "xin mời đặt cược" (dù có người làm cái hay không)
    let pot = 10000;
    try { pot = readJson("hu.json").pot || 10000; } catch {}
    state.phienAnnounced = true;
    const bankerStatus = currentCai.value ? `👑 Chủ cái: <b>${currentCai.value.name}</b>` : `❌ Không Có Ai Làm Cái [Bot Tự Làm Cái]`;
    sendMessageToRoom(`${bankerStatus}\n💰 Hũ Hiện Tại: ${pot.toLocaleString("vi-VN")} xu 💰`, {
      reply_markup: {
        inline_keyboard: [[{ text: "⚡ Nạp Tiền Ngay", url: `https://t.me/${botUsernames[0]}?start=deposit` }]],
      },
    });
    // Khôi phục tin nhắn mời đặt cược
    setTimeout(() => {
      sendMessageToRoom(
        `📝 <b>Xin mời đặt cược phiên #${state.phien}</b>
` +
          `💰 Tiền cược tối thiểu <b>1.000</b> và tối đa <b>5.000.000</b>

` +
          `<b>Cách chơi:</b> <code>[Cửa cược] [số tiền]</code>
` +
          `• <code>T/X/C/L</code>
` +
          `• <code>D1, D2, ..., D6</code>
` +
          `• <code>SB3 - SB18</code>
` +
          `• <code>TC, TL, XC, XL</code>
` +
          `• <code>MM (1-9)</code> x7, VD: <code>MM 5 20000</code>

` +
          `<b>Cú pháp cược sảnh kịch tính:</b>
<code>t 50000</code> hoặc <code>c 100000</code>`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "🎮 Chơi Ngay 🎮", url: `https://t.me/${botUsernames[0]}?start=games` }]],
          },
        }
      );
    }, 1000);
  }, 20000);

  state.gamePhase = "REVEALING";
  state.secondsLeft = 12;
}

export function tickGameLoop() {
  try {
    processSoloRoomTimeouts();
    const nowVN = moment().tz("Asia/Ho_Chi_Minh");
    const todayStr = nowVN.format("YYYY/MM/DD");
    const lbStateFile = "leaderboard_state.json";

    if (fs.existsSync(lbStateFile)) {
      let lbState = JSON.parse(fs.readFileSync(lbStateFile, "utf8"));
      if (lbState.lastResetDay && lbState.lastResetDay !== todayStr) {
        const yesterdayStr = lbState.lastResetDay;
        const users = readJson(userJsonFile);
        const latestCompletedPhien = getLatestCompletedPhien();
        const leaderboard = buildDailyStreakLeaderboard(users, yesterdayStr, latestCompletedPhien);
        let sumAnnounce = `Thành Đã Bảo Trì UPDET Hoàn Tất`;

        const topWinners = leaderboard.slice(0, 3);
        const giftData = readJson(giftJsonFile);
        const existingCodes = new Set<string>((giftData || []).map((g: any) => String(g.gift || "").toUpperCase()));
        topWinners.forEach((entry: any, idx: number) => {
          const u = entry.user;
          const streak = entry.streak;
          const prizePower = DAILY_STREAK_PRIZES[idx];
          const code = generateAutoRewardGiftCode(existingCodes, idx + 1);
          giftData.push(createGiftcodeData(code, prizePower, "AUTO_DAILY_STREAK", 1, moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")));
          sendResilientReply(
            u.id,
            `🎉 <b>Thưởng BXH dây ngày ${yesterdayStr}</b>\n🏆 Hạng: <b>TOP ${idx + 1}</b>\n🔥 Thành tích: <b>${streak.label} ${streak.count} phiên</b>\n🎁 Giftcode: <code>/code ${code}</code>\n💎 Mệnh giá: <b>${prizePower.toLocaleString("vi-VN")} xu</b>\n⏰ Hệ thống tự trao lúc 00:00.`,
            { parse_mode: "HTML" }
          );
        });

        writeJson(giftJsonFile, giftData);
        sendMessageToRoom(sumAnnounce, { parse_mode: "HTML" });

        // Logic trả thưởng TOP CƯỢC NGÀY
        const topBetUsers = users
          .filter((u: any) => (u.cuocHomNay || 0) >= 3000000)
          .sort((a: any, b: any) => (b.cuocHomNay || 0) - (a.cuocHomNay || 0))
          .slice(0, 6);
        
        if (topBetUsers.length > 0) {
          const betGiftData = readJson(giftJsonFile);
          const betExistingCodes = new Set<string>((betGiftData || []).map((g: any) => String(g.gift || "").toUpperCase()));
          const betPrizes = [30000, 20000, 10000, 5000, 5000, 5000]; // Mốc thưởng Top 1-6: 30k, 20k, 10k, còn lại 5k

          topBetUsers.forEach((u: any, idx: number) => {
            const prize = betPrizes[idx] || 5000;
            const code = generateUniqueGiftCode(betExistingCodes);
            const record = createGiftcodeData(code, prize, "AUTO_TOP_BET", 1, moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"));
            betGiftData.push(record);
            sendResilientReply(
              u.id,
              `🏆 <b>Thưởng TOP CƯỢC NGÀY ${yesterdayStr}</b>\n🏅 Hạng: <b>TOP ${idx + 1}</b>\n💰 Tổng cược: <b>${(u.cuocHomNay || 0).toLocaleString("vi-VN")} xu</b>\n🎁 Giftcode: <code>/code ${record.gift}</code>\n💎 Mệnh giá: <b>${prize.toLocaleString("vi-VN")} xu</b>\n⏰ Hệ thống tự trao lúc 00:00.`,
              { parse_mode: "HTML" }
            );
          });
          writeJson(giftJsonFile, betGiftData);
        }

        users.forEach((u: any) => {
          u.cuocHomQua = u.cuocHomNay || 0;
          u.cuocHomNay = 0;
          u.lastBetResetDate = todayStr;
          resetUserDailyStreaks(u, todayStr);
        });
        writeJson(userJsonFile, users);
        lbState.lastResetDay = todayStr;
        writeJson(lbStateFile, lbState);
      }
    }
  } catch (e) {
    console.error("Leaderboard daily issues:", e);
  }

  if (state.gamePhase === "BETTING") {
    state.secondsLeft -= 1;
    let diceBetSum = 0;
    if (state.userBetsDice) {
      Object.entries(state.userBetsDice).forEach(([uid, list]) => {
        list.forEach(b => diceBetSum += b.amount);
      });
    }

    let sumBetSum = 0;
    if (state.userBetsSum) {
      Object.entries(state.userBetsSum).forEach(([uid, list]) => {
        list.forEach(b => sumBetSum += b.amount);
      });
    }

    let mmBetSum = 0;
    if (state.userBetsMM) {
      Object.entries(state.userBetsMM).forEach(([uid, list]) => {
        list.forEach(b => mmBetSum += b.amount);
      });
    }

    const totalMoneyBetted = state.totalBetT + state.totalBetX + state.totalBetC + state.totalBetL + state.totalBetTC + state.totalBetTL + state.totalBetXC + state.totalBetXL + diceBetSum + sumBetSum + mmBetSum;
    const activeBetsCount = 
      Object.keys(state.userBetsTX || {}).length + 
      Object.keys(state.userBetsCL || {}).length + 
      Object.keys(state.userBetsXien || {}).length +
      Object.keys(state.userBetsDice || {}).length +
      Object.keys(state.userBetsSum || {}).length +
      Object.keys(state.userBetsMM || {}).length;

    if (activeBetsCount > 0 && totalMoneyBetted > 0) {
      if ([45, 30, 20, 10].includes(state.secondsLeft)) {
        const xienParts: string[] = [];
        if (state.totalBetTC > 0) xienParts.push(`TC: ${state.totalBetTC.toLocaleString("vi-VN")}`);
        if (state.totalBetTL > 0) xienParts.push(`TL: ${state.totalBetTL.toLocaleString("vi-VN")}`);
        if (state.totalBetXC > 0) xienParts.push(`XC: ${state.totalBetXC.toLocaleString("vi-VN")}`);
        if (state.totalBetXL > 0) xienParts.push(`XL: ${state.totalBetXL.toLocaleString("vi-VN")}`);
        const totalXien = state.totalBetTC + state.totalBetTL + state.totalBetXC + state.totalBetXL;
        const xienDetails = xienParts.length > 0 ? `🧩 XIÊN: ${totalXien.toLocaleString("vi-VN")} (${xienParts.join(" | ")})` : "";

        const diceTotals: { [key: string]: number } = {};
        if (state.userBetsDice) {
          Object.values(state.userBetsDice).forEach((list) => {
            list.forEach((b) => {
              const key = b.betType.toUpperCase();
              diceTotals[key] = (diceTotals[key] || 0) + b.amount;
            });
          });
        }
        const diceParts = Object.entries(diceTotals)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
        const totalDice = Object.values(diceTotals).reduce((sum, val) => sum + val, 0);
        const diceDetails = diceParts.length > 0 ? `🎲 D: ${totalDice.toLocaleString("vi-VN")} (${diceParts.join(" | ")})` : "";

        const sumTotals: { [key: string]: number } = {};
        if (state.userBetsSum) {
          Object.values(state.userBetsSum).forEach((list) => {
            list.forEach((b) => {
              const key = b.betType.toUpperCase();
              sumTotals[key] = (sumTotals[key] || 0) + b.amount;
            });
          });
        }
        const sumParts = Object.entries(sumTotals)
          .sort((a, b) => {
            const numA = parseInt(a[0].replace("SB", ""), 10) || 0;
            const numB = parseInt(b[0].replace("SB", ""), 10) || 0;
            return numA - numB;
          })
          .map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
        const totalSum = Object.values(sumTotals).reduce((sum, val) => sum + val, 0);
        const sumDetails = sumParts.length > 0 ? `📊 SB: ${totalSum.toLocaleString("vi-VN")} (${sumParts.join(" | ")})` : "";

        const mmTotals: { [key: string]: number } = {};
        if (state.userBetsMM) {
          Object.values(state.userBetsMM).forEach((list) => {
            list.forEach((b) => {
              const rawKey = String(b.betType || "").toLowerCase();
              const mmNum = parseInt(rawKey.replace("mm", ""), 10);
              if (isNaN(mmNum) || mmNum < 1 || mmNum > 9) return;
              const key = `MM${mmNum}`;
              mmTotals[key] = (mmTotals[key] || 0) + (b.amount || 0);
            });
          });
        }
        const mmParts = Object.entries(mmTotals)
          .sort((a, b) => (parseInt(a[0].replace("MM", ""), 10) || 0) - (parseInt(b[0].replace("MM", ""), 10) || 0))
          .map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
        const totalMM = Object.values(mmTotals).reduce((sum, val) => sum + val, 0);
        const mmDetails = mmParts.length > 0 ? `🎡 MM: ${totalMM.toLocaleString("vi-VN")} (${mmParts.join(" | ")})` : "";

        const detailBlocks = [xienDetails, diceDetails, sumDetails, mmDetails].filter(Boolean);

        let counters = `⏰ <b>Còn ${state.secondsLeft} giây phiên #${state.phien}</b>\n` +
          `🔵 TÀI: ${state.totalBetT.toLocaleString("vi-VN")}\n` +
          `🔴 XỈU: ${state.totalBetX.toLocaleString("vi-VN")}\n\n` +
          `⚪️ CHẴN: ${state.totalBetC.toLocaleString("vi-VN")}\n` +
          `⚫️ LẺ: ${state.totalBetL.toLocaleString("vi-VN")}`;
        if (detailBlocks.length > 0) counters += `\n\n${detailBlocks.join("\n")}`;

        // Tự động xóa tin nhắn 45s và 30s khi tới 20s
        if (state.secondsLeft === 20) {
          state.lastCountdownMessageIds.forEach((id) => {
            bot2.deleteMessage(groupt, id).catch(() => {});
          });
          state.lastCountdownMessageIds = [];
        }

        sendMessageToRoom(counters, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "⚡ Nạp Tiền Ngay", url: `https://t.me/${botUsernames[0]}?start=deposit` }]],
          },
        }).then((sentMsg) => {
          if (sentMsg && [45, 30, 20].includes(state.secondsLeft)) {
            state.lastCountdownMessageIds.push(sentMsg.message_id);
          }
        });
      }
    }

    if (state.secondsLeft <= 0) {
      lockGroupChat();
      // Chi tiết xiên / D / SB: hiển thị rõ như phần thông báo giây (chỉ hiện khi có cược)
      const xienParts: string[] = [];
      if (state.totalBetTC > 0) xienParts.push(`TC: ${state.totalBetTC.toLocaleString("vi-VN")}`);
      if (state.totalBetTL > 0) xienParts.push(`TL: ${state.totalBetTL.toLocaleString("vi-VN")}`);
      if (state.totalBetXC > 0) xienParts.push(`XC: ${state.totalBetXC.toLocaleString("vi-VN")}`);
      if (state.totalBetXL > 0) xienParts.push(`XL: ${state.totalBetXL.toLocaleString("vi-VN")}`);
      const totalXien = state.totalBetTC + state.totalBetTL + state.totalBetXC + state.totalBetXL;
      const xienDetails = xienParts.length > 0 ? `🧩 XIÊN: ${totalXien.toLocaleString("vi-VN")} (${xienParts.join(" | ")})` : "";

      const diceTotals: { [key: string]: number } = {};
      if (state.userBetsDice) {
        Object.values(state.userBetsDice).forEach((list) => {
          list.forEach((b) => {
            const key = String(b.betType || "").toUpperCase();
            if (!key) return;
            diceTotals[key] = (diceTotals[key] || 0) + (b.amount || 0);
          });
        });
      }
      const diceParts = Object.entries(diceTotals)
        .filter(([, val]) => (val || 0) > 0)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
      const totalDice = diceParts.length > 0 ? Object.values(diceTotals).reduce((sum, val) => sum + (val || 0), 0) : 0;
      const diceDetails = diceParts.length > 0 ? `🎲 D: ${totalDice.toLocaleString("vi-VN")} (${diceParts.join(" | ")})` : "";

      const sumTotals: { [key: string]: number } = {};
      if (state.userBetsSum) {
        Object.values(state.userBetsSum).forEach((list) => {
          list.forEach((b) => {
            const key = String(b.betType || "").toUpperCase();
            if (!key) return;
            sumTotals[key] = (sumTotals[key] || 0) + (b.amount || 0);
          });
        });
      }
      const sumParts = Object.entries(sumTotals)
        .filter(([, val]) => (val || 0) > 0)
        .sort((a, b) => {
          const numA = parseInt(a[0].replace("SB", ""), 10) || 0;
          const numB = parseInt(b[0].replace("SB", ""), 10) || 0;
          return numA - numB;
        })
        .map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
      const totalSum = sumParts.length > 0 ? Object.values(sumTotals).reduce((sum, val) => sum + (val || 0), 0) : 0;
      const sumDetails = sumParts.length > 0 ? `📊 SB: ${totalSum.toLocaleString("vi-VN")} (${sumParts.join(" | ")})` : "";

      const mmTotals: { [key: string]: number } = {};
      if (state.userBetsMM) {
        Object.values(state.userBetsMM).forEach((list) => {
          list.forEach((b) => {
            const rawKey = String(b.betType || "").toLowerCase();
            const mmNum = parseInt(rawKey.replace("mm", ""), 10);
            if (isNaN(mmNum) || mmNum < 1 || mmNum > 9) return;
            const key = `MM${mmNum}`;
            mmTotals[key] = (mmTotals[key] || 0) + (b.amount || 0);
          });
        });
      }
      const mmParts = Object.entries(mmTotals)
        .filter(([, val]) => (val || 0) > 0)
        .sort((a, b) => (parseInt(a[0].replace("MM", ""), 10) || 0) - (parseInt(b[0].replace("MM", ""), 10) || 0))
        .map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
      const totalMM = mmParts.length > 0 ? Object.values(mmTotals).reduce((sum, val) => sum + (val || 0), 0) : 0;
      const mmDetails = mmParts.length > 0 ? `🎡 MM: ${totalMM.toLocaleString("vi-VN")} (${mmParts.join(" | ")})` : "";

      let lockedMsg =
        `Hết thời gian đặt cược phiên #${state.phien}\n` +
        `🔵 TÀI: ${state.totalBetT.toLocaleString("vi-VN")}\n` +
        `🔴 XỈU: ${state.totalBetX.toLocaleString("vi-VN")}\n\n` +
        `⚪️ CHẴN: ${state.totalBetC.toLocaleString("vi-VN")}\n` +
        `⚫️ LẺ: ${state.totalBetL.toLocaleString("vi-VN")}`;

      const extraBlocks = [xienDetails, diceDetails, sumDetails, mmDetails].filter(Boolean);
      // Không có ai cược xiên / D / SB / MM thì không hiện các dòng này
      if (extraBlocks.length > 0) lockedMsg += `\n\n${extraBlocks.join("\n")}`;
      
      // Xóa tin nhắn 20s khi hết thời gian cược
      state.lastCountdownMessageIds.forEach((id) => {
        bot2.deleteMessage(groupt, id).catch(() => {});
      });
      state.lastCountdownMessageIds = [];

      sendMessageToRoom(lockedMsg, { parse_mode: "HTML" });
      state.gamePhase = "LOCKED";
      state.secondsLeft = 10;
    }
  } else if (state.gamePhase === "LOCKED") {
    state.secondsLeft -= 1;
    if (state.secondsLeft <= 0) {
      state.gamePhase = "ROLLING";
      sendMessageToRoom(`💥 Bắt đầu tung XX phiên #${state.phien} 💥`, { parse_mode: "HTML" });
      // Cho text "Bắt đầu tung" hiện trước, rồi mới tới "Tung XX" và bắt đầu tung xúc xắc
      setTimeout(() => {
        // Bỏ thông báo "🎲 Tung XX phiên #..." để tránh spam nhóm
        sendDice();
      }, 1200);
    }
  } else if (state.gamePhase === "REVEALING") {
    state.secondsLeft -= 1;
    if (state.secondsLeft <= 0) {
      state.phien += 1;
      savePhien();
      state.gamePhase = "BETTING";
      state.secondsLeft = 60;
      resetBettingSession();
      unlockGroupChat();
    }
  }
}

// --- TELEGRAM BOT REGISTER COMMANDS ---
export function registerAllBotCommands() {
  const onAdminCommand = (regex: RegExp, handler: (bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) => void) => {
    const wrap = (bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) => {
      if (isAdminUser(msg.from?.id)) handler(bot, msg, match);
    };
    bot4.onText(regex, (msg, match) => wrap(bot4, msg, match));
    bot1.onText(regex, (msg, match) => wrap(bot1, msg, match));
  };

  const handleCheckCommand = async (bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) => {
    const senderId = msg.from?.id;
    const chatId = msg.chat.id;
    const isAdmin = isAdminUser(senderId);
    let canUse = isAdmin;

    if (!canUse && isGameRoomChat(chatId) && senderId) {
      try {
        const member = await bot1.getChatMember(groupt, senderId);
        canUse = ["creator", "administrator"].includes((member as any)?.status);
      } catch {}
    }

    if (!canUse) return;

    let targetId = "";
    if (match?.[1]) targetId = match[1];
    else if (msg.reply_to_message?.from?.id) targetId = String(msg.reply_to_message.from.id);

    if (!targetId) {
      bot.sendMessage(chatId, `⚠️ Dùng <code>/check [id]</code> hoặc reply vào người cần kiểm tra.`, { parse_mode: "HTML" });
      return;
    }

    const users = readJson(userJsonFile);
    const u = users.find((x: any) => String(x.id) === String(targetId));
    if (!u) {
      bot.sendMessage(chatId, "❌ Không tìm thấy user này.");
      return;
    }

    bot.sendMessage(chatId, formatUserCheckMessage(u), { parse_mode: "HTML" });
  };

  bot1.onText(/^\/check(?:\s+(\d+))?$/, (msg, match) => { handleCheckCommand(bot1, msg, match).catch(() => {}); });
  bot4.onText(/^\/check(?:\s+(\d+))?$/, (msg, match) => { handleCheckCommand(bot4, msg, match).catch(() => {}); });

  onAdminCommand(/^\/thongke/, (bot, msg) => {
    try {
      const users = readJson(userJsonFile);
      const today = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
      
      let totalNap = 0, totalRut = 0, totalHH = 0, totalBal = 0;
      let napToday = 0, rutToday = 0, rutNoviceNoDeposit = 0;

      users.forEach((u: any) => {
        totalNap += u.nap || 0;
        totalRut += u.rut || 0;
        totalHH += u.hh || 0;
        totalBal += (u.sd !== undefined ? u.sd : (u.money || 0));

        // Kiểm tra nếu là tân thủ chưa từng nạp tiền
        const isNeverDeposited = (u.nap || 0) === 0;

        // Thống kê nạp/rút hôm nay từ lịch sử (nếu có)
        // Logic này tự động reset sau 00h00 vì nó lọc theo biến 'today' (ngày hiện tại)
        if (u.depositHistory) {
          u.depositHistory.forEach((h: any) => {
            if (h.time && h.time.startsWith(today) && (h.status === "Thành công" || !h.status)) {
              napToday += h.amount || 0;
            }
          });
        }
        if (u.withdrawHistory) {
          u.withdrawHistory.forEach((h: any) => {
            if (h.status === "Thành công" || h.status === "Đang xử lý") {
              if (h.time && h.time.startsWith(today)) {
                rutToday += h.amount || 0;
              }
              // Tính tổng lệnh rút của tân thủ chưa nạp tiền (tính tất cả lịch sử hoặc theo nhu cầu)
              if (isNeverDeposited) {
                rutNoviceNoDeposit += h.amount || 0;
              }
            }
          });
        }
      });

      const pot = readJson("hu.json").pot || 10000;
      const profit = totalNap - totalRut - totalHH;
      const profitSign = profit >= 0 ? "+" : "";

      const statsText = `💻 <b>THỐNG KÊ HỆ THỐNG</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👥 Tổng User: <b>${users.length} acc</b>\n` +
        `💰 Số dư thành viên: <b>${totalBal.toLocaleString("vi-VN")} xu</b>\n` +
        `📥 Tổng nạp: <b>${totalNap.toLocaleString("vi-VN")} xu</b>\n` +
        `📤 Tổng rút: <b>${totalRut.toLocaleString("vi-VN")} xu</b>\n` +
        `💸 Chi Hoa hồng: <b>${totalHH.toLocaleString("vi-VN")} xu</b>\n` +
        `🏺 Quỹ hũ rồng: <b>${pot.toLocaleString("vi-VN")} xu</b>\n` +
        `📊 Lãi/Lỗ: <b>${profitSign}${profit.toLocaleString("vi-VN")} xu</b>\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📅 <b>THỐNG KÊ HÔM NAY (${today}):</b>\n` +
        `📥 Nạp hôm nay: <b>${Math.floor(napToday).toLocaleString("vi-VN")} xu</b>\n` +
        `📤 Rút hôm nay: <b>${Math.floor(rutToday).toLocaleString("vi-VN")} xu</b>\n` +
        `💸 Chi Lệnh Rút Tân thủ chưa nạp tiền: <b>${Math.floor(rutNoviceNoDeposit).toLocaleString("vi-VN")} xu</b>`;

      bot.sendMessage(msg.chat.id, statsText, { parse_mode: "HTML" });
    } catch (e) {
      console.error("Thong ke error:", e);
      bot.sendMessage(msg.chat.id, "❌ Lỗi đọc database thống kê.");
    }
  });

  onAdminCommand(/^\/ban (\d+)/, (bot, msg, match) => {
    if (!match) return;
    const target = parseInt(match[1], 10);
    const banned = readJson(banJsonFile);
    if (!banned.some((x: any) => x.id === target)) {
      banned.push({ id: target, reason: "Banned by Admin", time: new Date().toISOString() });
      writeJson(banJsonFile, banned);
      bot.sendMessage(msg.chat.id, `✅ Đã khóa tài khoản ID ${target}.`);
    }
  });

  onAdminCommand(/^\/unban (\d+)/, (bot, msg, match) => {
    if (!match) return;
    const target = match[1];
    let banned = readJson(banJsonFile);
    banned = banned.filter((x: any) => String(x.id) !== String(target));
    writeJson(banJsonFile, banned);
    bot.sendMessage(msg.chat.id, `✅ Đã mở khóa tài khoản ID ${target}.`);
  });

  onAdminCommand(/^\/nap (\d+) (\d+)$/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u: any) => String(u.id) === String(targetId));
    if (idx === -1) {
      bot.sendMessage(msg.chat.id, "❌ Thành viên chưa từng start Bot!");
      return;
    }

    const result = addDepositToUser(users[idx], money);

    if (!users[idx].depositHistory) users[idx].depositHistory = [];
    users[idx].depositHistory.unshift({ time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), amount: money.toLocaleString("vi-VN"), status: "Thành công" });
    writeJson(userJsonFile, users);

    bot.sendMessage(msg.chat.id, `✅ Nạp thành công cho <code>${targetId}</code>.`, { parse_mode: "HTML" });

    let notifyMsg = `💰 Bạn được cộng +<b>${money.toLocaleString("vi-VN")} xu</b> nạp tiền thành công!\n🎉 Khuyến mãi ${result.promoRate}%: +<b>${result.promoAmount.toLocaleString("vi-VN")} xu</b>\n`;
    if (result.baseResetOccurred) {
      notifyMsg += `⚠️ <b>Lưu ý:</b> Tài khoản chưa mở khóa tân thủ nên số dư trước đó của bạn đã bị reset về <code>0 xu</code>.\n`;
    }
    if (result.newlyUnlocked) {
      notifyMsg += `🎉 <b>Chúc mừng! Bạn đã mở khóa thành viên Tân Thủ thành công</b> (Tổng nạp đạt ${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).\n`;
    } else if (result.totalNapAfter < 10000000) { // arbitrary, we know totalNapAfter < 20000 from addDepositToUser if not newlyUnlocked and totalNapBefore was < 20000
      if (result.totalNapAfter < 20000) {
        notifyMsg += `🔒 <b>Trạng thái:</b> Chưa mở khóa Tân Thủ (${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).\n`;
      }
    }


    bot1.sendMessage(targetId, notifyMsg, { parse_mode: "HTML" }).catch(() => {});

    const maskedId = String(targetId).length > 5 ? "*****" + String(targetId).slice(-5) : targetId;
    sendMessageToRoom(
      `😂🔴 <b>Người chơi ID:</b> <code>${maskedId}</code>\n` +
      `- Nạp bank thành công: <b>${money.toLocaleString("vi-VN")} xu</b>\n` +
      `🎉 Khuyến mãi thêm ${result.promoRate}%: <b>${result.promoAmount.toLocaleString("vi-VN")} xu</b>`,
      { parse_mode: "HTML" }
    );

  });

  onAdminCommand(/^\/tru (\d+) (\d+)$/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u: any) => String(u.id) === String(targetId));
    if (idx !== -1) {
      users[idx].sd = Math.max(0, (users[idx].sd || 0) - money);
      if (users[idx].money !== undefined) users[idx].money = Math.max(0, (users[idx].money || 0) - money);
      writeJson(userJsonFile, users);
      bot.sendMessage(msg.chat.id, `✅ Đã khấu trừ -${money.toLocaleString("vi-VN")} xu của ID ${targetId}.`);
    }
  });

  onAdminCommand(/^\/reset$/, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "❌ Lệnh này chỉ dùng trong nhóm admin.");
      return;
    }
    writeJson(userJsonFile, []);
    writeJson(banJsonFile, []);
    currentCai.value = null;
    resetBettingSession();
    bot.sendMessage(msg.chat.id, "✅ Đã xóa toàn bộ người dùng và danh sách khóa. Tất cả sẽ quay về trạng thái người chơi mới.");
  });

  onAdminCommand(/^\/resetcode$/, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "❌ Lệnh này chỉ dùng trong nhóm admin.");
      return;
    }
    writeJson(giftJsonFile, []);
    bot.sendMessage(msg.chat.id, "✅ Đã xóa toàn bộ giftcode trong server.");
  });

  onAdminCommand(/^\/batkm$/, (bot, msg) => {
    if (promoTimeout.value) {
      clearTimeout(promoTimeout.value);
      promoTimeout.value = null;
    }

    isExtraPromoActive.value = true;
    const startTime = moment().tz("Asia/Ho_Chi_Minh");
    const endTime = startTime.clone().add(1, "hour");
    const startStr = startTime.format("HH:mm");
    const endStr = endTime.format("HH:mm");

    sendMessageToRoom(
      `🔥 <b>THÔNG BÁO KHUYẾN MÃI SIÊU CẤP</b> 🔥\n\n` +
      `🚀 Hệ thống áp dụng <b>KM 15%</b> giá trị nạp!\n` +
      `⏰ Thời gian: Từ <b>${startStr}</b> đến <b>${endStr}</b>\n` +
      `💰 Nạp ngay để nhận ưu đãi cực khủng từ Dragon Room!`,
      { parse_mode: "HTML" }
    ).then((sentMsg) => {
      if (sentMsg && sentMsg.message_id) {
        promoPinnedMessageId.value = sentMsg.message_id;
        const pinBots = [bot1, bot2, bot3, bot4, bot5];
        const tryPin = (idx: number) => {
          if (idx >= pinBots.length) return;
          pinBots[idx].pinChatMessage(groupt, sentMsg.message_id).catch(() => tryPin(idx + 1));
        };
        tryPin(0);
      }
    });
    bot.sendMessage(msg.chat.id, `✅ Đã BẬT khuyến mãi 15% (Từ ${startStr} đến ${endStr}). Hệ thống sẽ tự tắt sau 1 tiếng.`);

    promoTimeout.value = setTimeout(() => {
      isExtraPromoActive.value = false;
      promoTimeout.value = null;
      if (promoPinnedMessageId.value) {
        const pinBots = [bot1, bot2, bot3, bot4, bot5];
        const tryUnpin = (idx: number) => {
          if (idx >= pinBots.length) return;
          pinBots[idx].unpinChatMessage(groupt, { message_id: promoPinnedMessageId.value! }).catch(() => tryUnpin(idx + 1));
        };
        tryUnpin(0);
        promoPinnedMessageId.value = null;
      }
      sendMessageToRoom(
        `📢 <b>THÔNG BÁO KẾT THÚC KHUYẾN MÃI</b>\n\n` +
        `⛔ Chương trình KM 15% đã kết thúc.\n` +
        `🔄 Hệ thống trở về mức KM mặc định <b>3%</b>.\n` +
        `🙏 Cảm ơn các bạn đã ủng hộ Dragon Room!`,
        { parse_mode: "HTML" }
      );
    }, 60 * 60 * 1000);
  });

  onAdminCommand(/^\/tatkm$/, (bot, msg) => {
    if (promoTimeout.value) {
      clearTimeout(promoTimeout.value);
      promoTimeout.value = null;
    }
    if (promoPinnedMessageId.value) {
      const pinBots = [bot1, bot2, bot3, bot4, bot5];
      const tryUnpin = (idx: number) => {
        if (idx >= pinBots.length) return;
        pinBots[idx].unpinChatMessage(groupt, { message_id: promoPinnedMessageId.value! }).catch(() => tryUnpin(idx + 1));
      };
      tryUnpin(0);
      promoPinnedMessageId.value = null;
    }
    isExtraPromoActive.value = false;
    sendMessageToRoom(
      `📢 <b>THÔNG BÁO KẾT THÚC KHUYẾN MÃI</b>\n\n` +
      `⛔ Chương trình KM 15% đã kết thúc.\n` +
      `🔄 Hệ thống trở về mức KM mặc định <b>3%</b>.\n` +
      `🙏 Cảm ơn các bạn đã ủng hộ Dragon Room!`,
      { parse_mode: "HTML" }
    );
    bot.sendMessage(msg.chat.id, "✅ Đã TẮT khuyến mãi 15%.");
  });


  onAdminCommand(/^\/mycode(?:\s+.+)?$/i, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "❌ Lệnh này chỉ dùng trong nhóm admin.");
      return;
    }

    const rawArgs = String(msg.text || "").replace(/^\/mycode(?:@\w+)?/i, "").trim();
    const parts = rawArgs.split(/\s+/).filter(Boolean);
    if (parts.length !== 2 && parts.length !== 3) {
      bot.sendMessage(
        msg.chat.id,
        `⚠️ <b>Sai cú pháp /mycode</b>\n• Ngẫu nhiên: <code>/mycode [số_xu] [số_lượt]</code>\n• Tự đặt mã: <code>/mycode [mã_code] [số_xu] [số_lượt]</code>\n\nVí dụ:\n• <code>/mycode 10000 5</code>\n• <code>/mycode CODEVIP 10000 5</code>`,
        { parse_mode: "HTML" }
      );
      return;
    }

    let customCode = "";
    let amount = 0;
    let maxUses = 0;
    if (parts.length === 2) {
      amount = parseInt(parts[0], 10);
      maxUses = parseInt(parts[1], 10);
    } else {
      customCode = normalizeRoomGiftcode(String(parts[0] || ""));
      amount = parseInt(parts[1], 10);
      maxUses = parseInt(parts[2], 10);
    }

    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(maxUses) || maxUses <= 0) {
      bot.sendMessage(msg.chat.id, "❌ Số tiền và số lượt nhập phải lớn hơn 0.");
      return;
    }

    if (customCode && !/^[A-Z0-9_-]{4,32}$/.test(customCode)) {
      bot.sendMessage(msg.chat.id, "❌ Mã code chỉ được chứa chữ in hoa, số, dấu gạch ngang hoặc gạch dưới, độ dài 4-32 ký tự.");
      return;
    }

    const giftData = readJson(giftJsonFile, "[]");
    const existingCodes = new Set<string>((giftData || []).map((g: any) => String(g.gift || "").toUpperCase()));
    let finalCode = customCode;

    if (finalCode) {
      finalCode = normalizeRoomGiftcode(finalCode);
      if (existingCodes.has(finalCode)) {
        bot.sendMessage(msg.chat.id, `❌ Mã <code>${finalCode}</code> đã tồn tại.`, { parse_mode: "HTML" });
        return;
      }
      existingCodes.add(finalCode);
    } else {
      finalCode = generateUniqueAdminGiftCode(existingCodes);
    }

    const record = createGiftcodeData(finalCode, amount, `ADMIN_${msg.from?.id || "UNKNOWN"}`, maxUses);
    giftData.push(record);
    writeJson(giftJsonFile, giftData);

    bot.sendMessage(
      msg.chat.id,
      `✅ <b>Tạo giftcode thành công</b>\n` +
      `🔑 Mã: <code>/code ${record.gift}</code>\n` +
      `💰 Mệnh giá: <b>${amount.toLocaleString("vi-VN")} xu</b>\n` +
      `🔁 Số lượt nhập: <b>${maxUses}</b>\n` +
      `👤 Cách tạo: <b>${customCode ? "Admin tự đặt mã" : "Ngẫu nhiên"}</b>`,
      { parse_mode: "HTML" }
    );
  });

  onAdminCommand(/^\/hs$/, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "❌ Lệnh này chỉ dùng trong nhóm admin.");
      return;
    }
    const helpText = `🛠️ <b>HƯỚNG DẪN LỆNH ADMIN</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `• <code>/hs</code> - Xem hướng dẫn lệnh admin\n` +
      `• <code>/thongke</code> - Xem thống kê hệ thống\n` +
      `• <code>/check [id]</code> - Kiểm tra thông tin user\n` +
      `• <code>/nap [id] [xu]</code> - Cộng nạp cho user\n` +
      `• <code>/tru [id] [xu]</code> - Trừ xu user\n` +
      `• <code>/ban [id]</code> - Khóa tài khoản\n` +
      `• <code>/unban [id]</code> - Mở khóa tài khoản\n` +
      `• <code>/duyet_rut [id] [xu]</code> - Duyệt lệnh rút\n` +
      `• <code>/tuchoi_rut [id] [xu] [lý do]</code> - Từ chối lệnh rút\n` +
      `• <code>/mycode [số_xu] [số_lượt]</code> - Tạo giftcode ngẫu nhiên\n` +
      `• <code>/mycode [mã_code] [số_xu] [số_lượt]</code> - Admin tự đặt tên code\n` +
      `• <code>/reset</code> - Xóa toàn bộ người dùng, reset về người chơi mới\n` +
      `• <code>/resetcode</code> - Xóa toàn bộ giftcode trong server\n` +
      `• <code>/batkm</code> - Bật khuyến mãi 15% (tự tắt sau 1h)\n` +
      `• <code>/tatkm</code> - Tắt khuyến mãi thủ công\n\n` +
      `🔐 <i>Lệnh này chỉ admin mới dùng được và chỉ hiển thị trong nhóm admin.</i>`;
    bot.sendMessage(msg.chat.id, helpText, { parse_mode: "HTML" });
  });

  onAdminCommand(/^\/top$/, (bot, msg) => {
    const users = readJson(userJsonFile);
    const topUsers = getTopUsersBySd(users, 4);
    bot.sendMessage(msg.chat.id, formatTopUsersMessage(topUsers), { parse_mode: "HTML" });
  });

  onAdminCommand(/^\/duyet_rut (\d+) (\d+)/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u: any) => String(u.id) === String(targetId));
    if (idx !== -1) {
      const u = users[idx];
      let adminMsgId: number | undefined;
      let bankName = "Ngân hàng";
      if (u.withdrawHistory) {
        const item = u.withdrawHistory.find((h: any) => h.status === "Đang xử lý" && String(h.amount) === String(money));
        if (item) {
          item.status = "Thành công";
          adminMsgId = item.adminMessageId;
          bankName = item.bankName || "Ngân hàng";
        }
      }
      writeJson(userJsonFile, users);
      bot.sendMessage(msg.chat.id, `✅ Chấp thuận đơn rút ${money.toLocaleString("vi-VN")} xu cho ID ${targetId}.`);
      bot1.sendMessage(targetId, `✅ Đơn rút xu trị giá <b>${money.toLocaleString("vi-VN")} xu</b> đã được phê duyệt chuyển khoản thành công!`, { parse_mode: "HTML" }).catch(() => {});
      if (adminMsgId) unpinFromAdminGroup(adminMsgId);
      sendMessageToRoom(`<b>🤩🏮 ID người chơi: ${formatMaskedId(u.id)} - ${bankName} Rút thành công: ${money.toLocaleString("vi-VN")}</b>`, { parse_mode: "HTML" });
    }
  });

  onAdminCommand(/^\/tuchoi_rut (\d+) (\d+)(?: (.+))?$/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const reason = match[3] || "Sai thông tin";
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u: any) => String(u.id) === String(targetId));
    if (idx !== -1) {
      const u = users[idx];
      let adminMsgId: number | undefined;
      let refundAmount = money;
      if (u.withdrawHistory) {
        const item = u.withdrawHistory.find((h: any) => h.status === "Đang xử lý" && String(h.amount) === String(money));
        if (item) {
          item.status = `Từ chối: ${reason}`;
          adminMsgId = item.adminMessageId;
          const fee = item.fee || 0;
          refundAmount = money + fee;
        }
      }
      u.sd = (u.sd || 0) + refundAmount;
      if (u.money !== undefined) u.money = (u.money || 0) + refundAmount;
      writeJson(userJsonFile, users);
      bot.sendMessage(msg.chat.id, `❌ Đã hủy bỏ đơn rút xu cho ID ${targetId}.`);
      bot1.sendMessage(targetId, `❌ Yêu cầu rút xu ${money.toLocaleString("vi-VN")} xu đã bị từ chối! Hoàn xu ví. Lý do: ${reason}`, { parse_mode: "HTML" }).catch(() => {});
      if (adminMsgId) unpinFromAdminGroup(adminMsgId);
    }
  });

  const handleBet = (chatId: string | number, userId: string, username: string, category: string, type: string, amountStr: string, msgId?: number, isGroup = false, isAnonymous = false) => {
    if (isBanned(userId)) return;
    const sendError = (msgText: string) => {
      if (isAnonymous) bot1.sendMessage(userId, msgText, { parse_mode: "HTML" }).catch(() => {});
      else sendResilientReply(chatId, msgText, { parse_mode: "HTML", ...(msgId ? { reply_to_message_id: msgId } : {}) });
    };

    if (state.gamePhase !== "BETTING" || !state.phienAnnounced) {
      sendError(`⚠️ <b>Phiên cược chưa mở!</b> ❌`);
      return;
    }

    try {
      const users = readJson(userJsonFile);
      const uIdx = users.findIndex((u: any) => String(u.id) === String(userId));
      if (uIdx === -1) {
        sendError(`⚠️ Bạn chưa start bot! Click @${botUsernames[0]} gõ <code>/start</code> để đăng ký.`);
        return;
      }
      const user = users[uIdx];
      const activeBetGame = getUserActiveBetGame(user);
      const txBet = state.userBetsTX[userId]?.amount || 0;
      const clBet = state.userBetsCL[userId]?.amount || 0;
      const xBet = state.userBetsXien[userId]?.amount || 0;
      
      let diceBetSum = 0;
      if (state.userBetsDice && state.userBetsDice[userId]) state.userBetsDice[userId].forEach((b: any) => diceBetSum += b.amount);
      let sumBetSum = 0;
      if (state.userBetsSum && state.userBetsSum[userId]) state.userBetsSum[userId].forEach((b: any) => sumBetSum += b.amount);
      let mmBetSum = 0;
      if (state.userBetsMM && state.userBetsMM[userId]) state.userBetsMM[userId].forEach((b: any) => mmBetSum += b.amount);
      const combined = txBet + clBet + xBet + diceBetSum + sumBetSum + mmBetSum;

      if (combined >= SESSION_LIMIT) {
        sendError(`⚠️ Đạt giới hạn cược tối đa ${SESSION_LIMIT.toLocaleString("vi-VN")} xu một phiên!`);
        return;
      }

      // Giới hạn Tân Thủ cược tối đa 10k/phiên
      if (!isNoviceUnlocked(user)) {
        if (combined >= 10000) {
          sendError(`⚠️ <b>Tân Thủ</b> chỉ được cược tối đa <b>10.000 xu</b> mỗi phiên! Bạn đã đạt giới hạn cược.`);
          return;
        }
      }

      const balance = user.sd !== undefined ? user.sd : (user.money || 0);
      
      // Kiểm tra số dư trước khi tính toán mức cược
      if (balance < 1000) {
        sendError("⚠️ <b>Số Dư Của Bạn Không Đủ</b> ❌");
        return;
      }

      let betValue = parseBetAmount(amountStr, balance, combined, SESSION_LIMIT);

      // Với lệnh max/all, nếu số dư cao hơn 5.000.000 thì bot tự lấy 5.000.000.
      // Với lệnh nhập thường, vẫn chặn trần tối đa 5.000.000 xu.
      if (betValue > 5000000) betValue = 5000000;

      // Điều chỉnh betValue nếu là Tân Thủ và tổng cược vượt quá 10k
      if (!isNoviceUnlocked(user)) {
        if (combined + betValue > 10000) {
          betValue = 10000 - combined;
        }
        if (betValue <= 0) {
           sendError(`⚠️ <b>Tân Thủ</b> chỉ được cược tối đa <b>10.000 xu</b> mỗi phiên! Số tiền cược của bạn không thể đặt thêm.`);
           return;
        }
      }

      if (isTelegramXXBetType(type)) {
        if (activeBetGame !== "TELEGRAM_XX") {
          bot1.sendMessage(userId, `⚠️ 4 lệnh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> đang bị khóa. Muốn chơi thì vào bot <b>chọn game XÚC XẮC TELEGRAM</b> trước.`, { parse_mode: "HTML" }).catch(() => {});
          return;
        }
        if (isNaN(betValue) || betValue < TELEGRAM_XX_MIN_BET) {
          sendError(`⚠️ Cược ${getTelegramXXLabel(type)} tối thiểu từ <b>${TELEGRAM_XX_MIN_BET.toLocaleString("vi-VN")} xu</b>!`);
          return;
        }
        if (betValue > TELEGRAM_XX_MAX_BET) {
          sendError(`⚠️ Cược ${getTelegramXXLabel(type)} tối đa <b>${TELEGRAM_XX_MAX_BET.toLocaleString("vi-VN")} xu</b>!`);
          return;
        }
      } else if (isNaN(betValue) || betValue < 1000) {
        sendError("⚠️ <b>Số Dư Của Bạn Không Đủ</b> ❌");
        return;
      }
      if (balance < betValue) {
        sendError(getShortInsufficientBalanceMessage(user));
        return;
      }

      if (category === "TX") {
        if (type === "t" && state.totalBetT + betValue - state.totalBetX > CANCUA_LIMIT) {
          sendError("⚠️ Cửa TÀI đang lệch thặng dư quá lớn!");
          return;
        }
        if (type === "x" && state.totalBetX + betValue - state.totalBetT > CANCUA_LIMIT) {
          sendError("⚠️ Cửa XỈU đang lệch thặng dư quá lớn!");
          return;
        }
      } else if (category === "CL") {
        if (type === "c" && state.totalBetC + betValue - state.totalBetL > CANCUA_LIMIT) {
          sendError("⚠️ Cửa CHẮN đang lệch thặng dư quá lớn!");
          return;
        }
        if (type === "l" && state.totalBetL + betValue - state.totalBetC > CANCUA_LIMIT) {
          sendError("⚠️ Cửa LẺ đang lệch thặng dư quá lớn!");
          return;
        }
      }

      if (category === "TX" && state.userBetsTX[userId] && state.userBetsTX[userId].betType !== type) {
        sendError("⚠️ Không đặt cả 2 bên TÀI - XỈU!");
        return;
      }
      if (category === "CL" && state.userBetsCL[userId] && state.userBetsCL[userId].betType !== type) {
        sendError("⚠️ Không đặt cả 2 bên CHẮN - LẺ!");
        return;
      }
      const existingTxType = String(state.userBetsTX?.[userId]?.betType || "").toLowerCase();
      const existingXienType = String(state.userBetsXien?.[userId]?.betType || "").toLowerCase();
      if (category === "TX") {
        if (type === "t" && isXiuSideType(existingXienType)) {
          sendError("⚠️ Đã cược XỈU CHẴN hoặc XỈU LẺ thì không được cược thêm TÀI!");
          return;
        }
        if (type === "x" && isTaiSideType(existingXienType)) {
          sendError("⚠️ Đã cược TÀI CHẴN hoặc TÀI LẺ thì không được cược thêm XỈU!");
          return;
        }
      }
      if (category === "XIÊN" && state.userBetsXien[userId] && state.userBetsXien[userId].betType !== type) {
        const existingXienType = String(state.userBetsXien[userId].betType || "").toUpperCase();
        sendError(`⚠️ 1 người trong 1 phiên chỉ được giữ 1 cửa XIÊN. Bạn đã cược ${existingXienType}, chỉ được cộng tiếp ${existingXienType}.`);
        return;
      }
      if (category === "XIÊN") {
        if (isTaiSideType(type) && existingTxType === "x") {
          sendError("⚠️ Đã cược XỈU thì không được cược thêm TÀI CHẴN hoặc TÀI LẺ!");
          return;
        }
        if (isXiuSideType(type) && existingTxType === "t") {
          sendError("⚠️ Đã cược TÀI thì không được cược thêm XỈU CHẴN hoặc XỈU LẺ!");
          return;
        }
      }
      if (category === "DICE") {
        const normalizedDiceType = String(type || "").toLowerCase();
        if (!/^d[1-6]$/.test(normalizedDiceType) && !isTelegramXXBetType(normalizedDiceType)) {
          sendError("⚠️ Cược D chỉ hợp lệ từ <b>D1</b> đến <b>D6</b>. Không chấp nhận D7, D11...");
          return;
        }
      }
      if (category === "MM") {
        const mmNum = parseInt(String(type || "").toLowerCase().replace("mm", ""), 10);
        if (isNaN(mmNum) || mmNum < 1 || mmNum > 9) {
          sendError("⚠️ MM chỉ nhận số từ 1-9. VD: <code>MM 5 20000</code>");
          return;
        }
        const existingMMBet = (state.userBetsMM?.[userId] || []).find(
          (b) => String(b.betType || "").toLowerCase() !== String(type || "").toLowerCase()
        );
        if (existingMMBet) {
          const existingMMNum = parseInt(String(existingMMBet.betType || "").toLowerCase().replace("mm", ""), 10);
          sendError(`⚠️ MM chỉ được cược 1 số trong 1 phiên. Bạn đã cược số ${existingMMNum}.`);
          return;
        }
      }

      checkAndResetUserBets(user);
      if (user.sd !== undefined) user.sd -= betValue;
      if (user.money !== undefined) user.money -= betValue;
      
      user.cuoc = (user.cuoc || 0) + betValue;
      user.cuocHomNay = (user.cuocHomNay || 0) + betValue;
      user.cuocTuanNay = (user.cuocTuanNay || 0) + betValue;
      const vipPointGained = applyVipPointFromBet(user, betValue);
      if (user.vongCuoc && user.vongCuoc > 0) user.vongCuoc = Math.max(0, user.vongCuoc - betValue);

      let isAccumulated = false;
      let currentTotalBet = 0;

      if (category === "TX") {
        if (state.userBetsTX[userId]) isAccumulated = true;
        if (!state.userBetsTX[userId]) state.userBetsTX[userId] = { betType: type, amount: 0 };
        state.userBetsTX[userId].amount += betValue;
        currentTotalBet = state.userBetsTX[userId].amount;
        if (type === "t") state.totalBetT += betValue;
        else state.totalBetX += betValue;
      } else if (category === "CL") {
        if (state.userBetsCL[userId]) isAccumulated = true;
        if (!state.userBetsCL[userId]) state.userBetsCL[userId] = { betType: type, amount: 0 };
        state.userBetsCL[userId].amount += betValue;
        currentTotalBet = state.userBetsCL[userId].amount;
        if (type === "c") state.totalBetC += betValue;
        else state.totalBetL += betValue;
      } else if (category === "MM") {
        if (!state.userBetsMM) state.userBetsMM = {};
        if (!state.userBetsMM[userId]) state.userBetsMM[userId] = [];
        const existing = state.userBetsMM[userId].find((b) => String(b.betType || "").toLowerCase() === String(type || "").toLowerCase());
        if (existing) {
          isAccumulated = true;
          existing.amount += betValue;
          currentTotalBet = existing.amount;
        } else {
          state.userBetsMM[userId].push({ betType: type, amount: betValue });
          currentTotalBet = betValue;
        }
        state.totalBetMM += betValue;
      } else if (category === "DICE") {
        if (!state.userBetsDice) state.userBetsDice = {};
        if (!state.userBetsDice[userId]) state.userBetsDice[userId] = [];
        const existing = state.userBetsDice[userId].find((b) => b.betType === type);
        if (existing) {
          isAccumulated = true;
          existing.amount += betValue;
          currentTotalBet = existing.amount;
        } else {
          state.userBetsDice[userId].push({ betType: type, amount: betValue });
          currentTotalBet = betValue;
        }
      } else if (category === "SUM") {
        if (!state.userBetsSum) state.userBetsSum = {};
        if (!state.userBetsSum[userId]) state.userBetsSum[userId] = [];
        const existing = state.userBetsSum[userId].find((b) => b.betType === type);
        if (existing) {
          isAccumulated = true;
          existing.amount += betValue;
          currentTotalBet = existing.amount;
        } else {
          state.userBetsSum[userId].push({ betType: type, amount: betValue });
          currentTotalBet = betValue;
        }
      } else {
        if (state.userBetsXien[userId]) isAccumulated = true;
        if (!state.userBetsXien[userId]) state.userBetsXien[userId] = { betType: type, amount: 0 };
        state.userBetsXien[userId].amount += betValue;
        currentTotalBet = state.userBetsXien[userId].amount;
        if (type === "tc") state.totalBetTC += betValue;
        else if (type === "tl") state.totalBetTL += betValue;
        else if (type === "xc") state.totalBetXC += betValue;
        else if (type === "xl") state.totalBetXL += betValue;
      }

      state.betsLog.push({ userId, username, category, betType: type, amount: betValue });
      writeJson(userJsonFile, users);

      let typeLabel = type === "t" ? "TÀI"
        : type === "x" ? "XỈU"
        : type === "c" ? "CHẮN"
        : type === "l" ? "LẺ"
        : String(type || "").toLowerCase().startsWith("mm") ? `MM ${parseInt(String(type || "").toLowerCase().replace("mm", ""), 10)}`
        : isTelegramXXBetType(type) ? getTelegramXXLabel(type)
        : type.toUpperCase();

      let betSuffix = "";
      if (currentTotalBet >= 5000000) {
        betSuffix = " (Cân Cửa)";
      } else if (isAccumulated) {
        betSuffix = " (Cược Dồn)";
      }
      typeLabel += betSuffix;
      const finalBalance = user.sd !== undefined ? user.sd : (user.money || 0);
      const vipInfo = getVipTierInfo(user);
      const badgePrefix = getVipRoomBadgePrefix(user);
      const anonymousBadge = vipInfo.level > 0 ? vipInfo.badge : "👤";
      const anonymousLabel = vipInfo.level > 0 ? `VIP${vipInfo.level} Ẩn Danh` : "Ẩn Danh";
      const shortBetCode =
        type === "t" ? "T"
          : type === "x" ? "X"
          : type === "c" ? "C"
          : type === "l" ? "L"
          : String(type || "").toLowerCase().startsWith("mm")
            ? `MM ${parseInt(String(type || "").toLowerCase().replace("mm", ""), 10)}`
            : type.toUpperCase();
      const betAmountText = betValue.toLocaleString("vi-VN");
      const publicBetSummary = `🥉 Đặt thành công phiên XX #${state.phien}\n${shortBetCode} ${betAmountText}`;
      const privateAnonymousSummary = `🕵️ <b>${anonymousLabel}</b> cược thành công <b>${typeLabel}</b> • <b>${betValue.toLocaleString("vi-VN")} xu</b> • phiên <b>#${state.phien}</b>`;
      const mainBotRoomSummary =
        `${anonymousBadge} Đặt thành công phiên XX #${state.phien}\n` +
        `${shortBetCode} - ${betAmountText} {Ẩn Danh}`;
      const privateBetReceipt =
        `🥉 Đặt thành công phiên XX #${state.phien}\n` +
        `${shortBetCode} ${betAmountText}\n` +
        `SD hiện tại: ${finalBalance.toLocaleString("vi-VN")} xu`;

      if (isAnonymous) {
        bot1.sendMessage(userId, privateAnonymousSummary, { parse_mode: "HTML" }).catch(() => {});
        bot1.sendMessage(userId, privateBetReceipt, { parse_mode: "HTML" }).catch(() => {});
        sendMessageToRoom(publicBetSummary, { parse_mode: "HTML" });
      } else if (isGroup && msgId) {
        // Chỉ reply duy nhất 1 lần bằng bot1 (đã được lọc ở groupMessageProcessor)
        bot1.sendMessage(chatId, publicBetSummary, { parse_mode: "HTML", reply_to_message_id: msgId }).catch(() => {});
        bot1.sendMessage(userId, privateBetReceipt, { parse_mode: "HTML" }).catch(() => {});
      } else if (msgId) {
        bot1.sendMessage(chatId, publicBetSummary, { parse_mode: "HTML", reply_to_message_id: msgId }).catch(() => {});
        sendMessageToRoom(mainBotRoomSummary, { parse_mode: "HTML" });
      } else {
        sendMessageToRoom(publicBetSummary, { parse_mode: "HTML" });
        sendMessageToRoom(mainBotRoomSummary, { parse_mode: "HTML" });
      }
    } catch {}
  };

  const processedGroupMessages = new Set<string>();
  const groupMessageProcessor = (bot: TelegramBot, msg: TelegramBot.Message) => {
    if (!msg.text) return;
    const chat = msg.chat.id;
    if (String(chat) !== String(groupt)) return;

    const msgKey = `${chat}_${msg.message_id}`;
    if (processedGroupMessages.has(msgKey)) return;
    processedGroupMessages.add(msgKey);

    let text = msg.text.trim();

    // Quick bet logic: convert "t all", "x max", etc.
    const quickBetRegex = /^(t|tai|x|xiu|c|chan|l|le|tc|tl|xc|xl|tt|xx|cc|ll)\s+(all|max)$/i;
    const quickBetMatch = text.match(quickBetRegex);
    if (quickBetMatch) {
      const type = quickBetMatch[1].toLowerCase();
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === String(msg.from?.id));
      if (user) {
        const balance = getUserBalance(user);
        if (balance > 0) {
          text = `${type} ${balance}`;
        }
      }
    }

    // Link detection logic
    const urlRegex = /(https?:\/\/[^\s]+|t\.me\/[^\s]+|www\.[^\s]+)/gi;
    if (urlRegex.test(text)) {
      bot.deleteMessage(chat, msg.message_id).catch(() => {});
      const userId = String(msg.from?.id || "");
      const username = msg.from?.first_name || "Người chơi";
      if (userId) {
        const users = readJson(userJsonFile);
        const uIdx = users.findIndex((u: any) => String(u.id) === userId);
        if (uIdx !== -1) {
          const user = users[uIdx];
          user.linkViolationCount = (user.linkViolationCount || 0) + 1;
          writeJson(userJsonFile, users);

          if (user.linkViolationCount >= 3) {
            // Mute user for 30 minutes
            const untilDate = Math.floor(Date.now() / 1000) + 30 * 60;
            bot.restrictChatMember(chat, msg.from!.id, {
              until_date: untilDate,
              permissions: { can_send_messages: false }
            } as any).catch(() => {});
            
            sendResilientReply(chat, `🚫 <b>THÔNG BÁO VI PHẠM</b>\nNgười chơi <b>${username}</b> (ID: <code>${userId}</code>) đã gửi link vi phạm quá 3 lần.\n⚠️ <b>Hình phạt:</b> Khóa mõm (Mute) 30 phút.`, { parse_mode: "HTML" });
            user.linkViolationCount = 0; // Reset count after punishment
            writeJson(userJsonFile, users);
          } else {
            sendResilientReply(chat, `⚠️ <b>CẢNH BÁO</b>\nNgười chơi <b>${username}</b> không được gửi link trong room!\nLần vi phạm: <b>${user.linkViolationCount}/3</b> (Quá 3 lần sẽ bị Mute 30p).`, { parse_mode: "HTML" });
          }
        }
      }
      return;
    }

    const words = text.toLowerCase().split(/\s+/);
    const firstWord = words[0];
    const isAnonymous = ["tt", "xx", "cc", "ll"].includes(firstWord);

    if (isAnonymous) bot.deleteMessage(chat, msg.message_id).catch(() => {});

    const parsed = parseBetText(text);
    if (parsed && (isTelegramXXBetType(parsed.type) || parsed.type === "td")) {
      if (parsed.type === "td") {
        // Nếu trong group thì nhắc nhở, nếu trong chat riêng thì để bot1.on("message") xử lý
        if (String(chat) === String(groupt)) {
          sendResilientReply(chat, `⚠️ Lệnh <code>TD</code> (Trên Dưới) chỉ dùng trong chat riêng với bot chính.`, { parse_mode: "HTML" });
        }
      } else {
        sendResilientReply(chat, `⚠️ Các lệnh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> chỉ dùng trong chat riêng với bot chính.`, { parse_mode: "HTML" });
      }
      return;
    }
    if (parsed) {
      const name = msg.from?.first_name || msg.from?.username || "Ẩn danh";
      const uid = String(msg.from?.id || "");
      // Chỉ bot1 (bot chính) thực hiện handleBet trong room để tránh trùng lặp reply
      if (uid && bot === bot1) handleBet(chat, uid, name, parsed.category, parsed.type, parsed.amountStr, msg.message_id, true, isAnonymous);
    }
  };

  bots.forEach((b) => b.on("message", (msg) => {
    const text = msg.text?.trim();
    if (!text) return;

    // Chỉ xử lý tin nhắn trong room nếu là lệnh /sd hoặc lệnh cược hợp lệ
    const isRoom = String(msg.chat.id) === String(groupt);
    const isSdCommand = /^\/s[du](?:\s+|$)/i.test(text);
    const isBetCommand = !!parseBetText(text);

    const isDayCommand = /^\/daythang(?:@\w+)?$/i.test(text) || /^\/daythua(?:@\w+)?$/i.test(text);
    const isNhanThuongCommand = text.startsWith('/nhanthuong');
    const isLamCaiCommand = text.startsWith('/lamcai');

    // Nếu ở trong room, chỉ cho phép /sd, lệnh cược, /daythang/thua, /nhanthuong và /lamcai
    if (isRoom) {
      if (!isSdCommand && !isBetCommand && !isDayCommand && !isNhanThuongCommand && !isLamCaiCommand) return;
    }

    if (isDayCommand) {
      if (String(msg.chat.id) !== String(groupt) || b !== bot1) return;
      
      // Tự động xóa lệnh /daythang, /daythua của người chơi
      b.deleteMessage(msg.chat.id, msg.message_id).catch(() => {});

      try {
        const users = readJson(userJsonFile);
        const requesterId = msg.from?.id ? String(msg.from.id) : "";
        const response = /^\/daythang(?:@\w+)?$/i.test(text)
          ? formatDailyStreakTopRoomMessage(users, "win", requesterId)
          : formatDailyStreakTopRoomMessage(users, "loss", requesterId);
        b.sendMessage(msg.chat.id, response, { parse_mode: "HTML" });
      } catch {
        b.sendMessage(msg.chat.id, "Không đọc được bảng xếp hạng hôm nay.", { parse_mode: "HTML" });
      }
      return;
    }

    if (text.startsWith('/nhanthuong')) {
      if (String(msg.chat.id) !== String(groupt) || b !== bot1) return; // Chỉ bot1 xử lý trong nhóm game

      const userId = String(msg.from?.id || "");
      const userName = msg.from?.first_name || msg.from?.username || "Người chơi";

      // Xóa tin nhắn lệnh /nhanthuong của người dùng
      b.deleteMessage(msg.chat.id, msg.message_id).catch(() => {});

      if (!userId) return;

      const users = readJson(userJsonFile);
      const userIdx = users.findIndex((u: any) => String(u.id) === userId);
      if (userIdx === -1) {
        b.sendMessage(msg.chat.id, `⚠️ ${userName}, bạn chưa đăng ký tài khoản! Gõ /start tại bot chính để đăng ký.`, { parse_mode: "HTML" });
        return;
      }
      const user = users[userIdx];

      const userLastTwoDigits = userId.slice(-2);
      const luckyNumber = state.luckyNumber;

      if (userLastTwoDigits !== luckyNumber) {
        b.sendMessage(msg.chat.id, `❌ ${userName}, 2 số cuối ID của bạn là <code>${userLastTwoDigits}</code> không trùng với Con số may mắn <code>${luckyNumber}</code> của phiên này.`, { parse_mode: "HTML" });
        return;
      }

      const today = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
      if (user.luckyRewardLastDate === today) {
        b.sendMessage(msg.chat.id, `⚠️ ${userName}, bạn đã nhận thưởng con số may mắn hôm nay rồi. Hãy quay lại vào ngày mai nhé!`, { parse_mode: "HTML" });
        return;
      }

      const rewardAmount = 5000;
      setUserBalance(user, getUserBalance(user) + rewardAmount);
      user.luckyRewardLastDate = today;
      writeJson(userJsonFile, users);

      b.sendMessage(msg.chat.id, `🎉 Chúc mừng <b>${userName}</b>! Bạn đã nhận được <b>${rewardAmount.toLocaleString("vi-VN")} xu</b> từ Con số may mắn của phiên này!`, { parse_mode: "HTML" });
      return;
    }

    if (text.startsWith('/sd') || text.startsWith('/sodu')) {
      if (b !== bot1) return;
      const userId = msg.from?.id ? msg.from.id.toString() : null;
      if (!userId) return;
      try {
        const users = readJson(userJsonFile);
        const user = users.find((u: any) => String(u.id) === userId);
        if (!user) {
          b.sendMessage(msg.chat.id, `⚠️ Tài khoản chưa được đăng ký! Gõ /start tại @${botUsernames[0]}!`);
          return;
        }
        const bal = user.sd !== undefined ? user.sd : (user.money || 0);
        // Reply duy nhất 1 lần tin nhắn /sd
        b.sendMessage(msg.chat.id, `💰 Số dư hiện tại: <b>${bal.toLocaleString('vi-VN')} xu</b>`, { parse_mode: 'HTML', reply_to_message_id: msg.message_id });
      } catch {}
      return;
    }



    if (text.startsWith('/')) return;
    groupMessageProcessor(b, msg);
  }));

  bot1.on("dice", (msg) => {
    if (msg.chat.type !== "private" || !msg.dice || msg.dice.emoji !== "🎲") return;
    const userId = String(msg.from?.id || "");
    const chat = msg.chat.id;

    try {
      const users = readJson(userJsonFile);
      const userIdx = users.findIndex((u: any) => String(u.id) === userId);
      if (userIdx === -1) return;
      const user = users[userIdx];

      if (!user.pendingXXBet) return;

      const { betType, amount, time } = user.pendingXXBet;
      // Expire pending bet after 2 minutes
      if (Date.now() - time > 120000) {
        delete user.pendingXXBet;
        writeJson(userJsonFile, users);
        bot1.sendMessage(chat, "⚠️ Lệnh cược XX của bạn đã hết hạn (quá 2 phút). Vui lòng cược lại.");
        return;
      }

      const diceValue = msg.dice.value;
      const isWin = isTelegramXXWin(betType, diceValue);
      let netAmount = -amount;
      let payout = 0;

      let message = `🎲 <b>XÚC XẮC TELEGRAM</b> 🎲\n`;
      message += `Cược: <b>${getTelegramXXLabel(betType)}</b> | Tiền: <b>${amount.toLocaleString("vi-VN")} xu</b>\n`;
      message += `Kết quả xúc xắc: <b>${diceValue}</b>\n`;

      if (isWin) {
        payout = Math.floor(amount * TELEGRAM_XX_PAYOUT_RATE);
        setUserBalance(user, getUserBalance(user) + payout);
        user.thang = (user.thang || 0) + payout;
        netAmount = payout - amount;
        message += `🎉 <b>CHÚC MỪNG!</b> Bạn đã thắng <b>${payout.toLocaleString("vi-VN")} xu</b>!\n`;

        // Thông báo THẮNG LỚN lên room nếu cược >= 50k
        if (amount >= 50000) {
          const maskedId = userId.length > 5 ? `*****${userId.slice(-5)}` : userId;
          const bigWinMsg = `🎉 <b>THẮNG LỚN</b> 🎉\n` +
                            `👤 <b>Người chơi:</b> <code>${maskedId}</code>\n` +
                            `🎮 <b>Game:</b> <b>Xúc Xắc ${getTelegramXXLabel(betType)}</b>\n` +
                            `💵 <b>Tiền cược:</b> <b>${amount.toLocaleString("vi-VN")}</b>\n` +
                            `💰 <b>Tiền nhận:</b> <b>${payout.toLocaleString("vi-VN")}</b>`;
          bot1.sendMessage(groupt, bigWinMsg, { parse_mode: "HTML" }).catch(() => {});
        }
      } else {
        user.thua = (user.thua || 0) + amount;
        message += `💔 <b>RẤT TIẾC!</b> Bạn đã thua <b>${amount.toLocaleString("vi-VN")} xu</b>.\n`;
      }

      message += `Số dư hiện tại: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>`;

      updateUserStreakAfterRound(user, state.phien, netAmount, amount);
      if (!user.betHistory) user.betHistory = [];
      user.betHistory.push({
        phien: state.phien,
        time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        game: "TELEGRAM_XX_DIRECT",
        betType: getTelegramXXLabel(betType),
        amount: amount,
        diceResult: diceValue,
        isWin: isWin,
        payout: isWin ? payout : 0,
        net: netAmount,
        balanceAfter: getUserBalance(user),
      });
      if (user.betHistory.length > 20) user.betHistory.shift();

      delete user.pendingXXBet;
      writeJson(userJsonFile, users);
      bot1.sendMessage(chat, message, { 
        parse_mode: "HTML",
        reply_markup: getMainMenuReplyMarkup()
      });

    } catch (e) {
      console.error("XX Dice error:", e);
    }
  });

  // ===== LÔ ĐỀ TELEGRAM (chat riêng) =====
  bot1.onText(/^\/lo\s+(\d{2})\s+(\d+\s*(?:d|đ))$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    if (!match) return;
    const so = normalize2d(match[1]);
    const points = parseLoDePointsToken(match[2]);
    if (!so || !points) {
      bot1.sendMessage(chat, `⚠️ Cú pháp đúng: <code>/lo 00 10d</code>`, { parse_mode: "HTML" }).catch(() => {});
      return;
    }
    placeLoDeBetForUser(chat, "LO", [so], points).catch(() => {});
  });

  bot1.onText(/^\/de\s+(\d{2})\s+(\d+\s*(?:d|đ))$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    if (!match) return;
    const so = normalize2d(match[1]);
    const points = parseLoDePointsToken(match[2]);
    if (!so || !points) {
      bot1.sendMessage(chat, `⚠️ Cú pháp đúng: <code>/de 00 10d</code>`, { parse_mode: "HTML" }).catch(() => {});
      return;
    }
    placeLoDeBetForUser(chat, "DE", [so], points).catch(() => {});
  });

  bot1.onText(/^\/xienhai\s+([\d,\s]+)\s+(\d+\s*(?:d|đ))$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    if (!match) return;
    const nums = String(match[1] || "").split(",").map(s => s.trim()).filter(Boolean);
    const points = parseLoDePointsToken(match[2]);
    if (!points || nums.length !== 2 || nums.some(n => !normalize2d(n)) || new Set(nums.map(n => normalize2d(n)!)).size !== 2) {
      bot1.sendMessage(chat, `⚠️ Cú pháp đúng: <code>/xienhai 00,01 10d</code>`, { parse_mode: "HTML" }).catch(() => {});
      return;
    }
    placeLoDeBetForUser(chat, "XIEN2", nums.map(n => normalize2d(n)!), points).catch(() => {});
  });

  bot1.onText(/^\/xienba\s+([\d,\s]+)\s+(\d+\s*(?:d|đ))$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    if (!match) return;
    const nums = String(match[1] || "").split(",").map(s => s.trim()).filter(Boolean);
    const points = parseLoDePointsToken(match[2]);
    if (!points || nums.length !== 3 || nums.some(n => !normalize2d(n)) || new Set(nums.map(n => normalize2d(n)!)).size !== 3) {
      bot1.sendMessage(chat, `⚠️ Cú pháp đúng: <code>/xienba 00,01,02 10d</code>`, { parse_mode: "HTML" }).catch(() => {});
      return;
    }
    placeLoDeBetForUser(chat, "XIEN3", nums.map(n => normalize2d(n)!), points).catch(() => {});
  });

  bot1.onText(/^\/xienbon\s+([\d,\s]+)\s+(\d+\s*(?:d|đ))$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    if (!match) return;
    const nums = String(match[1] || "").split(",").map(s => s.trim()).filter(Boolean);
    const points = parseLoDePointsToken(match[2]);
    if (!points || nums.length !== 4 || nums.some(n => !normalize2d(n)) || new Set(nums.map(n => normalize2d(n)!)).size !== 4) {
      bot1.sendMessage(chat, `⚠️ Cú pháp đúng: <code>/xienbon 00,01,02,03 10d</code>`, { parse_mode: "HTML" }).catch(() => {});
      return;
    }
    placeLoDeBetForUser(chat, "XIEN4", nums.map(n => normalize2d(n)!), points).catch(() => {});
  });

  bot1.onText(/^\/kqmb$/i, async (msg) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    const dateKey = getTodayLoDeDateKey();
    const cache = readJson(xsmbResultsJsonFile, "{}");
    let result: XsmbResult | null = cache?.[dateKey] || null;
    if (!result) {
      result = await fetchXsmbResultFromXosoComVn(dateKey);
      if (result) {
        cache[dateKey] = result;
        writeJson(xsmbResultsJsonFile, cache);
      }
    }
    if (!result) {
      bot1.sendMessage(chat, `⚠️ Chưa lấy được KQ XSMB hôm nay. Vui lòng thử lại sau.`, { parse_mode: "HTML" }).catch(() => {});
      return;
    }
    const db2d = String(result.db || "").slice(-2).padStart(2, "0");
    bot1.sendMessage(chat, `🎫 <b>KQ XSMB (${dateKey})</b>\nĐặc biệt: <b>${result.db}</b>\nĐề (2 số ĐB): <b>${db2d}</b>`, { parse_mode: "HTML" }).catch(() => {});
  });

  onAdminCommand(/^\/chotmb(?:\s+(\d{4}-\d{2}-\d{2}))?$/i, async (bot, msg, match) => {
    const dateKey = String(match?.[1] || getTodayLoDeDateKey()).trim();
    await settleLoDeForDate(dateKey);
    bot.sendMessage(msg.chat.id, `✅ Đã chạy chốt Lô Đề ngày <b>${dateKey}</b> (nếu có lệnh và có KQ).`, { parse_mode: "HTML" }).catch(() => {});
  });

  bot1.on("message", async (msg) => {
    if (msg.chat.type !== "private" || !msg.text) return;
    const txt = msg.text.trim();
    const chat = msg.chat.id;

    if (txt === "🎲 GAME SOLO XÚC XẮC" || txt === "🎲 Game Solo") {
      bot1.sendMessage(chat, formatSoloLobbyMessage(), { parse_mode: "HTML" });
      return;
    }

    if (txt === "🎲 XÚC XẮC TELEGRAM" || txt === "🎲 GAME XÚC XẮC TELEGRAM") {
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === String(chat));
      if (user) {
        user.activeBetGame = "TELEGRAM_XX";
        writeJson(userJsonFile, users);
      }
      bot1.sendMessage(chat, `✅ Bạn đã chọn game <b>XÚC XẮC TELEGRAM</b>.\nTừ giờ 4 lệnh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> sẽ tự động tung xúc xắc khi bạn nhập lệnh và số tiền cược.\n\n${formatTelegramXXGuideMessage()}`, { parse_mode: "HTML" });
      return;
    }

    if (txt === "🍀LÔ ĐỀ TELEGRAM🍀" || txt === "🍀 LÔ ĐỀ TELEGRAM 🍀" || txt === "🍀 LÔ ĐỀ TELEGRAM🍀" || txt === "LÔ ĐỀ" || txt === "Lô Đề") {
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === String(chat));
      if (user) {
        user.activeBetGame = "LODE_TELEGRAM";
        writeJson(userJsonFile, users);
      }
      bot1.sendMessage(chat, `✅ Bạn đã chọn game <b>LÔ ĐỀ TELEGRAM</b>.\n\n${formatLoDeTelegramGuideMessage()}`, { parse_mode: "HTML" });
      return;
    }

    if (txt === "📚 Danh Sách Game" || txt === "🎲 Đặt Cược Phòng") {
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === String(chat));
      if (user) {
        user.activeBetGame = "ROOM_DEFAULT";
        writeJson(userJsonFile, users);
      }
      const guideText = formatGameCatalogMessage();
      const options = {
        parse_mode: "HTML" as const,
        disable_web_page_preview: true,
        reply_markup: getGameCatalogReplyMarkup()
      };

      bot1.sendPhoto(chat, gameCatalogImagePath, {
        caption: guideText,
        parse_mode: "HTML",
        reply_markup: getGameCatalogReplyMarkup(),
      }).catch(() => {
        bot1.sendMessage(chat, guideText, options).catch(() => null);
      });
      return;

      bot1.sendMessage(chat, guideText, options).catch(() => null);
      return;
    }

    if (txt === "🎖 Đua Tôp" || txt === "🥇 Bảng Phong Thần") {
      bot1.sendMessage(
        chat,
        `🎖 <b>ĐUA TÔP HÔM NAY</b>\nChọn bảng xếp hạng bên dưới:`,
        { parse_mode: "HTML", reply_markup: getDuaTopReplyMarkup() }
      );
      return;
    }

    if (txt === "🔥 Nổ Hũ Rồng") {
      let pot = 10000;
      try { pot = readJson("hu.json").pot || 10000; } catch {}
      bot1.sendMessage(chat, `🔥 <b>HŨ RỒNG HOÀNG KIM:</b> <b>${pot.toLocaleString("vi-VN")} xu</b>\n\nNổ hũ khi ba mặt xúc xắc trùng 1-1-1 hoặc 6-6-6!\n💬 <a href="${gameRoomLink}">Bấm nhanh vào phòng cược</a>`, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        // reply_markup: { inline_keyboard: [[{ text: "💬 Vào phòng cược ngay", url: gameRoomLink }]] }
      });
      return;
    }

    if (txt === "🏮 Đại Lý Hoa Hồng" || txt === "🏮 Hoa Hồng") {
      const users = readJson(userJsonFile);
      const u = users.find((p: any) => String(p.id) === String(chat));
      if (u) {
        const referralLink = buildReferralDeepLink(String(u.id));
        const myRefs = users.filter((p: any) => String(p.referrerId) === String(u.id));
        const totalRefs = myRefs.length;
        const totalDepositedRefs = myRefs.filter((p: any) => (p.nap || 0) > 0).length;

        bot1.sendMessage(chat, `🏮 <b>HOA HỒNG NHÓM ĐẠI LÝ:</b>\n` +
          `💰 Hoa hồng tích lũy: <b>${(u.hh || 0).toLocaleString("vi-VN")} xu</b>\n` +
          `👥 Ref đã tuyển: <b>${totalRefs.toLocaleString("vi-VN")}</b>\n` +
          `📥 Ref đã nạp: <b>${totalDepositedRefs.toLocaleString("vi-VN")}</b>\n\n` +
          `🎁 <b>Hoa hồng giới thiệu 1%:</b>\n` +
          `Mời bạn bè đăng ký qua link giới thiệu bên dưới. Khi người được giới thiệu cược thua, bạn sẽ được hưởng <b>1%</b> giá trị cược thua vào ví hoa hồng.\n\n` +
          `🔗 <b>Link giới thiệu của bạn:</b>\n<code>${referralLink}</code>`, {
          parse_mode: "HTML",
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [
              [{ text: "🔗 Mở Link Giới Thiệu", url: referralLink }],
              [{ text: "🎒 Nhận Hoa Hồng Ví", callback_data: "claim_hh" }]
            ]
          }
        });
      }
      return;
    }

    if (txt === "🆘 Hỗ Trợ" || txt === "🆘 Hỗ trợ" || txt === "Hỗ Trợ") {
      const adminLink = "https://t.me/hihiiibo";
      const msgSupport = `🆘 <b>HỖ TRỢ KHÁCH HÀNG</b>\n\n` +
        `Chào bạn, nếu bạn gặp vấn đề cần hỗ trợ, vui lòng gửi nội dung hỗ trợ cho Admin qua link bên dưới:\n` +
        `👤 <b>Admin:</b> ${adminLink}\n\n` +
        `<i>Vui lòng mô tả rõ vấn đề để được xử lý nhanh nhất!</i>`;
      bot1.sendMessage(chat, msgSupport, { parse_mode: "HTML" });
      return;
    }

    if (txt === "🎪 EVENT" || txt === "🎪 Event") {
      const users = readJson(userJsonFile);
      const user = users.find((p: any) => String(p.id) === String(chat));
      if (!user) {
        bot1.sendMessage(chat, `❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.`);
        return;
      }

      const todayKey = getVNDateKey();
      const yesterdayKey = getVNDateKey(moment().tz("Asia/Ho_Chi_Minh").subtract(1, "day"));
      const lastKey = String((user as any)?.eventCheckinLastDate || "");
      const rawStreak = Number((user as any)?.eventCheckinStreak || 0);
      const effectiveStreak = lastKey === todayKey || lastKey === yesterdayKey ? rawStreak : 0;
      const depositToday = getUserSuccessfulDepositTotalOnDate(user, todayKey);

      const displayName = `${msg.from?.first_name || ""} ${msg.from?.last_name || ""}`.trim() || (msg.from?.username ? `@${msg.from.username}` : "Người chơi");
      const text =
        `🖼 <b>EVENT TREO ẢNH / ĐIỂM DANH Dragon.Room</b>\n\n` +
        `✅ Đổi tên Telegram có chứa <b>${EVENT_KEYWORD}</b>\n` +
        `✅ Mỗi ngày điểm danh 1 lần\n` +
        `✅ Mỗi ngày phải nạp tối thiểu <b>${EVENT_DAILY_MIN_DEPOSIT.toLocaleString("vi-VN")}đ</b> mới được điểm danh\n` +
        `✅ Đủ <b>${EVENT_STREAK_TARGET_DAYS} ngày</b> liên tục và có nạp trong <b>${EVENT_STREAK_TARGET_DAYS} ngày</b> gần nhất\n\n` +
        `🎁 Thưởng: <b>Giftcode ${EVENT_REWARD_GIFTCODE_VALUE.toLocaleString("vi-VN")}</b>\n` +
        `👉 Sau khi đổi tên xong, bấm <b>✅ Điểm danh</b> để ghi nhận.\n\n` +
        `👤 Tên Telegram: <b>${displayName}</b>\n` +
        `📥 Nạp hôm nay: <b>${depositToday.toLocaleString("vi-VN")}đ</b>\n` +
        `🔥 Tiến độ: <b>${effectiveStreak}/${EVENT_STREAK_TARGET_DAYS}</b> ngày`;

      bot1.sendMessage(chat, text, {
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: [[{ text: "✅ Điểm danh", callback_data: "event_checkin" }]] }
      });
      return;
    }

    if (txt === "👤 Ví Cá Nhân") {
      const users = readJson(userJsonFile);
      const u = users.find((p: any) => String(p.id) === String(chat));
      if (u) {
        const bal = u.sd !== undefined ? u.sd : (u.money || 0);
        const activeStreak = getUserActiveStreakCounts(u);
        const vipInfo = getVipTierInfo(u);
        const todayLabel = moment().tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
        const stats =
          `🆔 ID: ${u.id}\n` +
          `💰 Số dư: ${(Math.floor(bal) || 0).toLocaleString("vi-VN")}\n` +
          `👑 Cấp VIP: VIP ${vipInfo.level} ${vipInfo.badge} (${vipInfo.name})\n\n` +
          `📈 THỐNG KÊ\n` +
          `• Cược hôm nay: ${(u.cuocHomNay || 0).toLocaleString("vi-VN")}\n` +
          `• Cược tuần này: ${(u.cuocTuanNay || 0).toLocaleString("vi-VN")}\n` +
          `• Tổng cược: ${(u.cuoc || 0).toLocaleString("vi-VN")}\n` +
          `• Tổng nạp: ${(u.nap || 0).toLocaleString("vi-VN")}\n` +
          `• Tổng rút: ${(u.rut || 0).toLocaleString("vi-VN")}\n\n` +
          `🗓️ ${todayLabel}\n` +
          `• Chuỗi thắng: ${(activeStreak.win || 0).toLocaleString("vi-VN")}\n` +
          `• Chuỗi thua: ${(activeStreak.loss || 0).toLocaleString("vi-VN")}`;
        bot1.sendMessage(chat, stats, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "📥 Nạp Xu", callback_data: "deposit" }, { text: "📤 Rút Bank", callback_data: "withdraw" }],
              [{ text: "👑 Víp", callback_data: "vip_info" }],
              [{ text: "Chuyển Tiền", callback_data: "transfer_guide" }, { text: "🔑 Nhập Giftcode", callback_data: "redeem_gift" }],
              [{ text: "🎟️ Mua Giftcode", callback_data: "buy_giftcode" }],
              [{ text: "📜 LS Cược", callback_data: "history_bet" }, { text: "📜 LS Nạp", callback_data: "history_dep" }, { text: "📜 LS Rút", callback_data: "history_wit" }]
            ]
          }
        });
      }
      return;
    }

    const parsed = parseBetText(txt);
    if (parsed) {
      if (parsed.type === "td") {
        const amount = parseInt(parsed.amountStr, 10);
        if (isNaN(amount) || amount < 1000) {
          bot1.sendMessage(chat, `⚠️ Cược <b>Trên Dưới</b> tối thiểu từ <b>1.000 xu</b>!`, { parse_mode: "HTML" });
          return;
        }
        await handleTDCommand(String(chat), amount, chat);
      } else if (isTelegramXXBetType(parsed.type)) {
        const userId = String(chat);
        const username = msg.from?.first_name || "Ẩn danh";
        const amount = parseInt(parsed.amountStr, 10);
        if (isNaN(amount)) {
          bot1.sendMessage(chat, `⚠️ Số tiền cược không hợp lệ. Vui lòng nhập số tiền.`, { parse_mode: "HTML" });
          return;
        }
        // Direct execution for Telegram XX commands in private chat
        const result = await handleTelegramXXDirectRoll(userId, username, parsed.type, amount, chat);
        sendResilientReply(chat, result.message, { 
          parse_mode: "HTML",
          reply_markup: (result as any).reply_markup 
        });
      } else {
        handleBet(chat, String(chat), msg.from?.first_name || "Ẩn danh", parsed.category, parsed.type, parsed.amountStr, msg.message_id);
      }
    }
  });



  bot1.onText(/^solo\s+(\d+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "⚠️ Tạo phòng SOLO chỉ dùng trong chat riêng với bot chính.");
      return;
    }

    const amount = parseInt(match[1], 10);
    if (isNaN(amount) || amount < SOLO_MIN_BET) {
      bot1.sendMessage(chat, `❌ Số tiền SOLO tối thiểu là <b>${SOLO_MIN_BET.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
      return;
    }

    try {
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === userId);
      if (!user) {
        bot1.sendMessage(chat, `❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.`);
        return;
      }

      const soloRooms = readSoloRooms();
      const hasOpenRoom = soloRooms.some((room) =>
        ["OPEN", "ROLLING"].includes(room.status) &&
        (String(room.ownerId) === userId || String(room.challengerId || "") === userId)
      );
      if (hasOpenRoom) {
        bot1.sendMessage(chat, `❌ Bạn đang có phòng SOLO đang chờ hoặc đang giữ kèo. Hãy vào/hủy/xử lý xong phòng cũ trước.`);
        return;
      }

      const balance = getUserBalance(user);
      if (balance < amount) {
        bot1.sendMessage(chat, `❌ Số dư không đủ tạo phòng SOLO. Bạn cần <b>${amount.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }

      setUserBalance(user, balance - amount);
      user.cuoc = (user.cuoc || 0) + amount;
      user.cuocHomNay = (user.cuocHomNay || 0) + amount;
      user.cuocTuanNay = (user.cuocTuanNay || 0) + amount;
      if (user.vongCuoc && user.vongCuoc > 0) user.vongCuoc = Math.max(0, user.vongCuoc - amount);

      const code = generateSoloRoomCode(new Set(soloRooms.map((room) => room.code)));
      const room: SoloRoom = {
        code,
        amount,
        ownerId: userId,
        ownerName: user.name || msg.from?.first_name || "Chủ phòng",
        ownerChatId: userId,
        challengerId: null,
        challengerName: null,
        challengerChatId: null,
        ownerRoll: null,
        challengerRoll: null,
        ownerTotal: null,
        challengerTotal: null,
        winnerId: null,
        loserId: null,
        payout: null,
        status: "OPEN",
        createdAt: Date.now(),
        joinedAt: null,
        settledAt: null,
        rollDeadlineAt: null,
        pinnedMessageId: null,
        resultReason: null
      };

      soloRooms.push(room);
      writeJson(userJsonFile, users);

      sendAndPinToGameRoom(
        formatSoloPinnedRoomMessage(room),
        {
          reply_markup: {
            inline_keyboard: [[{ text: "⚔️ Vào bot để nhập lệnh phòng", url: buildSoloRoomDeepLink(room.code) }]]
          }
        },
        (pinnedId) => {
          room.pinnedMessageId = pinnedId;
          writeSoloRooms(soloRooms);
        }
      );

      writeSoloRooms(soloRooms);

      const reply = `✅ <b>TẠO PHÒNG SOLO THÀNH CÔNG</b>\n` +
        `🎟 Mã phòng: <code>${code}</code>\n` +
        `💰 Mức cược: <b>${amount.toLocaleString("vi-VN")} xu</b>\n` +
        `💵 Ví còn lại: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>\n` +
        `📌 Bot đã ghim lệnh phòng trong room <a href="${gameRoomLink}">Dragon Room</a>.\n` +
        `👥 Bạn bè vào phòng bằng lệnh: <code>/solo ${code}</code>\n` +
        `⛔ Có thể hủy bằng: <code>/huy ${code}</code> sau 1 phút nếu chưa có ai vào.\n\n` +
        formatSoloLobbyMessage(soloRooms);

      bot1.sendMessage(chat, reply, { parse_mode: "HTML" });
    } catch (e) {
      console.error("solo create error:", e);
      bot1.sendMessage(chat, "❌ Có lỗi khi tạo phòng SOLO.");
    }
  });

  bot1.onText(/^\/solo$/i, (msg) => {
    const chat = msg.chat.id;
    if (isBanned(msg.from?.id || chat)) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "⚠️ Vui lòng mở chat riêng với bot chính để xem phòng SOLO.");
      return;
    }
    bot1.sendMessage(chat, formatSoloLobbyMessage(), { parse_mode: "HTML" });
  });

  bot1.onText(/^\/solo\s+([A-Z0-9]+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "⚠️ Vào phòng SOLO chỉ dùng trong chat riêng với bot chính.");
      return;
    }
    const roomCode = match[1].toUpperCase();

    try {
      handleSoloJoinByCode(roomCode, userId, chat, msg.from?.first_name || msg.from?.username || "Đối thủ");
    } catch (e) {
      console.error("solo join error:", e);
      bot1.sendMessage(chat, "❌ Có lỗi khi vào phòng SOLO.");
    }
  });

  bot1.onText(/^\/xx\s+([A-Z0-9]+)$/i, async (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "⚠️ Tung XX SOLO chỉ dùng trong chat riêng với bot chính.");
      return;
    }
    const roomCode = match[1].toUpperCase();

    try {
      const result = await handleSoloRollAction(roomCode, userId, chat);
      if (!result.ok) {
        bot1.sendMessage(chat, `❌ ${result.callbackText}`, { parse_mode: "HTML" });
      }
    } catch (e) {
      console.error("solo roll error:", e);
      bot1.sendMessage(chat, "❌ Có lỗi khi tung xúc xắc SOLO.");
    }
  });

  bot1.onText(/^\/huy\s+([A-Z0-9]+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "⚠️ Hủy phòng SOLO chỉ dùng trong chat riêng với bot chính.");
      return;
    }
    const roomCode = match[1].toUpperCase();

    try {
      const users = readJson(userJsonFile);
      const roomOwner = users.find((u: any) => String(u.id) === userId);
      if (!roomOwner) {
        bot1.sendMessage(chat, `❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.`);
        return;
      }

      const soloRooms = readSoloRooms();
      const room = soloRooms.find((item) => item.code === roomCode);
      if (!room) {
        bot1.sendMessage(chat, `❌ Không tìm thấy phòng SOLO này.`);
        return;
      }
      if (String(room.ownerId) !== userId) {
        bot1.sendMessage(chat, `❌ Chỉ chủ phòng mới được hủy phòng này.`);
        return;
      }
      if (room.status !== "OPEN" || room.challengerId) {
        bot1.sendMessage(chat, `❌ Không thể hủy phòng vì đã có người vào hoặc phòng đã kết thúc.`);
        return;
      }
      if (Date.now() - room.createdAt < 60_000) {
        bot1.sendMessage(chat, `❌ Chỉ được hủy phòng sau <b>1 phút</b> kể từ lúc tạo phòng.`, { parse_mode: "HTML" });
        return;
      }

      setUserBalance(roomOwner, getUserBalance(roomOwner) + room.amount);
      room.status = "CANCELLED";
      room.settledAt = Date.now();
      room.resultReason = "Chủ phòng chủ động hủy khi chưa có ai vào.";
      clearSoloRoomPin(room);

      writeJson(userJsonFile, users);
      writeSoloRooms(soloRooms);

      bot1.sendMessage(chat, `✅ Đã hủy phòng <code>${room.code}</code> và hoàn lại <b>${room.amount.toLocaleString("vi-VN")} xu</b> vào ví của bạn.\n\n${formatSoloLobbyMessage(soloRooms)}`, { parse_mode: "HTML" });
    } catch (e) {
      console.error("solo cancel error:", e);
      bot1.sendMessage(chat, "❌ Có lỗi khi hủy phòng SOLO.");
    }
  });

  bot1.on("callback_query", async (q) => {
    const act = q.data;
    const chat = q.message?.chat.id;
    if (!chat || !act || isBanned(chat)) return;

    try {
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === String(chat));
      if (!user) return;

      if (act.startsWith("solo_roll_")) {
        const roomCode = act.replace("solo_roll_", "").toUpperCase();
        const result = await handleSoloRollAction(roomCode, String(chat), chat);
        bot1.answerCallbackQuery(q.id, { text: result.callbackText, show_alert: !result.ok && !!result.showAlert }).catch(() => {});
        return;
      } else if (act === "game_catalog_room_default") {
        user.activeBetGame = "ROOM_DEFAULT";
        writeJson(userJsonFile, users);
        bot1.sendMessage(
          chat,
          `✅ Bạn đã chọn game <b>TÀI XỈU SĂN HŨ</b>.\nTừ giờ các lệnh cược phòng mặc định sẽ được ưu tiên.\n\n${formatRoomDefaultGuideMessage()}`,
          {
            parse_mode: "HTML",
            disable_web_page_preview: true,
            reply_markup: { inline_keyboard: [[{ text: "💬 Vào Phòng Dragon Room", url: gameRoomLink }]] }
          }
        );
        bot1.answerCallbackQuery(q.id, { text: "Đã mở Tài Xỉu Săn Hũ" }).catch(() => {});
        return;
      } else if (act === "game_catalog_solo") {
        bot1.sendMessage(
          chat,
          `✅ Bạn đã chọn <b>GAME SOLO XÚC XẮC</b>.\n\n${formatSoloLobbyMessage()}`,
          {
            parse_mode: "HTML",
            disable_web_page_preview: true
          }
        );
        bot1.answerCallbackQuery(q.id, { text: "Đã mở Game Solo Xúc Xắc" }).catch(() => {});
        return;
      } else if (act === "game_catalog_telegram") {
        user.activeBetGame = "TELEGRAM_XX";
        writeJson(userJsonFile, users);
        bot1.sendMessage(
          chat,
          `✅ Bạn đã chọn game <b>XÚC XẮC TELEGRAM</b>.\nTừ giờ 4 lệnh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> mới được mở.\n\n${formatTelegramXXGuideMessage()}`,
          { parse_mode: "HTML" }
        );
        bot1.answerCallbackQuery(q.id, { text: "Đã mở Xúc Xắc Telegram" }).catch(() => {});
        return;
      } else if (act === "game_catalog_lode") {
        user.activeBetGame = "LODE_TELEGRAM";
        writeJson(userJsonFile, users);
        bot1.sendMessage(
          chat,
          `✅ Bạn đã chọn game <b>LÔ ĐỀ TELEGRAM</b>.\n\n${formatLoDeTelegramGuideMessage()}`,
          { parse_mode: "HTML" }
        );
        bot1.answerCallbackQuery(q.id, { text: "Đã mở Lô Đề Telegram" }).catch(() => {});
        return;
      } else if (act === "game_catalog_td") {
        const guide = `⬆️ <b>XÚC XẮC TRÊN DƯỚI</b> ⬇️\n\n` +
          `1️⃣ Người chơi nhập <code>TD [số tiền]</code>. Sau khi ghi nhận bot sẽ tung 2 🎲 lượt đầu tiên, người chơi sẽ dự đoán ⬆️ (cao hơn) hoặc ⬇️ (nhỏ hơn) 2 🎲 vừa tung.\n\n` +
          `2️⃣ Bot sẽ tiếp tục tung 2 🎲 và so sánh với dự đoán đã chọn, nếu trùng khớp sẽ thắng cược.\n` +
          `❌ <b>Hòa mất 50% tiền cược.</b>\n\n` +
          `👉 Gõ <code>td 2000</code> để bắt đầu chơi ngay!`;
        bot1.sendMessage(chat, guide, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id, { text: "Đã mở Xúc Xắc Trên Dưới" }).catch(() => {});
        return;
      } else if (act.startsWith("td_")) {
        const action = act;
        await handleTDAction(String(chat), action, chat, q.message!.message_id);
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "duatop_du_day") {
        const todayStr = moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
        const latestCompletedPhien = getLatestCompletedPhien();
        const streakLb = buildDailyStreakLeaderboard(users, todayStr, latestCompletedPhien);

        let response = `🎗 <b>ĐUA TOP ĐU DÂY MỖI NGÀY</b>\n` +
          `⏰ Tự động trả thưởng lúc <b>00:00</b> mỗi ngày\n` +
          `Tính theo chuỗi thắng/thua liên tiếp:\n` +
          `Chỉ tính cược Tài/Xỉu (TX) từ <b>5k</b> trở lên\n\n` +
          `🥇 <b>Top 1:</b> 10.000\n` +
          `🥈 <b>Top 2:</b> 10.000\n` +
          `🥉 <b>Top 3:</b> 10.000\n\n` +
          `👇 Bấm nút bên dưới để xem bảng.`;

        bot1.sendMessage(chat, response, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Tốp Đu Dây Thắng Hôm Nay", callback_data: "duatop_duday_win" },
              ],
              [
                { text: "Tốp Đu Dây Thua Hôm Nay", callback_data: "duatop_duday_loss" }
              ]
            ]
          }
        });
        bot1.answerCallbackQuery(q.id, { text: "Đã mở BXH Đu Dây" }).catch(() => {});
        return;
      } else if (act === "duatop_duday_win") {
        const response = formatDailyStreakTopRoomMessage(users, "win", String(chat));
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "duatop_duday_loss") {
        const response = formatDailyStreakTopRoomMessage(users, "loss", String(chat));
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "duatop_today") {
        const todayStr = moment().tz("Asia/Ho_Chi_Minh").format("DD/MM");
        const topUsers = users
          .filter((u: any) => (u.cuocHomNay || 0) > 0)
          .sort((a: any, b: any) => (b.cuocHomNay || 0) - (a.cuocHomNay || 0));
        const response = formatBetTopMessage(topUsers, `Top 6 cược ngày hôm nay ${todayStr}`);
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "duatop_yesterday") {
        const yesterdayStr = moment().tz("Asia/Ho_Chi_Minh").subtract(1, 'days').format("DD/MM");
        const topUsers = users
          .filter((u: any) => (u.cuocHomQua || 0) > 0)
          .sort((a: any, b: any) => (b.cuocHomQua || 0) - (a.cuocHomQua || 0));
        const response = formatBetTopMessage(topUsers, `Top 6 cược ngày hôm qua ${yesterdayStr}`);
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "duatop_week") {
        const topUsers = users
          .filter((u: any) => (u.cuocTuan || 0) > 0)
          .sort((a: any, b: any) => (b.cuocTuan || 0) - (a.cuocTuan || 0));
        const response = formatBetTopMessage(topUsers, `Top 6 cược Tuần`);
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "vip_info") {
        bot1.sendMessage(chat, formatVipGuideMessage(user), { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "transfer_guide") {
        const guide = `💸 <b>HƯỚNG DẪN CHUYỂN TIỀN</b>\n━━━━━━━━━━━━━━━━━━━━━\n` +
          `👉 Cú pháp chuyển tiền:\n` +
          `<code>/chuyentien [ID_Người_Nhận] [Số_Tiền]</code>\n\n` +
          `⚠️ <b>Lưu ý:</b>\n` +
          `1. Phí chuyển tiền: <b>5%</b>\n` +
          `2. Chỉ dành cho tài khoản đã nạp đủ <b>20.000 xu</b>.\n` +
          `3. Số tiền chuyển tối thiểu: <b>1.000 xu</b>.`;
        bot1.sendMessage(chat, guide, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "check_rookie") {
        const mapTotal = user.nap || 0;
        if (mapTotal >= 20000) {
          bot1.sendMessage(chat, `🎉 <b>CHÚC MỪNG HOÀN THÀNH TÂN THỦ!</b>\n━━━━━━━━━━━━━━━━━━━━━\n✅ Bạn đã nạp tích lũy: <b>${mapTotal.toLocaleString("vi-VN")} xu</b> (Đạt mốc tối thiểu 20.000 xu).\n🛡️ <b>Trạng thái:</b> Tài khoản của bạn đã được <b>Mở khóa Tân Thủ</b> thành công!\n\n💡 Giờ đây bạn có thể thoải mái giao dịch và tích lũy số dư mà không lo bị reset khi nạp tiền.`, { parse_mode: "HTML" });
        } else {
          bot1.sendMessage(chat, `🔰 <b>YÊU CẦU MỞ KHÓA TÂN THỦ</b>\n━━━━━━━━━━━━━━━━━━━━━\n🔒 <b>Trạng thái:</b> Chưa mở khóa\n💵 Đã nạp: <b>${mapTotal.toLocaleString("vi-VN")} / 20.000 xu</b>\n\n⚠️ <b>Quy định quan trọng:</b>\n1. Bạn phải nạp tối thiểu tích lũy <b>20.000 xu</b> để kích hoạt mở khóa tài khoản.\n2. <b>Không nạp đủ:</b> Nếu chưa được mở khóa, mỗi lần nạp mới, toàn bộ số dư cũ từ trước đó của bạn sẽ <b>về 0 xu</b> trước khi cộng xu nạp mới.\n\n👉 <i>Hãy nạp tích lũy hoặc nạp đủ 20k xu ngay hôm nay để tránh mất số dư không mong muốn!</i>`, { parse_mode: "HTML" });
        }
        bot1.answerCallbackQuery(q.id).catch(() => {});
        return;
      } else if (act === "claim_hh") {
        const value = user.hh || 0;
        if (value <= 0) {
          bot1.answerCallbackQuery(q.id, { text: "Ví hoa hồng đang trống!", show_alert: true });
          return;
        }
        user.sd = (user.sd || 0) + value;
        if (user.money !== undefined) user.money = (user.money || 0) + value;
        user.hh = 0;
        writeJson(userJsonFile, users);
        bot1.sendMessage(chat, `✅ Đã nhận +${value.toLocaleString("vi-VN")} xu hoa hồng!`);
        bot1.answerCallbackQuery(q.id, { text: "Thao tác thành công!" });
      } else if (act === "deposit") {
        bot1.sendMessage(
          chat,
          `💳 <b>Chọn hình thức nạp tiền</b>\n\n• <b>Ngân hàng:</b> tạo giao dịch chuyển khoản tự động.\n• <b>Thẻ cào:</b> nạp Viettel / Vinaphone / Mobifone (lệnh <code>/thecao</code>).\n\n👉 <b>Bấm nút bên dưới để tiếp tục.</b>\n\n<b>Chuyển Tiền vào ví cá nhân</b>`,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "🏦 Bank", callback_data: "deposit_bank" }],
                [{ text: "🎫 Thẻ cào (bảo trì)", callback_data: "deposit_card_maintenance" }]
              ]
            }
          }
        );
      } else if (act === "deposit_bank") {
        bot1.sendMessage(
          chat,
          `💳 <b>Chọn mệnh giá nạp tiền</b>\n\nNạp tối thiểu: <b>10.000 ₫</b>\nNạp tối đa: <b>500.000.000 ₫</b>\n\nBấm vào button dưới để nạp tiền qua <b>Chuyển khoản Ngân hàng</b>\n\n➡️ <b>Cách lấy thông tin nạp:</b>\n\n🔶 Gõ lệnh: <code>/nap số tiền</code>\nVí dụ: <code>/nap 100000</code>\n\n🔶 Hoặc bấm nút số tiền bên dưới để lấy nhanh.\n\n⚠️ <b>Lưu ý:</b>\n\n✅ Chuyển đúng <b>SỐ TIỀN</b> và <b>NỘI DUNG</b> được cung cấp.\n✅ Mỗi lần nạp cần lấy thông tin <b>MỚI</b>.\n🚫 Không dùng thông tin cũ cho giao dịch sau.\n💰 Nạp tối thiểu: <b>10.000đ</b>`,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "10.000", callback_data: "deposit_quick_10000" },
                  { text: "20.000", callback_data: "deposit_quick_20000" },
                  { text: "50.000", callback_data: "deposit_quick_50000" }
                ],
                [
                  { text: "100.000", callback_data: "deposit_quick_100000" },
                  { text: "200.000", callback_data: "deposit_quick_200000" },
                  { text: "300.000", callback_data: "deposit_quick_300000" }
                ],
                [
                  { text: "500.000", callback_data: "deposit_quick_500000" },
                  { text: "1.000.000", callback_data: "deposit_quick_1000000" },
                  { text: "2.000.000", callback_data: "deposit_quick_2000000" }
                ],
                [
                  { text: "3.000.000", callback_data: "deposit_quick_3000000" }
                ]
              ]
            }
          }
        );
        bot1.answerCallbackQuery(q.id).catch(() => {});
      } else if (act.startsWith("deposit_quick_")) {
        const amount = parseInt(act.replace("deposit_quick_", ""), 10);
        const minDeposit = 10000;
        const maxDeposit = 500000000;
        if (isNaN(amount) || amount < minDeposit || amount > maxDeposit) {
          bot1.answerCallbackQuery(q.id, { text: "❌ Mệnh giá không hợp lệ.", show_alert: true }).catch(() => {});
          return;
        }

        const cooldownRemaining = getDepositOrderCooldownRemainingSeconds(user);
        if (cooldownRemaining > 0) {
          bot1.answerCallbackQuery(q.id, {
            text: `⏳ Vui lòng chờ ${cooldownRemaining} giây nữa để tạo lệnh nạp tiếp theo.`,
            show_alert: true
          }).catch(() => {});
          return;
        }

        const req = createManualDepositRequest(user, chat, amount);
        writeJson(userJsonFile, users);

        const qrImageUrl = buildDepositQrImageUrl(amount, req.content);
        bot1.sendPhoto(chat, qrImageUrl, {
          caption: formatDepositOrderCaption(amount, req.content),
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "✅ Đã Chuyển Khoản", callback_data: `deposit_sent_${req.requestId}` }]]
          }
        }).then((sentMessage) => {
          setTimeout(() => {
            bot1.deleteMessage(chat, sentMessage.message_id).catch(e => console.error("Error deleting message:", e));
          }, 10 * 60 * 1000); // 10 minutes
        }).catch(() => {
          bot1.sendMessage(chat, formatDepositOrderCaption(amount, req.content), {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[{ text: "✅ Đã Chuyển Khoản", callback_data: `deposit_sent_${req.requestId}` }]]
            }
          }).then((sentMessage) => {
            setTimeout(() => {
              bot1.deleteMessage(chat, sentMessage.message_id).catch(e => console.error("Error deleting message:", e));
            }, 10 * 60 * 1000); // 10 minutes
          }).catch(e => console.error("Error sending fallback message:", e));
        });
        bot1.answerCallbackQuery(q.id, { text: `Đã tạo lệnh nạp ${amount.toLocaleString("vi-VN")} ₫!` }).catch(() => {});
      } else if (act.startsWith("deposit_sent_")) {
        const requestId = act.replace("deposit_sent_", "");
        const depositItem = (user.depositHistory || []).find((h: any) => String(h.requestId || "") === requestId);
        if (!depositItem) {
          bot1.answerCallbackQuery(q.id, { text: "❌ Không tìm thấy lệnh nạp này.", show_alert: true }).catch(() => {});
          return;
        }
        if (depositItem.adminNotified) {
          bot1.answerCallbackQuery(q.id, { text: "⚠️ Đơn nạp này đã được gửi admin trước đó.", show_alert: true }).catch(() => {});
          return;
        }
        if (depositItem.expiresAt && moment().tz("Asia/Ho_Chi_Minh").isAfter(moment.tz(depositItem.expiresAt, "Asia/Ho_Chi_Minh"))) {
          depositItem.status = "Hết hạn";
          writeJson(userJsonFile, users);
          bot1.answerCallbackQuery(q.id, { text: "❌ Lệnh nạp đã hết hiệu lực, vui lòng tạo lệnh mới.", show_alert: true }).catch(() => {});
          return;
        }

        depositItem.status = "Chờ kiểm tra";
        depositItem.adminNotified = true;
        writeJson(userJsonFile, users);

        sendMessageToAdminGroup(`⚠️ <b>BÁO NẠP MỚI:</b>\nID: <code>${chat}</code>\nSố tiền: <b>${depositItem.amount} ₫</b>\nNội dung nạp: <code>${depositItem.transferContent}</code>\nDuyệt gõ: <code>/nap ${chat} ${String(depositItem.amount).replace(/\./g, "")}</code>`, { parse_mode: "HTML" });
        if (q.message?.message_id) {
          bot1.editMessageReplyMarkup(
            { inline_keyboard: [] },
            {
              chat_id: chat,
              message_id: q.message.message_id
            }
          ).catch(() => {});
        }
        bot1.answerCallbackQuery(q.id, { text: "✅ Đã gửi đơn nạp về nhóm admin!" }).catch(() => {});
        bot1.sendMessage(chat, `✅ Bạn đã xác nhận chuyển khoản thành công. Đơn nạp đã được gửi về admin để kiểm tra.`, { parse_mode: "HTML" });
      } else if (act === "deposit_card_maintenance") {
        bot1.answerCallbackQuery(q.id, { text: "⚠️ Thẻ cào hiện đang bảo trì, vui lòng quay lại sau.", show_alert: true }).catch(() => {});
      } else if (act === "withdraw") {
        const hasPreviousWithdrawal = user.withdrawHistory && user.withdrawHistory.some((h: any) => h.status === "Đang xử lý" || h.status === "Thành công");
        
        if (!isNoviceUnlocked(user) && hasPreviousWithdrawal) {
          bot1.answerCallbackQuery(q.id, { text: "❌ Tài khoản tân thủ chưa nạp đủ 20.000 xu chỉ được rút 1 lần duy nhất. Bạn đã thực hiện rút tiền rồi.", show_alert: true });
          return;
        }

        const withdrawIntro = `📤 <b>RÚT TIỀN THẮNG LỚN VỀ THẺ:</b>\n` +
          `⚖️ <b>Hạn mức & Phí rút:</b>\n` +
          `• Hạn mức tối thiểu (Min): 50.000 xu (với nạp > 20k)\n` +
          `• Phí giao dịch rút: 1% (khấu trừ từ số xu rút)\n\n` +
          `🏦 <b>Hệ thống hỗ trợ các ngân hàng:</b>\n` +
          `Vietcombank | Techcombank | MBBank | Vietinbank | Agribank\n\n` +
          `✍️ <b>Cú pháp rút tiền:</b>\n` +
          `Gõ lệnh /rut để kiểm tra liên kết ngân hàng.\n` +
          `Gõ lệnh /rut [số tiền] hoặc /rut all để tạo lệnh rút.`;
          
        bot1.sendMessage(chat, withdrawIntro, { parse_mode: "HTML" });
      } else if (act === "redeem_gift") {
        bot1.sendMessage(chat, "🔑 Soạn mẫu: <code>/code [Mã_quà_tặng]</code>", { parse_mode: "HTML" });
      } else if (act === "buy_giftcode") {
        if (!isNoviceUnlocked(user)) {
          bot1.answerCallbackQuery(q.id, { text: "❌ Bạn phải mở khóa tân thủ trước mới mua được code.", show_alert: true });
          return;
        }
        const bal = user.sd !== undefined ? user.sd : (user.money || 0);
        const buyIntro = `🎟️ <b>MUA GIFTCODE LỘC CHIA SẺ</b> 🎟️\n💵 Số dư ví của bạn: <b>${Math.floor(bal).toLocaleString("vi-VN")} xu</b>\n⚠️ Mua code mất <code>3%</code> phí giao dịch.\n\n👉 <b>Cú pháp mua tùy chọn:</b>\n• <code>/muacode [mệnh_giá]</code>\n• <code>/muacode [số_lượng] [mệnh_giá]</code>\n💡 <b>Ví dụ:</b> <code>/muacode 10000</code> hoặc <code>/muacode 5 10000</code>`;
        bot1.sendMessage(chat, buyIntro, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🎟️ Gói 10K xu", callback_data: "buy_quick_10000" }, { text: "🎟️ Gói 50K xu", callback_data: "buy_quick_50000" }],
              [{ text: "🎟️ Gói 100K xu", callback_data: "buy_quick_100000" }]
            ]
          }
        });
      } else if (act.startsWith("buy_quick_")) {
        if (!isNoviceUnlocked(user)) {
          bot1.answerCallbackQuery(q.id, { text: "❌ Bạn phải mở khóa tân thủ trước mới mua được code.", show_alert: true });
          return;
        }
        const price = parseInt(act.replace("buy_quick_", ""), 10);
        if (isNaN(price) || price < 1000) return;
        const cost = Math.ceil(price * 1.03); // 3% fee!
        const balance = user.sd !== undefined ? user.sd : (user.money || 0);
        if (balance < cost) {
          bot1.answerCallbackQuery(q.id, { text: `❌ Số dư không đủ! Cần ${cost.toLocaleString("vi-VN")} xu.`, show_alert: true });
          return;
        }

        user.sd = balance - cost;
        if (user.money !== undefined) user.money = user.money - cost;

        const generatedCode = generateGiftCode();
        const codeRecord = createGiftcodeData(generatedCode, price, String(chat), 1, new Date().toLocaleString("vi-VN"));

        const giftcodes = readJson(giftJsonFile);
        writeJson(giftJsonFile, [...giftcodes, codeRecord]);
        
        const userList = readJson(userJsonFile);
        const uToUpdate = userList.find((x: any) => String(x.id) === String(chat));
        if (uToUpdate) {
          uToUpdate.sd = user.sd;
          if (uToUpdate.money !== undefined) uToUpdate.money = user.money;
          writeJson(userJsonFile, userList);
        }

        bot1.answerCallbackQuery(q.id, { text: `🎉 Đã mua thành công mã ${price.toLocaleString("vi-VN")} xu!` });
        bot1.sendMessage(chat, `🎟️ <b>MUA GIFTCODE THÀNH CÔNG!</b>\n💎 Mệnh giá: <b>${price.toLocaleString("vi-VN")} xu</b>\n🔑 Mã: <code>/code ${generatedCode}</code>`, { parse_mode: "HTML" });
        sendMessageToRoom(`👥 <b>Người chơi ẩn danh</b> đã mua <b>1</b> giftcode mệnh giá <b>${price.toLocaleString("vi-VN")} xu</b>!`, { parse_mode: "HTML" });
      } else if (act === "event_checkin") {
        const todayKey = getVNDateKey();
        const yesterdayKey = getVNDateKey(moment().tz("Asia/Ho_Chi_Minh").subtract(1, "day"));

        if (!isTelegramNameQualified(q.from, EVENT_KEYWORD)) {
          const msgStr =
            `❌ Bạn chưa đủ điều kiện điểm danh.\n\n` +
            `Yêu cầu 1: Đổi tên Telegram có chứa <b>${EVENT_KEYWORD}</b>\n` +
            `👉 Đổi tên xong bấm lại <b>✅ Điểm danh</b> để ghi nhận.`;
          bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
          bot1.answerCallbackQuery(q.id, { text: "Chưa đúng tên Telegram", show_alert: true }).catch(() => {});
          return;
        }

        const depositToday = getUserSuccessfulDepositTotalOnDate(user, todayKey);
        if (depositToday < EVENT_DAILY_MIN_DEPOSIT) {
          const msgStr =
            `❌ Bạn chưa đủ điều kiện điểm danh.\n\n` +
            `Yêu cầu 2: Hôm nay phải nạp tối thiểu <b>${EVENT_DAILY_MIN_DEPOSIT.toLocaleString("vi-VN")}đ</b> mới được điểm danh.\n` +
            `📥 Nạp hôm nay của bạn: <b>${depositToday.toLocaleString("vi-VN")}đ</b>`;
          bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
          bot1.answerCallbackQuery(q.id, { text: "Chưa đủ nạp hôm nay", show_alert: true }).catch(() => {});
          return;
        }

        const lastKey = String((user as any).eventCheckinLastDate || "");
        if (lastKey === todayKey) {
          bot1.answerCallbackQuery(q.id, { text: "Bạn đã điểm danh hôm nay rồi!", show_alert: true }).catch(() => {});
          return;
        }

        let streak = Number((user as any).eventCheckinStreak || 0);
        streak = lastKey === yesterdayKey ? (streak + 1) : 1;
        (user as any).eventCheckinLastDate = todayKey;
        (user as any).eventCheckinStreak = streak;

        let msgStr =
          `✅ <b>ĐIỂM DANH THÀNH CÔNG!</b>\n` +
          `📅 Ngày: <b>${todayKey}</b>\n` +
          `📥 Nạp hôm nay: <b>${depositToday.toLocaleString("vi-VN")}đ</b>\n` +
          `🔥 Tiến độ: <b>${streak}/${EVENT_STREAK_TARGET_DAYS}</b> ngày liên tục`;

        if (streak >= EVENT_STREAK_TARGET_DAYS) {
          const hasDeposit7d = hasUserSuccessfulDepositInLastDays(user, EVENT_STREAK_TARGET_DAYS);
          if (!hasDeposit7d) {
            msgStr +=
              `\n\n⚠️ Bạn đã đủ ${EVENT_STREAK_TARGET_DAYS} ngày điểm danh nhưng chưa có nạp trong ${EVENT_STREAK_TARGET_DAYS} ngày gần nhất.`;
          } else {
            const code = createGiftcodeRecord(EVENT_REWARD_GIFTCODE_VALUE, "EVENT_CHECKIN");
            msgStr +=
              `\n\n🎉 <b>CHÚC MỪNG BẠN ĐỦ ${EVENT_STREAK_TARGET_DAYS} NGÀY LIÊN TỤC!</b>\n` +
              `🎁 Thưởng: <b>Giftcode ${EVENT_REWARD_GIFTCODE_VALUE.toLocaleString("vi-VN")}</b>\n` +
              `🔑 Mã: <code>/code ${code}</code>\n\n` +
              `✅ Chu kỳ điểm danh đã reset, mai bạn có thể bắt đầu vòng mới.`;
            (user as any).eventCheckinStreak = 0;
          }
        }

        writeJson(userJsonFile, users);
        bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id, { text: "Đã điểm danh!" }).catch(() => {});
      } else if (act === "history_bet") {
        const history = (user.betHistory || []).slice().reverse();
        if (history.length === 0) {
          bot1.sendMessage(chat, `📜 <b>LỊCH SỬ CƯỢC:</b>\n<i>Chưa có dữ liệu lịch sử cược!</i>`, { parse_mode: "HTML" });
        } else {
          const items = history.slice(0, 10); // Mặc định hiển thị 10 dòng gần nhất
          let msgStr = `📜 <b>LỊCH SỬ CƯỢC:</b>\n`;
          msgStr += `Thời gian | Game | Số tiền | Trạng thái\n\n`;

          items.forEach((h: any, idx: number) => {
            const timeStr = moment(h.time).format("HH:mm:ss DD/MM/YYYY");
            let gameName = "ROOMXX";
            if (h.game === "TELEGRAM_XX_DIRECT") gameName = "TELE-XX";
            else if (h.game === "LODE_TELEGRAM") gameName = "LODE";

            let betTypeStr = "";
            if (Array.isArray(h.bets) && h.bets.length > 0) {
              const firstBet = h.bets[0];
              betTypeStr = String(firstBet.betType || "").toUpperCase();
            } else if (h.betType) {
              betTypeStr = String(h.betType).toUpperCase();
            }
            
            const gameDisplay = betTypeStr ? `${gameName}-${betTypeStr}` : gameName;
            const amountDisplay = (h.amount || h.stake || 0).toLocaleString("vi-VN");
            const statusIcon = h.isWin ? "✅" : "❌";
            const statusText = h.isWin ? `Thắng phiên #${h.phien} (+${(h.payout || 0).toLocaleString("vi-VN")})` : `Thua phiên #${h.phien}`;

            msgStr += `${idx + 1}. ${timeStr} | ${gameDisplay} | ${amountDisplay} | ${statusText} ${statusIcon}\n`;
          });

          const totalPages = Math.ceil(history.length / 10);
          msgStr += `\nTrang 1 | Hiển thị 1-${items.length} | Trang cuối ${totalPages}\n`;
          msgStr += `Gợi ý: <code>/lschoi [trang] [số dòng]</code>, ví dụ <code>/lschoi 2 30</code>`;
          bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
        }
        bot1.answerCallbackQuery(q.id).catch(() => {});
      } else if (act === "history_dep") {
        const history = (user.depositHistory || []).slice(0, 5);
        let msgStr = `📥 <b>LỊCH SỬ NẠP GẦN ĐÂY:</b>\n`;
        history.forEach((h: any, idx: number) => {
          msgStr += `${idx + 1}. <b>${h.amount}</b> (${h.time}) - <b>${h.status || "Xong"}</b>\n`;
          if (h.transferContent) msgStr += `📝 Nội dung: <code>${h.transferContent}</code>\n`;
        });
        bot1.sendMessage(chat, msgStr || "Trống", { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
      } else if (act === "history_wit") {
        const history = (user.withdrawHistory || []).slice(0, 5);
        let msgStr = `📤 <b>LỊCH SỬ RÚT GẦN ĐÂY:</b>\n`;
        history.forEach((h: any, idx: number) => {
          msgStr += `${idx + 1}. <b>${h.amount.toLocaleString("vi-VN")} xu</b> (${h.time}) - <b>${h.status || "Xử lý"}</b>\n`;
        });
        bot1.sendMessage(chat, msgStr || "Trống", { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {});
      }
    } catch {}
  });

  bot1.onText(/^\/lschoi(?:\s+(\d+))?(?:\s+(\d+))?$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId)) return;

    try {
      const users = readJson(userJsonFile);
      const user = users.find((u: any) => String(u.id) === userId);
      if (!user) return;

      const history = (user.betHistory || []).slice().reverse();
      if (history.length === 0) {
        bot1.sendMessage(chat, `📜 <b>LỊCH SỬ CƯỢC:</b>\n<i>Chưa có dữ liệu lịch sử cược!</i>`, { parse_mode: "HTML" });
        return;
      }

      let page = parseInt(match?.[1] || "1", 10);
      let pageSize = parseInt(match?.[2] || "10", 10);
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(pageSize) || pageSize < 1) pageSize = 10;
      if (pageSize > 50) pageSize = 50;

      const totalItems = history.length;
      const totalPages = Math.ceil(totalItems / pageSize);
      if (page > totalPages) page = totalPages;

      const startIdx = (page - 1) * pageSize;
      const endIdx = Math.min(startIdx + pageSize, totalItems);
      const items = history.slice(startIdx, endIdx);

      let msgStr = `📜 <b>LỊCH SỬ CƯỢC:</b>\n`;
      msgStr += `Thời gian | Game | Số tiền | Trạng thái\n\n`;

      items.forEach((h: any, idx: number) => {
        const globalIdx = startIdx + idx + 1;
        const timeStr = moment(h.time).format("HH:mm:ss DD/MM/YYYY");
        
        // Xác định tên Game
        let gameName = "ROOMXX";
        if (h.game === "TELEGRAM_XX_DIRECT") gameName = "TELE-XX";
        else if (h.game === "LODE_TELEGRAM") gameName = "LODE";

        // Lấy loại cược (T/X/C/L...)
        let betTypeStr = "";
        if (Array.isArray(h.bets) && h.bets.length > 0) {
          const firstBet = h.bets[0];
          betTypeStr = String(firstBet.betType || "").toUpperCase();
        } else if (h.betType) {
          betTypeStr = String(h.betType).toUpperCase();
        }
        
        const gameDisplay = betTypeStr ? `${gameName}-${betTypeStr}` : gameName;
        const amountDisplay = (h.amount || h.stake || 0).toLocaleString("vi-VN");
        
        const statusIcon = h.isWin ? "✅" : "❌";
        const statusText = h.isWin ? `Thắng phiên #${h.phien} (+${(h.payout || 0).toLocaleString("vi-VN")})` : `Thua phiên #${h.phien}`;

        msgStr += `${globalIdx}. ${timeStr} | ${gameDisplay} | ${amountDisplay} | ${statusText} ${statusIcon}\n`;
      });

      msgStr += `\nTrang ${page} | Hiển thị ${startIdx + 1}-${endIdx} | Trang cuối ${totalPages}\n`;
      msgStr += `Gợi ý: <code>/lschoi [trang] [số dòng]</code>, ví dụ <code>/lschoi 2 30</code>`;

      bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
    } catch (e) {
      console.error("LS Choi error:", e);
    }
  });

  bot1.onText(/^\/chuyentien\s+(\d+)\s+(\d+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;

    const targetId = match[1];
    const amount = parseInt(match[2], 10);

    if (isNaN(amount) || amount < 1000) {
      bot1.sendMessage(chat, "❌ Số tiền chuyển tối thiểu là 1.000 xu.");
      return;
    }

    if (targetId === userId) {
      bot1.sendMessage(chat, "❌ Bạn không thể tự chuyển tiền cho chính mình.");
      return;
    }

    try {
      const users = readJson(userJsonFile);
      const sender = users.find((u: any) => String(u.id) === userId);
      const receiver = users.find((u: any) => String(u.id) === targetId);

      if (!sender) return;
      if (!receiver) {
        bot1.sendMessage(chat, "❌ Người nhận không tồn tại trong hệ thống.");
        return;
      }

      if (!isNoviceUnlocked(sender)) {
        bot1.sendMessage(chat, "❌ Bạn phải nạp đủ 20.000 xu để mở khóa tính năng chuyển tiền.");
        return;
      }

      const fee = Math.ceil(amount * 0.05);
      const totalDeduct = amount + fee;
      const balance = sender.sd !== undefined ? sender.sd : (sender.money || 0);
      if (balance < totalDeduct) {
        bot1.sendMessage(chat, `❌ Số dư không đủ (Cần ${amount.toLocaleString("vi-VN")} xu + ${fee.toLocaleString("vi-VN")} xu phí 5% = ${totalDeduct.toLocaleString("vi-VN")} xu).`);
        return;
      }

      // Thực hiện chuyển tiền
      if (sender.sd !== undefined) sender.sd -= totalDeduct;
      if (sender.money !== undefined) sender.money -= totalDeduct;

      receiver.sd = (receiver.sd || 0) + amount;
      if (receiver.money !== undefined) receiver.money = (receiver.money || 0) + amount;

      writeJson(userJsonFile, users);

      bot1.sendMessage(chat, `✅ Bạn đã chuyển thành công <b>${amount.toLocaleString("vi-VN")} xu</b> cho <b>${receiver.name}</b> (ID: ${targetId}).\n💸 Phí chuyển tiền 5%: <b>${fee.toLocaleString("vi-VN")} xu</b>`, { parse_mode: "HTML" });
      bot1.sendMessage(targetId, `💰 Bạn nhận được <b>${amount.toLocaleString("vi-VN")} xu</b> từ <b>${sender.name}</b> (ID: ${userId}).`, { parse_mode: "HTML" }).catch(() => {});
      
      sendMessageToAdminGroup(`💸 <b>THÔNG BÁO CHUYỂN TIỀN:</b>\n👤 Người gửi: <b>${sender.name}</b> (ID: <code>${userId}</code>)\n👤 Người nhận: <b>${receiver.name}</b> (ID: <code>${targetId}</code>)\n💰 Số tiền: <b>${amount.toLocaleString("vi-VN")} xu</b>\n💸 Phí (5%): <b>${fee.toLocaleString("vi-VN")} xu</b>`, { parse_mode: "HTML" });
    } catch (e) {
      console.error("Transfer error:", e);
      bot1.sendMessage(chat, "❌ Có lỗi xảy ra khi thực hiện chuyển tiền.");
    }
  });

  bot1.onText(/\/nap\s+(\d+)(?:\s+(\d+))?/, (msg, match) => {
    const chat = msg.chat.id;
    const isReply = !!msg.reply_to_message;
    const isAdmin = isAdminGroupChat(chat) || isAdminUser(msg.from?.id);

    // Case 1: Admin /nap [id] [amount] or Admin /nap [amount] (reply)
    if (isAdmin && match) {
      let targetId: string;
      let amount: number;

      if (match[2]) {
        targetId = match[1];
        amount = parseInt(match[2], 10);
      } else if (isReply && match[1]) {
        targetId = String(msg.reply_to_message?.from?.id || "");
        amount = parseInt(match[1], 10);
      } else {
        // Not enough info for admin command
        return;
      }

      if (isNaN(amount) || !targetId) return;

      try {
        const users = readJson(userJsonFile);
        const idx = users.findIndex((u: any) => String(u.id) === String(targetId));
        if (idx === -1) {
          bot1.sendMessage(chat, "❌ Không tìm thấy người chơi.");
          return;
        }
        const user = users[idx];
        const result = addDepositToUser(user, amount);

        if (!user.depositHistory) user.depositHistory = [];
        user.depositHistory.unshift({ 
          time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), 
          amount: amount.toLocaleString("vi-VN"), 
          status: "Thành công (Admin)" 
        });

        writeJson(userJsonFile, users);
        bot1.sendMessage(chat, `✅ Đã nạp thành công <b>${amount.toLocaleString("vi-VN")} xu</b> cho ID <code>${targetId}</code>.`, { parse_mode: "HTML" });
        bot1.sendMessage(targetId, `💰 Bạn đã được Admin nạp <b>${amount.toLocaleString("vi-VN")} xu</b> vào tài khoản.\n🎉 Khuyến mãi ${result.promoRate}%: +<b>${result.promoAmount.toLocaleString("vi-VN")} xu</b>`, { parse_mode: "HTML" });

        const maskedId = String(targetId).length > 5 ? "*****" + String(targetId).slice(-5) : targetId;
        sendMessageToRoom(
          `😂🔴 <b>Người chơi ID:</b> <code>${maskedId}</code>\n` +
          `- Nạp bank thành công: <b>${amount.toLocaleString("vi-VN")} xu</b>\n` +
          `🎉 Khuyến mãi thêm ${result.promoRate}%: <b>${result.promoAmount.toLocaleString("vi-VN")} xu</b>`,
          { parse_mode: "HTML" }
        );
      } catch (e) {
        console.error("Admin nap error:", e);
      }
      return;
    }

    // Case 2: User /nap [amount]
    if (!isAdmin && match && match[1] && !match[2]) {
      if (isBanned(chat)) return;
      const amount = parseInt(match[1], 10);
      const minDeposit = 10000;
      const maxDeposit = 500000000;
      if (isNaN(amount) || amount < minDeposit || amount > maxDeposit) {
        bot1.sendMessage(chat, `❌ Số tiền nạp không hợp lệ. Tối thiểu <b>${minDeposit.toLocaleString("vi-VN")} ₫</b> và tối đa <b>${maxDeposit.toLocaleString("vi-VN")} ₫</b>.`, { parse_mode: "HTML" });
        return;
      }

      try {
        const users = readJson(userJsonFile);
        const idx = users.findIndex((u: any) => String(u.id) === String(chat));
        if (idx === -1) return;
        const user = users[idx];

        const cooldownRemaining = getDepositOrderCooldownRemainingSeconds(user);
        if (cooldownRemaining > 0) {
          bot1.sendMessage(chat, `⏳ Vui lòng chờ <b>${cooldownRemaining} giây</b> nữa để tạo lệnh nạp tiếp theo.`, { parse_mode: "HTML" });
          return;
        }

        const req = createManualDepositRequest(user, chat, amount);
        writeJson(userJsonFile, users);

        const qrImageUrl = buildDepositQrImageUrl(amount, req.content);
        bot1.sendPhoto(chat, qrImageUrl, {
          caption: formatDepositOrderCaption(amount, req.content),
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "✅ Đã Chuyển Khoản", callback_data: `deposit_sent_${req.requestId}` }]]
          }
        }).then((sentMessage) => {
          setTimeout(() => {
            bot1.deleteMessage(chat, sentMessage.message_id).catch(e => console.error("Error deleting message:", e));
          }, 10 * 60 * 1000); // 10 minutes
        }).catch(() => {
          bot1.sendMessage(chat, formatDepositOrderCaption(amount, req.content), {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[{ text: "✅ Đã Chuyển Khoản", callback_data: `deposit_sent_${req.requestId}` }]]
            }
          }).then((sentMessage) => {
            setTimeout(() => {
              bot1.deleteMessage(chat, sentMessage.message_id).catch(e => console.error("Error deleting message:", e));
            }, 10 * 60 * 1000); // 10 minutes
          }).catch(e => console.error("Error sending fallback message:", e));
        });
      } catch {}
    }
  });



  bot1.onText(/\/rut(?:\s+(.+))?/, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat)) return;

    try {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u: any) => String(u.id) === String(chat));
      if (idx === -1) return;
      const user = users[idx];

      // Check if bank account is linked
      if (!user.bankAccount || !user.bankName || !user.bankOwner) {
        const guide = `⚠️ <b>Vui lòng liên kết ngân hàng trước!</b>

<code>/caidatbank</code> [dấu cách] STK [dấu cách] Mã Bank [dấu cách] Tên chủ TK

<b>Ví dụ:</b> <code>/caidatbank 0271722 MB Nguyen Van A</code>
(tên chủ tài khoản không viết dấu)

<b>Danh sách Mã Bank:</b>
VTB - VietinBank 
VCB - Vietcombank 
BIDV - BIDV 
AGR - Agribank 
OCB - OCB 
MB - MBBank 
TCB - Techcombank 
ACB - ACB 
VPB - VPBank 
TPB - TPBank 
STB - Sacombank 
HDB - HDBank 
VCCB - VietCapitalBank 
SCB - SCB 
VIB - VIB 
SHB - SHB 
EIB - Eximbank 
MSB - MSB 
BAB - BacABank 
ABB - ABBank 
NCB - NCB 
SHBVN - ShinhanBank 
BVB - BaoVietBank`;
        bot1.sendMessage(chat, guide, { parse_mode: "HTML" });
        return;
      }

      // Display linked bank info with spoiler as requested
      if (match && !match[1]) {
        const withdrawInfo = `📤 <b>RÚT TIỀN</b> 
• Min 50k
• Phí giao dịch rút: 1% 
✍️ <b>Cú pháp rút tiền:</b>
Gõ lệnh <code>/rut</code> để kiểm tra liên kết ngân hàng.
Gõ lệnh <code>/rut [số tiền]</code> hoặc <code>/rut all</code> để tạo lệnh rút.`;
        bot1.sendMessage(chat, withdrawInfo, { parse_mode: "HTML" });
        return;
      }

      const inputAmount = match && match[1] ? match[1].trim().toLowerCase() : "";
      let money = 0;
      const balance = user.sd !== undefined ? user.sd : (user.money || 0);
      const minWithdraw = 50000; // General minimum for unlocked users

      const account = user.bankAccount;
      const bank = user.bankName;
      const owner = user.bankOwner;

      if (inputAmount === "all" || inputAmount === "max") {
        let calculatedMoney = Math.floor(balance / 1.01); // Assuming 1% fee
        if (!isNoviceUnlocked(user)) {
          if (calculatedMoney > 5000) {
            bot1.sendMessage(chat, `❌ Tài khoản tân thủ chưa nạp đủ <b>20.000 xu</b> chỉ được rút tối đa <b>5.000 xu</b> một lần.`, { parse_mode: "HTML" });
            return;
          }
        } else if (calculatedMoney < minWithdraw) {
          bot1.sendMessage(chat, `❌ Số dư của bạn không đủ để rút tối thiểu ${minWithdraw.toLocaleString("vi-VN")} xu sau khi trừ phí.`, { parse_mode: "HTML" });
          return;
        }
        if (calculatedMoney > 0) {
          money = calculatedMoney;
        } else {
          bot1.sendMessage(chat, `❌ Số dư của bạn không đủ để thực hiện lệnh rút.`, { parse_mode: "HTML" });
          return;
        }
      } else {
        money = parseInt(inputAmount, 10);
        if (isNaN(money) || money <= 0) {
          bot1.sendMessage(chat, `⚠️ <b>Sai cú pháp rút tiền!</b>\n✍️ <code>/rut [số tiền]</code> hoặc <code>/rut all</code> / <code>/rut max</code>`, { parse_mode: "HTML" });
          return;
        }
      }

      // Novice withdrawal logic
      if (!isNoviceUnlocked(user)) {
        const hasPreviousWithdrawal = user.withdrawHistory && user.withdrawHistory.some((h: any) => h.status === "Đang xử lý" || h.status === "Thành công");

        if (hasPreviousWithdrawal) {
          bot1.sendMessage(chat, `❌ Tài khoản tân thủ chưa nạp đủ <b>20.000 xu</b> chỉ được rút 1 lần duy nhất. Bạn đã thực hiện rút tiền rồi.`, { parse_mode: "HTML" });
          return;
        }

        if (money > 5000) {
          bot1.sendMessage(chat, `❌ Tài khoản tân thủ chưa nạp đủ <b>20.000 xu</b> chỉ được rút tối đa <b>5.000 xu</b> một lần.`, { parse_mode: "HTML" });
          return;
        }
        // If it\'s their first withdrawal and <= 5000, allow it to proceed through the rest of the function.
      } else if (money < minWithdraw) {
        bot1.sendMessage(chat, `❌ Hạn mức rút tối thiểu ${minWithdraw.toLocaleString("vi-VN")} xu!`, { parse_mode: "HTML" });
        return;
      }

      if (user.vongCuoc && user.vongCuoc > 0) {
        bot1.sendMessage(chat, `❌ Chưa hoàn tất vòng cược! Cần cược thêm <b>${Math.ceil(user.vongCuoc).toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }

      const fee = Math.ceil(money * 0.01);
      const totalDeduct = money + fee;
      // balance is already declared above
      if (balance < totalDeduct) {
        bot1.sendMessage(chat, `❌ Không đủ số dư ví kèm 1% phí (Cần: ${totalDeduct.toLocaleString("vi-VN")} xu)!`);
        return;
      }

      if (user.sd !== undefined) user.sd -= totalDeduct;
      if (user.money !== undefined) user.money -= totalDeduct;
      user.rut = (user.rut || 0) + money;

      if (!user.withdrawHistory) user.withdrawHistory = [];
      user.withdrawHistory.unshift({ time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), amount: money, fee: fee, receiveAmount: money, bankNo: account, bankName: bank, bankUser: owner, status: "Đang xử lý" });
      writeJson(userJsonFile, users);

      bot1.sendMessage(chat, `✅ Lập đơn rút xu ${money.toLocaleString("vi-VN")} xu thành công! Chờ Admin phê duyệt.`);

      const ticket = `⚠️ <b>RÚT TIỀN CHỜ DUYỆT</b>\nID: <code>${chat}</code>\nSố xu rút: ${money.toLocaleString("vi-VN")}\nThực nhận (100%): <b>${money.toLocaleString("vi-VN")} xu</b>\nTổng nạp: <b>${(user.nap || 0).toLocaleString("vi-VN")} xu</b>\nTổng rút: <b>${(user.rut || 0).toLocaleString("vi-VN")} xu</b>\nBank: ${user.bankName} | ${user.bankAccount} | ${user.bankOwner}\n\nDuyệt: <code>/duyet_rut ${chat} ${money}</code>\nTừ chối: <code>/tuchoi_rut ${chat} ${money} [Lý do]</code>`;
      sendAndPinToAdminGroup(ticket, (pinnedId) => {
        try {
          const list = readJson(userJsonFile);
          const current = list.find((p: any) => String(p.id) === String(chat));
          if (current?.withdrawHistory) {
            const hIdx = current.withdrawHistory.findIndex((h: any) => h.status === "Đang xử lý" && h.amount === money);
            if (hIdx !== -1) {
              current.withdrawHistory[hIdx].adminMessageId = pinnedId;
              writeJson(userJsonFile, list);
            }
          }
        } catch {}
      });
    } catch {}
  });

  bot1.onText(/\/caidatbank (.+)/, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat) || !match) return;

    const parts = match[1].trim().split(/\s+/);
    if (parts.length < 3) {
      const guide = `⚠️ <b>Sai cú pháp cài đặt ngân hàng!</b>

<code>/caidatbank</code> [dấu cách] STK [dấu cách] Mã Bank [dấu cách] Tên chủ TK

<b>Ví dụ:</b> <code>/caidatbank 0271722 MB Nguyen Van A</code>
(tên chủ tài khoản không viết dấu)`;
      bot1.sendMessage(chat, guide, { parse_mode: "HTML" });
      return;
    }

    const account = parts[0];
    const bankCode = parts[1].toUpperCase();
    const owner = parts.slice(2).join(" ").toUpperCase();

    const bankMap: { [key: string]: string } = {
      "VTB": "VietinBank", "VCB": "Vietcombank", "BIDV": "BIDV", "AGR": "Agribank",
      "OCB": "OCB", "MB": "MBBank", "TCB": "Techcombank", "ACB": "ACB",
      "VPB": "VPBank", "TPB": "TPBank", "STB": "Sacombank", "HDB": "HDBank",
      "VCCB": "VietCapitalBank", "SCB": "SCB", "VIB": "VIB", "SHB": "SHB",
      "EIB": "Eximbank", "MSB": "MSB", "BAB": "BacABank", "ABB": "ABBank",
      "NCB": "NCB", "SHBVN": "ShinhanBank", "BVB": "BaoVietBank"
    };

    const bank = bankMap[bankCode] || bankCode;

    try {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u: any) => String(u.id) === String(chat));
      if (idx === -1) return;
      const user = users[idx];

      if (user.bankAccount) {
        bot1.sendMessage(chat, `❌ Bạn đã liên kết tài khoản ngân hàng rồi. Mỗi tài khoản chỉ được liên kết 1 ngân hàng duy nhất.\nThông tin ngân hàng hiện tại: <b>${user.bankName} - ${user.bankAccount} - ${user.bankOwner}</b>`, { parse_mode: "HTML" });
        return;
      }

      const existingBankUser = users.find((u: any) => u.bankAccount === account);
      if (existingBankUser) {
        bot1.sendMessage(chat, `❌ Số tài khoản ngân hàng này đã được liên kết với một tài khoản khác. Vui lòng kiểm tra lại hoặc liên hệ Admin.`);
        return;
      }

      user.bankAccount = account;
      user.bankName = bank;
      user.bankOwner = owner;
      writeJson(userJsonFile, users);

      bot1.sendMessage(chat, `✅ Cài đặt tài khoản ngân hàng thành công!\nNgân hàng: <b>${bank}</b>\nSố tài khoản: <b>${account}</b>\nChủ tài khoản: <b>${owner}</b>`, { parse_mode: "HTML" });

    } catch (error) {
      console.error("Error linking bank account:", error);
      bot1.sendMessage(chat, `❌ Đã xảy ra lỗi khi liên kết tài khoản ngân hàng. Vui lòng thử lại sau.`);
    }
  });

  bot1.onText(/\/code (.+)/, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat) || !match) return;
    const code = match[1].trim();

    try {
      const gList = readJson(giftJsonFile);
      const gIdx = gList.findIndex((g: any) => String(g.gift || "").toLowerCase() === code.toLowerCase());
      if (gIdx === -1) {
        bot1.sendMessage(chat, `❌ Mã Giftcode lộc không tồn tại!`);
        return;
      }
      const g = gList[gIdx];
      const usedByList = Array.isArray(g.usedBy)
        ? g.usedBy.map((id: any) => String(id))
        : (g.userIdUsed ? [String(g.userIdUsed)] : []);
      const maxUses = Math.max(1, Math.floor(Number(g.maxUses) || 1));
      const usedCount = Math.max(0, Math.floor(Number(g.usedCount) || usedByList.length));

      if (usedByList.includes(String(chat))) {
        bot1.sendMessage(chat, `❌ Bạn đã nhập giftcode này rồi!`);
        return;
      }

      if (usedCount >= maxUses) {
        bot1.sendMessage(chat, `❌ Mã quà tặng đã hết lượt sử dụng!`);
        return;
      }

      const users = readJson(userJsonFile);
      const uIdx = users.findIndex((u: any) => String(u.id) === String(chat));
      if (uIdx === -1) return;
      const user = users[uIdx];

      // Điều kiện nhập code tự động (AUTO_HOURLY_ROOM)
      if (g.creatorId === "AUTO_HOURLY_ROOM") {
        // 1. Phải nạp tiền trong ngày
        const today = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
        const hasDepositToday = user.depositHistory && user.depositHistory.some((h: any) => h.time.startsWith(today) && h.status.includes("Thành công"));
        if (!hasDepositToday) {
          bot1.sendMessage(chat, `❌ Code tự động chỉ dành cho người chơi có <b>nạp tiền trong ngày</b>!`, { parse_mode: "HTML" });
          return;
        }

        // 2. Mỗi người chỉ được nhập tối đa 3 lần loại code này
        const hourlyCodesUsed = gList.filter((item: any) => 
          item.creatorId === "AUTO_HOURLY_ROOM" && 
          item.usedBy && 
          item.usedBy.includes(String(chat))
        ).length;
        
        if (hourlyCodesUsed >= 3) {
          bot1.sendMessage(chat, `❌ Bạn đã đạt giới hạn nhập <b>3 lần</b> đối với loại code tự động này!`, { parse_mode: "HTML" });
          return;
        }
      }

      users[uIdx].sd = (users[uIdx].sd || 0) + g.value;
      if (users[uIdx].money !== undefined) users[uIdx].money = (users[uIdx].money || 0) + g.value;
      users[uIdx].vongCuoc = (users[uIdx].vongCuoc || 0) + g.value;

      const useTime = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
      const nextUsedBy = [...usedByList, String(chat)];
      g.maxUses = maxUses;
      g.usedBy = nextUsedBy;
      g.usedCount = nextUsedBy.length;
      g.userIdUsed = nextUsedBy.length >= maxUses ? String(chat) : null;
      g.useTime = useTime;

      writeJson(giftJsonFile, gList);
      writeJson(userJsonFile, users);

      const remainUses = Math.max(0, maxUses - nextUsedBy.length);
      const remainText = maxUses > 1 ? `\n🔁 Còn lại: <b>${remainUses}</b> lượt nhập` : "";
      bot1.sendMessage(chat, `🎉 Nhập Giftcode +<b>${g.value.toLocaleString("vi-VN")} xu</b> thành công!${remainText}`, { parse_mode: "HTML" });
      const userIdStr = String(chat);
      const maskedId = userIdStr.length > 5 ? `*****${userIdStr.slice(-5)}` : userIdStr;
      sendMessageToRoom(`↪️ Người chơi <b>${maskedId}</b>\nNhận giftcode <code>${g.gift}</code> thành công! Giá trị: <b>${g.value.toLocaleString("vi-VN")}</b>`, { parse_mode: "HTML" });
      sendMessageToAdminGroup(`🎁 <b>THÔNG BÁO NHẬP CODE:</b>\n👤 Người dùng: <b>${users[uIdx].name}</b> (ID: <code>${chat}</code>)\n🔑 Mã code: <code>${code}</code>\n💰 Giá trị: <b>${g.value.toLocaleString("vi-VN")} xu</b>`, { parse_mode: "HTML" });
    } catch {}
  });

  bot1.onText(/^\/doidiemvip(?:\s+(\d+))?$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat)) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "⚠️ Lệnh đổi điểm VIP chỉ dùng trong chat riêng với bot chính.", { parse_mode: "HTML" });
      return;
    }

    try {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u: any) => String(u.id) === String(chat));
      if (idx === -1) {
        bot1.sendMessage(chat, "❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.");
        return;
      }

      const user = users[idx];
      user.vipPoints = Math.max(0, Number(user.vipPoints || 0));
      const vipInfo = getVipTierInfo(user);
      const rate = getVipExchangeRate(user);

      if (!match?.[1]) {
        bot1.sendMessage(chat,
          `${formatVipGuideMessage(user)}\n\n` +
          `👉 <b>Ví dụ đổi điểm:</b> <code>/doidiemvip 10</code>\n` +
          `💸 <b>Tỷ lệ hiện tại của bạn:</b> <b>${rate.toLocaleString("vi-VN")}đ</b>/1 điểm VIP`,
          { parse_mode: "HTML" }
        );
        return;
      }

      const redeemPoints = parseInt(match[1], 10);
      if (isNaN(redeemPoints) || redeemPoints <= 0) {
        bot1.sendMessage(chat, `⚠️ <b>Sai cú pháp!</b>\nDùng: <code>/doidiemvip [số điểm]</code>`, { parse_mode: "HTML" });
        return;
      }

      if (rate <= 0) {
        bot1.sendMessage(chat, `⚠️ <b>Hệ thống đang bảo trì tính năng đổi điểm.</b>`, { parse_mode: "HTML" });
        return;
      }

      if (user.vipPoints < redeemPoints) {
        bot1.sendMessage(chat, `⚠️ <b>Điểm VIP không đủ!</b>\nBạn đang có: <b>${user.vipPoints.toLocaleString("vi-VN")}</b> điểm.\nDùng: <code>/doidiemvip [số điểm]</code>`, { parse_mode: "HTML" });
        return;
      }

      const receiveAmount = redeemPoints * rate;
      user.vipPoints -= redeemPoints;
      user.sd = (user.sd || 0) + receiveAmount;
      if (user.money !== undefined) user.money = (user.money || 0) + receiveAmount;
      writeJson(userJsonFile, users);

      bot1.sendMessage(chat,
        `🎁 <b>ĐỔI ĐIỂM VIP THÀNH CÔNG!</b>\n` +
        `👑 Cấp hiện tại: <b>VIP${vipInfo.level} ${vipInfo.badge} (${vipInfo.name})</b>\n` +
        `🧮 Số điểm đã đổi: <b>${redeemPoints.toLocaleString("vi-VN")}</b>\n` +
        `💸 Tỷ lệ áp dụng: <b>${rate.toLocaleString("vi-VN")}đ</b>/1 điểm VIP\n` +
        `💰 Số xu nhận được: <b>${receiveAmount.toLocaleString("vi-VN")} xu</b>\n` +
        `🖐️ Điểm VIP còn lại: <b>${user.vipPoints.toLocaleString("vi-VN")}</b>\n` +
        `🏦 Số dư hiện tại: <b>${(user.sd !== undefined ? user.sd : (user.money || 0)).toLocaleString("vi-VN")} xu</b>`,
        { parse_mode: "HTML" }
      );
    } catch {}
  });

  bot1.onText(/^\/muacode\s+(\d+)(?:\s+(\d+))?$/, (msg, match) => {
    const chat = msg.chat.id;
    const userId = msg.from?.id;
    if (!userId || isBanned(userId) || !match) return;

    let quantity = 1;
    let value = 0;

    if (match[2]) {
      quantity = parseInt(match[1], 10);
      value = parseInt(match[2], 10);
    } else {
      quantity = 1;
      value = parseInt(match[1], 10);
    }

    if (isNaN(quantity) || quantity <= 0 || quantity > 100) {
      bot1.sendMessage(chat, "❌ Số lượng giftcode không hợp lệ (từ 1 đến 100).");
      return;
    }
    if (isNaN(value) || value < 1000) {
      bot1.sendMessage(chat, "❌ Mệnh giá giftcode tối thiểu 1.000 xu!");
      return;
    }

    try {
      const users = readJson(userJsonFile);
      const uIdx = users.findIndex((u: any) => String(u.id) === String(userId));
      if (uIdx === -1) {
        bot1.sendMessage(chat, "❌ Bạn chưa đăng ký tài khoản! Gõ /start để đăng ký.");
        return;
      }
      const user = users[uIdx];

      if (!isNoviceUnlocked(user)) {
        bot1.sendMessage(chat, `❌ Bạn phải mở khóa tân thủ trước mới mua được giftcode. Cần nạp đủ <b>20.000 xu</b>.`, { parse_mode: "HTML" });
        return;
      }

      const balance = user.sd !== undefined ? user.sd : (user.money || 0);
      const totalValue = value * quantity;
      const totalCost = Math.ceil(totalValue * 1.03); // 3% fee directly calculated!

      if (balance < totalCost) {
        bot1.sendMessage(chat, `❌ Số dư không đủ! Bạn cần <b>${totalCost.toLocaleString("vi-VN")} xu</b> (Mệnh giá: ${totalValue.toLocaleString("vi-VN")} xu + 3% phí là ${(totalCost - totalValue).toLocaleString("vi-VN")} xu) nhưng hiện tại chỉ có <b>${Math.floor(balance).toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }

      user.sd = balance - totalCost;
      if (user.money !== undefined) user.money = user.money - totalCost;

      const giftcodes = readJson(giftJsonFile);
      const newCodes: any[] = [];
      const codeStrings: string[] = [];

      for (let i = 0; i < quantity; i++) {
        const generatedCode = generateGiftCode();
        newCodes.push(createGiftcodeData(generatedCode, value, String(userId), 1, new Date().toLocaleString("vi-VN")));
        codeStrings.push(`🔑 Gói: <b>${value.toLocaleString("vi-VN")}</b> xu 👉 Code: <code>/code ${generatedCode}</code>`);
      }

      writeJson(giftJsonFile, [...giftcodes, ...newCodes]);
      writeJson(userJsonFile, users);

      const replyMsg = `🎟️ <b>MUA GIFTCODE THÀNH CÔNG!</b>\n💎 Số lượng: <b>${quantity} mã</b>\n💰 Tổng ví trừ (gồm 3% phí): <b>${totalCost.toLocaleString("vi-VN")} xu</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${codeStrings.join("\n")}`;
      bot1.sendMessage(chat, replyMsg, { parse_mode: "HTML" });
      sendMessageToRoom(`👥 <b>Người chơi ẩn danh</b> đã mua thành công <b>${quantity}</b> giftcode mệnh giá <b>${value.toLocaleString("vi-VN")} xu</b>!`, { parse_mode: "HTML" });
    } catch (e) {
      console.error(e);
      bot1.sendMessage(chat, "❌ Có lỗi xảy ra trong quá trình mua giftcode.");
    }
  });

  bot1.onText(/^\/lamcai\s+(\d+)$/, (msg, match) => {
    const chat = msg.chat.id;
    if (!match || !match[1] || !msg.from) return;

    // Tự động xóa tin nhắn lệnh /lamcai của người dùng
    bot1.deleteMessage(chat, msg.message_id).catch(() => {});

    const amount = parseInt(match[1], 10);
    if (isNaN(amount) || amount < 1000000 || amount > 5000000) {
      bot1.sendMessage(chat, "❌ Cú pháp làm cái từ 1.000.000 - 5.000.000!");
      return;
    }
    if (!waitingCai.value) {
      bot1.sendMessage(chat, "❌ Ngoài thời gian đăng ký làm cái!");
      return;
    }
    if (currentCai.value) {
      bot1.sendMessage(chat, "⚠️ Đã có người làm cái phiên này!");
      return;
    }

    const users = readJson(userJsonFile);
    const idx = users.findIndex(u => String(u.id) === String(msg.from!.id));
    
    let user: any = null;
    let balance = 0;
    if (idx !== -1) {
      user = users[idx];
      balance = user.sd !== undefined ? user.sd : (user.money || 0);
    }

    if (!user) {
      bot1.sendMessage(chat, "❌ Sd của bạn k đủ");
      return;
    }

    if (balance < amount) {
      bot1.sendMessage(chat, getShortInsufficientBalanceMessage(user));
      return;
    }

    if (user.sd !== undefined) user.sd -= amount;
    if (user.money !== undefined) user.money -= amount;

    currentCai.value = {
      id: String(user.id),
      name: user.name || msg.from.first_name,
      amount,
      pool: amount,
      time: Date.now()
    };

    writeJson(userJsonFile, users);
    waitingCai.value = false;
    state.phienAnnounced = true;

    // Chỉ thông báo làm cái, còn "xin mời đặt cược" sẽ hiện sau khi hết 20s làm cái
    sendMessageToRoom(
      `👑 <b>ĐÃ CÓ NGƯỜI LÀM CÁI PHIÊN MỚI!</b>\n` +
      `🎰 Chủ cái: <b>${currentCai.value.name}</b>\n` +
      `💰 Mức vốn cái: <b>${amount.toLocaleString("vi-VN")} xu</b>\n` +
      `⏳ Vui lòng chờ hết <b>20 giây</b> làm cái để mở cược.`,
      { parse_mode: "HTML" }
    );
  });

  bot1.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    const name = msg.from?.first_name || msg.from?.username || "Hảo Hán";
    const startParam = String(match?.[1] || "").trim();
    const referredById = startParam.startsWith("ref_") ? startParam.replace("ref_", "").trim() : "";
    const users = readJson(userJsonFile);
    let u = users.find((x: any) => String(x.id) === String(chat));
    let shouldSaveUsers = false;
    if (!u) {
      u = {
        id: String(chat),
        name,
        sd: 0,
        cuoc: 0,
        thang: 0,
        thua: 0,
        nap: 0,
        rut: 0,
        dkrut: 0,
        hh: 0,
        lastBetResetDate: moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD"),
        lastBetWeekId: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-W"),
        cuocHomNay: 0,
        cuocTuanNay: 0,
        currentWinStreak: 0,
        currentLossStreak: 0,
        bestWinStreakToday: 0,
        bestLossStreakToday: 0,
        lastStreakPhien: 0,
        lastStreakResetDate: moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD"),
        vipPoints: 0,
        vipPointCooldown: 0,
      };
      if (referredById && referredById !== String(chat)) {
        u.referrerId = referredById;
      }
      users.push(u);
      shouldSaveUsers = true;
    } else if (!u.referrerId && referredById && referredById !== String(chat)) {
      u.referrerId = referredById;
      shouldSaveUsers = true;
    }
    if (shouldSaveUsers) {
      writeJson(userJsonFile, users);
    }
    if (startParam === "deposit") {
      bot1.sendMessage(
        chat,
        `💳 <b>Chọn hình thức nạp tiền</b>\n\n• <b>Ngân hàng:</b> tạo giao dịch chuyển khoản tự động.\n• <b>Thẻ cào:</b> nạp Viettel / Vinaphone / Mobifone (lệnh <code>/thecao</code>).\n\n👉 <b>Bấm nút bên dưới để tiếp tục.</b>\n\n<b>Chuyển Tiền vào ví cá nhân</b>`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🏦 Bank", callback_data: "deposit_bank" }],
              [{ text: "🎫 Thẻ cào (bảo trì)", callback_data: "deposit_card_maintenance" }]
            ]
          }
        }
      );
    } else if (startParam === "games") {
      const users = readJson(userJsonFile);
      const user = users.find((x: any) => String(x.id) === String(chat));
      if (user) {
        user.activeBetGame = "ROOM_DEFAULT";
        writeJson(userJsonFile, users);
      }
      const guideText = formatGameCatalogMessage();
      const options = {
        parse_mode: "HTML" as const,
        disable_web_page_preview: true,
        reply_markup: getGameCatalogReplyMarkup()
      };

      bot1.sendPhoto(chat, gameCatalogImagePath, {
        caption: guideText,
        parse_mode: "HTML",
        reply_markup: getGameCatalogReplyMarkup(),
      }).catch(() => {
        bot1.sendMessage(chat, guideText, options).catch(() => null);
      });
    } else if (startParam.startsWith("solo_")) {
      const roomCode = startParam.replace("solo_", "").trim().toUpperCase();
      if (!roomCode) {
        sendWelcomeStartMessage(chat, name);
        return;
      }
      try {
        handleSoloJoinByCode(roomCode, String(chat), chat, name);
      } catch (e) {
        console.error("solo start deep link error:", e);
        bot1.sendMessage(chat, "❌ Có lỗi khi mở phòng SOLO.");
      }
    } else {
      sendWelcomeStartMessage(chat, name);
    }
  });
}

// --- EXPRESS WEB SERVER RUNTIME ---
async function bootstrap() {
  initJsonFiles();
  registerAllBotCommands();
  setInterval(tickGameLoop, 1000);
  maybeDispatchRandomHourlyGiftCode();
  setInterval(maybeDispatchRandomHourlyGiftCode, 15000);
  maybeAutoSettleLoDe().catch(() => {});
  setInterval(() => { maybeAutoSettleLoDe().catch(() => {}); }, 60_000);

  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  // API Webhook SePay
  app.post("/sepay/webhook", async (req, res) => {
    try {
      const data = req.body;
      const transId = String(data.id);
      const amount = Number(data.transferAmount);
      const content = String(data.content || "").trim().toUpperCase();

      // content = "MUA 123456789"
      const match = content.match(/^MUA\s+(\d+)$/);
      if (!match) {
        return res.sendStatus(200);
      }

      const telegramId = match[1];

      // Kiểm tra giao dịch đã xử lý chưa
      const processedTransactions = new Set(readJson(processedTransactionsJsonFile, "[]"));
      if (processedTransactions.has(transId)) {
        return res.sendStatus(200);
      }
      processedTransactions.add(transId);
      writeJson(processedTransactionsJsonFile, Array.from(processedTransactions));

      // ===== CỘNG TIỀN =====
      const users = readJson(userJsonFile);
      const userIdx = users.findIndex((u: any) => String(u.id) === telegramId);
      
      if (userIdx === -1) {
        // Nếu user chưa tồn tại, bỏ qua hoặc có thể xử lý tạo mới (nhưng thường bot cần user start trước)
        return res.sendStatus(200);
      }

      const user = users[userIdx];
      
      // Sử dụng hàm addDepositToUser để xử lý cộng tiền, vòng cược, VIP, khuyến mãi
      const result = addDepositToUser(user, amount);

      // Lưu lịch sử nạp tiền
      if (!user.depositHistory) user.depositHistory = [];
      user.depositHistory.unshift({
        time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        amount: amount.toLocaleString("vi-VN"),
        status: "Thành công (Auto SePay)",
        transferContent: content,
        requestId: transId,
        adminNotified: true
      });

      writeJson(userJsonFile, users);

      // Gửi thông báo cho người dùng
      const balance = Math.floor(user.sd !== undefined ? user.sd : (user.money || 0));
      let notifyMsg = `✅ <b>NẠP TIỀN TỰ ĐỘNG THÀNH CÔNG</b>\n`;
      notifyMsg += `💰 Số tiền nạp: <b>${amount.toLocaleString("vi-VN")}đ</b>\n`;
      if (result.promoAmount > 0) {
        notifyMsg += `🎁 Khuyến mãi (${result.promoRate}%): <b>+${result.promoAmount.toLocaleString("vi-VN")}đ</b>\n`;
      }
      notifyMsg += `💵 Số dư hiện tại: <b>${balance.toLocaleString("vi-VN")} xu</b>`;

      bot1.sendMessage(telegramId, notifyMsg, { parse_mode: "HTML" }).catch(() => {});
      
      // Thông báo vào nhóm Admin
      sendMessageToAdminGroup(`✅ <b>AUTO NẠP SEPAY:</b>\nID: <code>${telegramId}</code>\nSố tiền: <b>${amount.toLocaleString("vi-VN")} ₫</b>\nNội dung: <code>${content}</code>`, { parse_mode: "HTML" });

      // Thông báo vào nhóm Game
      sendMessageToRoom(
        `😂🔴 <b>Người chơi ID:</b> <code>${formatMaskedId(telegramId)}</code>\n` +
        `- Nạp bank thành công: <b>${amount.toLocaleString("vi-VN")} xu</b>\n` +
        `🎉 Khuyến mãi thêm ${result.promoRate}%: <b>${result.promoAmount.toLocaleString("vi-VN")} xu</b>`,
        { parse_mode: "HTML" }
      );

      res.sendStatus(200);
    } catch (err) {
      console.error("SePay Webhook Error:", err);
      res.sendStatus(500);
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      gamePhase: state.gamePhase,
      secondsLeft: state.secondsLeft,
      phien: state.phien,
    });
  });

  app.get("/api/status", (req, res) => {
    const list = readJson(userJsonFile);
    const hu = readJson("hu.json");
    const gifts = readJson(giftJsonFile);
    const banned = readJson(banJsonFile);
    const cau = readJson("cau.json");
    const chanle = readJson("chanle.json");
    const soloRooms = readSoloRooms();

    res.json({
      status: "healthy",
      gamePhase: state.gamePhase,
      secondsLeft: state.secondsLeft,
      phien: state.phien,
      totals: {
        totalBetT: state.totalBetT,
        totalBetX: state.totalBetX,
        totalBetC: state.totalBetC,
        totalBetL: state.totalBetL,
        totalBetTC: state.totalBetTC,
        totalBetTL: state.totalBetTL,
        totalBetXC: state.totalBetXC,
        totalBetXL: state.totalBetXL,
      },
      betsLog: state.betsLog,
      cau,
      chanle,
      usersCount: list.length,
      users: list.map((u: any) => ({
        id: u.id,
        name: u.name,
        sd: u.sd !== undefined ? u.sd : (u.money || 0),
        vip: getVipLevel(u),
        vipPoints: getVipPoints(u),
        nap: u.nap || 0,
        rut: u.rut || 0,
        cuocHomNay: u.cuocHomNay || 0,
        cuocTuanNay: u.cuocTuanNay || 0,
        currentWinStreak: getUserActiveStreakCounts(u).win,
        currentLossStreak: getUserActiveStreakCounts(u).loss,
        streakStatus: getUserStreakStatusText(u),
        banned: banned.some((b: any) => String(b.id) === String(u.id)),
        depositHistory: u.depositHistory || [],
        withdrawHistory: u.withdrawHistory || [],
      })),
      giftcodes: gifts,
      soloRooms: {
        open: getOpenSoloRooms(soloRooms),
        total: soloRooms.length,
      },
      hu: {
        pot: hu.pot || 10000,
        history: hu.history || [],
        forceNextPotExplosion: state.forceNextPotExplosion,
        autoPotRate: state.autoPotRate,
        lessBetWinsRate: state.lessBetWinsRate,
      },
      botsStatus: [
        { name: "Bot 1 (Chính)", tag: "Dragon [BotChinh]", username: botUsernames[0], active: isTokenValid(tokenBot1), error: botErrors[0], token: tokenBot1 },
        { name: "Bot 2 (Phụ 1)", tag: "Dragon Room phụ 1", username: botUsernames[1], active: isTokenValid(tokenBot2), error: botErrors[1], token: tokenBot2 },
        { name: "Bot 3 (Phụ 2)", tag: "Dragon Room phụ 2", username: botUsernames[2], active: isTokenValid(tokenBot3), error: botErrors[2], token: tokenBot3 },
        { name: "Bot 4 (Phụ 3)", tag: "Dragon Room phụ 3", username: botUsernames[3], active: isTokenValid(tokenBot4), error: botErrors[3], token: tokenBot4 },
        { name: "Bot 5 (Phụ 4)", tag: "Dragon Room phụ 4", username: botUsernames[4], active: isTokenValid(tokenBot5), error: botErrors[4], token: tokenBot5 },
      ]
    });
  });

  app.post("/api/config/pot", (req, res) => {
    const { pot, forceNextRound, autoPotRate, lessBetWinsRate } = req.body;
    let huData = readJson("hu.json", '{"pot": 10000, "history": []}');
    if (typeof pot === "number") huData.pot = pot;
    if (typeof forceNextRound === "boolean") state.forceNextPotExplosion = forceNextRound;
    if (typeof autoPotRate === "number") {
      state.autoPotRate = Math.max(0, Math.min(100, autoPotRate));
      huData.autoPotRate = state.autoPotRate;
    }
    if (typeof lessBetWinsRate === "number") {
      state.lessBetWinsRate = Math.max(0, Math.min(100, lessBetWinsRate));
      huData.lessBetWinsRate = state.lessBetWinsRate;
    }
    writeJson("hu.json", huData);
    res.json({ success: true, config: huData });
  });

  app.post("/api/giftcodes/generate", (req, res) => {
    const { count, amount } = req.body;
    if (!count || !amount || count <= 0 || amount <= 0) return res.status(400).json({ success: false });
    const current = readJson(giftJsonFile);
    const generated: any[] = [];
    for (let i = 0; i < count; i++) {
      generated.push(createGiftcodeData("GIFT" + generateGiftCode(), amount, "WEB_ADMIN_PANEL", 1, new Date().toLocaleString("vi-VN")));
    }
    writeJson(giftJsonFile, [...current, ...generated]);
    res.json({ success: true, list: generated });
  });

  app.post("/api/players/action", (req, res) => {
    const { id, action, money, reason } = req.body;
    if (!id || !action) return res.status(400).json({ error: "Missing parameters" });

    if (action === "ban" || action === "unban") {
      let banned = readJson(banJsonFile);
      if (action === "ban") {
        if (!banned.some((b: any) => String(b.id) === String(id))) {
          banned.push({ id: parseInt(id, 10), reason: reason || "Web Penalty", time: new Date().toISOString() });
          bot1.sendMessage(id, `⛔ Tài khoản của bạn đã bị tạm dừng!`).catch(() => {});
        }
      } else {
        banned = banned.filter((b: any) => String(b.id) !== String(id));
      }
      writeJson(banJsonFile, banned);
      return res.json({ success: true });
    }

    if (action === "add" || action === "subtract") {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u: any) => String(u.id) === String(id));
      if (idx === -1) return res.status(404).json({ error: "User not found" });

      const value = parseInt(money, 10);
      if (isNaN(value) || value <= 0) return res.status(400).json({ error: "Invalid amount" });

      if (action === "add") {
        const result = addDepositToUser(users[idx], value);

        if (!users[idx].depositHistory) users[idx].depositHistory = [];
        users[idx].depositHistory.unshift({ time: moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), amount: value.toLocaleString("vi-VN"), status: "Thành công (Web Admin)" });

        const maskedId = String(id).length > 5 ? "*****" + String(id).slice(-5) : id;
        sendMessageToRoom(
          `😂🔴 <b>Người chơi ID:</b> <code>${maskedId}</code>\n` +
          `- Nạp bank thành công: <b>${value.toLocaleString("vi-VN")} xu</b>\n` +
          `🎉 Khuyến mãi thêm ${result.promoRate}%: <b>${result.promoAmount.toLocaleString("vi-VN")} xu</b>`,
          { parse_mode: "HTML" }
        );
        
        let notifyMsg = `💸 Bạn được cộng nạp từ Admin: +<b>${value.toLocaleString("vi-VN")} xu</b>.\n`;
        if (result.baseResetOccurred) {
          notifyMsg += `⚠️ <b>Lưu ý:</b> Tài khoản chưa mở khóa tân thủ nên số dư trước đó của bạn đã bị reset về <code>0 xu</code>.\n`;
        }
        if (result.newlyUnlocked) {
          notifyMsg += `🎉 <b>Chúc mừng! Bạn đã mở khóa thành viên Tân Thủ thành công</b> (Tổng nạp đạt ${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).\n`;
        } else if (result.totalNapAfter < 20000) {
          notifyMsg += `🔒 <b>Trạng thái:</b> Chưa mở khóa Tân Thủ (${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).\n`;
        }


        bot1.sendMessage(id, notifyMsg, { parse_mode: "HTML" }).catch(() => {});
      } else {
        users[idx].sd = Math.max(0, (users[idx].sd || 0) - value);
        if (users[idx].money !== undefined) users[idx].money = Math.max(0, (users[idx].money || 0) - value);
      }
      writeJson(userJsonFile, users);
      return res.json({ success: true, balance: users[idx].sd });
    }
  });

  app.post("/api/withdrawals/action", (req, res) => {
    const { id, amount, action, reason } = req.body;
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u: any) => String(u.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: "User not found" });
    const u = users[idx];
    const money = parseInt(amount, 10);

    let pinMsgId: number | undefined;
    let refundAmount = money;
    let bankName = "Ngân hàng";
    if (u.withdrawHistory) {
      const item = u.withdrawHistory.find((h: any) => h.status === "Đang xử lý" && String(h.amount) === String(money));
      if (item) {
        item.status = action === "approve" ? "Thành công" : `Từ chối: ${reason || "Hủy"}`;
        pinMsgId = item.adminMessageId;
        const fee = item.fee || 0;
        refundAmount = money + fee;
        bankName = item.bankName || "Ngân hàng";
      }
    }

    if (action === "reject") {
      u.sd = (u.sd || 0) + refundAmount;
      if (u.money !== undefined) u.money = (u.money || 0) + refundAmount;
      bot1.sendMessage(id, `❌ Đơn rút xu trị giá ${money.toLocaleString("vi-VN")} xu đã bị từ chối! Hoàn xu vào ví.`).catch(() => {});
    } else {
      bot1.sendMessage(id, `✅ Yêu cầu rút xu trị giá ${money.toLocaleString("vi-VN")} xu đã được duyệt chuyển khoản thành công!`).catch(() => {});
      sendMessageToRoom(`<b>🤩 Rút Xu Thành Công - ID ${formatMaskedId(u.id)}: +${money.toLocaleString("vi-VN")} xu về ${bankName}</b>`, { parse_mode: "HTML" });
    }

    writeJson(userJsonFile, users);
    if (pinMsgId) unpinFromAdminGroup(pinMsgId);
    res.json({ success: true });
  });

  app.get("/api/download", (req, res) => {
    try {
      const zip = new AdmZip();
      const files = fs.readdirSync(process.cwd());
      for (const file of files) {
        if (["node_modules", ".git", ".next", "dist", "package-lock.json", "Source.zip"].includes(file)) continue;
        const s = fs.statSync(path.join(process.cwd(), file));
        if (s.isDirectory()) zip.addLocalFolder(path.join(process.cwd(), file), file);
        else zip.addLocalFile(path.join(process.cwd(), file));
      }
      const zipPath = path.join(process.cwd(), "Source.zip");
      zip.writeZip(zipPath);
      res.download(zipPath, "LuckyBank_Source.zip");
    } catch (e: any) {
      res.status(500).send("Zipping failed: " + e.message);
    }
  });

  const distPath = path.join(process.cwd(), "dist");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
      app.use(vite.middlewares);
    } catch {}
  }

  app.listen(3000, "0.0.0.0", () => {
    console.log("🚀 Server running on port 3000");
  });
}

bootstrap();
