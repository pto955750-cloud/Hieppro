/**
 * 🐉 DRAGON BOT MULTI-BOT SYSTEM & GROUP CHAT /checktt RESOLVER 🐉
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Đây là mã nguồn Node.js chạy độc lập của bot Telegram.
 * Bạn có thể khởi chạy bằng lệnh: node bot.js
 * 
 * ⚙️ ĐIỀU KIỆN ĐẶC BIỆT: 
 * Chỉ thành viên ĐẠT ĐỦ MỐC tương tác chất lượng mới có thể sinh mã thưởng tương ứng.
 * Mã code có kèm theo ID Telegram của người chơi để hệ thống đối chiếu chính chủ khi nạp.
 */

import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';

const __dirname = process.cwd();

const userFilePath = path.join(__dirname, 'user.json');
const configFilePath = path.join(__dirname, 'config.json');

// --- HÀM TRỢ GIÚP ĐỌC / GHI DỮ LIỆU AN TOÀN ---

function readUserData() {
  try {
    if (!fs.existsSync(userFilePath)) {
      fs.writeFileSync(userFilePath, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(userFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("❌ Lỗi đọc file user.json:", error.message);
    return [];
  }
}

function writeUserData(users) {
  try {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error("❌ Lỗi lưu file user.json:", error.message);
  }
}

function readConfig() {
  try {
    if (!fs.existsSync(configFilePath)) {
      const defaultYMD = new Date().toISOString().split('T')[0];
      const defaultConfig = {
        tokens: [],
        messageMilestones: [
          { count: 10, code: "DRAGON_10", amount: "500đ" },
          { count: 100, code: "DRAGON_100", amount: "1.111đ" },
          { count: 500, code: "DRAGON_500", amount: "5.000đ" },
          { count: 1000, code: "DRAGON_1000", amount: "9.999đ" },
          { count: 1500, code: "DRAGON_1500", amount: "12.999đ" },
          { count: 2000, code: "DRAGON_2000", amount: "15.000đ" }
        ],
        lastResetYMD: defaultYMD
      };
      fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2), 'utf8');
      return defaultConfig;
    }
    const raw = fs.readFileSync(configFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("❌ Lỗi cấu hình config.json:", error.message);
    return { tokens: [], messageMilestones: [] };
  }
}

function writeConfig(config) {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
  } catch (error) {
    console.error("❌ Lỗi lưu cấu hình config.json:", error.message);
  }
}

// --- HỆ THỐNG CẤU HÌNH BOT (Đơn hoặc Cụm các Bots) ---
const config = readConfig();
const BOT_TOKENS = (config.tokens && config.tokens.length > 0) ? config.tokens : [
  "8812672402:AAHCrDOmem37MMn9x8o5MM_y0A49xksfjSU", // Thêm Bot token chính tại đây (hoặc cấu hình qua Web UI)
];

const tokens = BOT_TOKENS.filter(Boolean);

if (tokens.length === 0) {
  console.log("⚠️ Cảnh báo: Bạn chưa điền telegram bot token nào!");
  console.log("👉 Hãy cấu hình trực tiếp trên Web UI hoặc điền vào file config.json / bot.js để khởi chạy.");
}

// Khởi tạo cụm active bots từ danh sách token đã cấu hình
const activeBots = [];

tokens.forEach((token, index) => {
  try {
    const bot = new TelegramBot(token, { polling: true });
    activeBots.push(bot);
    console.log(`✅ Khởi động thành công Bot #${index + 1} (${token.substring(0, 8)}...)`);
  } catch (err) {
    console.error(`❌ Không thể khởi chạy Bot token #${index + 1}:`, err.message);
  }
});

// Sử dụng các bots để lắng nghe hội thoại chung, và thông báo kết quả


// --- CHỈ THAY ICON: GIỮ NGUYÊN LOGIC FILE TƯƠNG TÁC ---
const FIXED_CUSTOM_EMOJI_IDS = {
  "🐉":"5276032951342088188",
  "⚙️":"5424972470023104089",
  "⚙":"5447644880824181073",
  "⚠️":"5440539497383087970",
  "⚠":"5447203607294265305",
  "❌":"5453902265922376865",
  "✅":"5210956306952758910",
  "👉":"5427168083074628963",
  "🎁":"5449683594425410231",
  "🎉":"5447183459602669338",
  "🏆":"5217822164362739968",
  "💰":"5416117059207572332",
  "🔑":"5411225014148014586",
  "💬":"5406745015365943482",
  "👋":"5244837092042750681",
  "🌱":"5246762912428603768",
  "📊":"5361741454685256344",
  "1️⃣":"5406683434124859552",
  "2️⃣":"5386367538735104399",
  "3️⃣":"5397782960512444700",
  "🕵️":"5456230168261566428",
  "🛩️":"5456337168781810982",
  "🤖":"5456580414254619349",
  "📤":"5454390891466726015",
  "🧧":"5409048419211682843",
  "🔥":"5445355530111437729",
  "💎":"5443127283898405358",
  "📥":"5235640209852343235",
  "🎯":"5237759703198474072",
  "📌":"5238083517962793068",
  "⛔":"5461042021986737384",
  "🔒":"5237911156630232962",
  "🔓":"5240066289614987080",
  "✨":"5242195906199035850",
  "🍀":"5197371802136892976",
  "🎲":"5363938656874673963",
  "💥":"6332246446871418518",
  "🏦":"6332545917761098810",
  "🎫":"5224257782013769471",
  "🔢":"5456140674028019486",
  "🔗":"5210952531676504517",
  "📝":"5382194935057372936",
  "👑":"5276032951342088188",
  "⚔️":"5424972470023104089",
  "⚔":"5447644880824181073",
  "📅":"5440539497383087970",
  "🗓️":"5447203607294265305",
  "🗓":"5453902265922376865",
  "⬜":"5210956306952758910",
  "👥":"5427168083074628963",
  "💪":"5449683594425410231",
  "📋":"5447183459602669338",
  "🟦":"5217822164362739968",
  "🥇":"5416117059207572332",
  "🥈":"5411225014148014586",
  "🥉":"5406745015365943482",
  "💵":"5244837092042750681",
  "💸":"5246762912428603768",
  "🚀":"5361741454685256344",
  "⏰":"5406683434124859552",
  "💡":"5386367538735104399",
  "👤":"5397782960512444700"
};
function convertTextTo3D(value) {
  let text = String(value ?? "");
  const existing = [];
  text = text.replace(/<tg-emoji\b[^>]*>.*?<\/tg-emoji>/gs, (tag) => {
    existing.push(tag);
    return `__KEEP_CUSTOM_EMOJI_${existing.length - 1}__`;
  });
  for (const emoji of Object.keys(FIXED_CUSTOM_EMOJI_IDS).sort((a, b) => b.length - a.length)) {
    text = text.split(emoji).join(`<tg-emoji emoji-id="${FIXED_CUSTOM_EMOJI_IDS[emoji]}">${emoji}</tg-emoji>`);
  }
  return text.replace(/__KEEP_CUSTOM_EMOJI_(\d+)__/g, (_, i) => existing[Number(i)] || "");
}
function map3DReplyMarkup(markup) {
  if (!markup?.inline_keyboard) return markup;
  return {...markup, inline_keyboard: markup.inline_keyboard.map(row => row.map(button => {
    if (!button?.text) return button;
    const found = Object.keys(FIXED_CUSTOM_EMOJI_IDS).find(emoji => String(button.text).includes(emoji));
    return found ? {...button, text: String(button.text).split(found).join("").trim(), icon_custom_emoji_id: button.icon_custom_emoji_id || FIXED_CUSTOM_EMOJI_IDS[found]} : button;
  }))};
}
for (const bot of activeBots) {
  const originalSendMessage = bot.sendMessage.bind(bot);
  bot.sendMessage = (chatId, text, options = {}) => originalSendMessage(chatId, convertTextTo3D(text), {...options, parse_mode: "HTML", reply_markup: map3DReplyMarkup(options.reply_markup)});
}
let botUsername = "Dragon_CheckTT_Bot";

activeBots.forEach((bot, botIdx) => {
  bot.getMe().then(me => {
    console.log(`🤖 Đã đồng bộ bot #${botIdx + 1}: @${me.username}`);
    if (botIdx === 0) botUsername = me.username;
  }).catch(err => {
    console.error(`❌ Lỗi lấy thông tin bot #${botIdx + 1}:`, err.message);
  });
});

// --- HÀM KIỂM TRA RESET SAU 00H HẰNG NGÀY ---
function checkAndRunDailyReset() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const currentDateYMD = `${yyyy}-${mm}-${dd}`;

  const currentConfig = readConfig();
  if (!currentConfig.lastResetYMD) {
    currentConfig.lastResetYMD = currentDateYMD;
    writeConfig(currentConfig);
    return;
  }

  if (currentConfig.lastResetYMD !== currentDateYMD) {
    const users = readUserData();
    
    users.forEach(u => {
      u.msgCount = 0;         // Đặt tương tác hằng ngày về 0
      u.claimedCodes = [];    // Reset các mã thưởng để nhận lại vào ngày hôm sau
      u.claimedRewards = {};  // Reset danh sách phần thưởng đã phát trong ngày
      u.lastMsg = undefined;  // Reset chỉ số chống spam
    });

    writeUserData(users);

    currentConfig.lastResetYMD = currentDateYMD;
    writeConfig(currentConfig);

    console.log(`✨ [00h RESET SYSTEM] Phát hiện qua ngày mới (${currentConfig.lastResetYMD}). Đã tự động reset chỉ số tương tác về 0!`);
  }
}

// Chạy luồng kiểm tra reset định kỳ mỗi 10 giây
setInterval(checkAndRunDailyReset, 10000);

// --- ĐĂNG KÝ SỰ KIỆN LẮNG NGHE CHO TOÀN BỘ CÁN BỘ BOT TRONG CỤM ---
activeBots.forEach((bot, index) => {
  bot.on("message", async (msg) => {
    const text = msg.text?.trim();
    if (!text) return;

    const chatId = msg.chat.id;
    const userId = msg.from?.id ? msg.from.id.toString() : null;
    const senderName = msg.from?.username || msg.from?.first_name || 'Người chơi';

    if (!userId) return;

    // Quét sự kiện sang mới trước khi tính tương tác hằng ngày
    checkAndRunDailyReset();

    // 0. XỬ LÝ LỆNH /start (GIỚI THIỆU CÁC MỐC TƯƠNG TÁC - CHỈ DÙNG TRONG CHAT RIÊNG)
    if (/^\/start/i.test(text)) {
      if (msg.chat.type !== 'private') return; // Chỉ xử lý nếu là chat riêng tư

      console.log(`🤖 Nhận lệnh /start từ: ${senderName} (ID: ${userId})`);
      const currentConfig = readConfig();
      const milestones = (currentConfig.messageMilestones || []).sort((a, b) => a.count - b.count);
      
      let milestoneIntro = milestones.map(m => `🌱 <b>Mốc ${m.count} TT</b>  🎁 Quà tặng <b>${m.amount}</b>`).join('\n');

      const introTemplate = `👋 <b>Chào mừng bạn đến với Dragon Bot của Sòng Bài!</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━
Tôi là hệ thống Robot giám sát và tự động phát thưởng tương tác hằng ngày.

📊 <b>DANH SÁCH MỐC THƯỞNG HẰNG NGÀY:</b>
${milestoneIntro}

━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ <b>HƯỚNG DẪN HOẠT ĐỘNG:</b>
1️⃣ <b>Trò chuyện:</b> Tương tác tích cực trong nhóm sòng bài (Để chống spam, mỗi tin nhắn cách nhau tối thiểu <b>15 giây</b> mới được tính tương tác chất lượng).
2️⃣ <b>Nhận code:</b> Khi đủ mốc tương tác, bot sẽ tự động nhắn mật gửi riêng mã đổi lì xì cho bạn (Mã code có mã hóa UserID của bạn để tránh kẻ gian đánh cắp!).
3️⃣ <b>Tra cứu:</b> Có thể gõ lệnh <code>/checktt</code> tại đây hoặc tại nhóm bất kỳ lúc nào để tra cứu chỉ số.

🔑 <i>Hãy giữ cuộc trò chuyện này hoạt động (đăng ký bấm Start bot đầy đủ) để bot luôn inbox gửi code thành công cho bạn nhé! Chúc bạn thắng lớn!</i>`;

      bot.sendMessage(chatId, introTemplate, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Checktt Tại Đây", url: "https://t.me/Dragon_tuongtac1_bot" }
            ]
          ]
        }
      }).catch(err => {
        console.error("❌ Lỗi phản hồi /start:", err.message);
      });
      return;
    }

    // 0.1 XỬ LÝ LỆNH /help (MẪU MỚI THEO YÊU CẦU)
    if (/^\/help(@\w+)?$/i.test(text)) {
      // Xoá tin nhắn lệnh của người dùng
      bot.deleteMessage(chatId, msg.message_id).catch(() => {});

      const currentConfig = readConfig();
      const milestones = (currentConfig.messageMilestones || []).sort((a, b) => a.count - b.count);
      
      const usersList = readUserData();
      const activeUser = usersList.find(u => String(u.id) === String(userId)) || user;
      const userMsgCount = activeUser.msgCount || 0;

      let milestoneIntro = milestones.map(m => `• Đạt ${m.count.toLocaleString("vi-VN")} tin nhắn → Nhận ${m.amount}`).join('\n');

      const helpTemplate = `🎁 <b>HỆ THỐNG TẶNG CODE TỰ ĐỘNG:</b>

📊 <b>Thống kê tin nhắn của bạn hôm nay:</b>
👤 <b>User:</b> ${activeUser.name} (${userMsgCount.toLocaleString("vi-VN")} tin nhắn)

${milestoneIntro}

📊 <b>CÁC LỆNH THỐNG KÊ:</b>
• <code>/checktt</code> - Xem tổng tin nhắn hôm nay

📊 <b>CÁC LỆNH NÂNG CAO:</b>
• <code>/top</code> - Top 10 hôm nay`;

      bot.sendMessage(chatId, helpTemplate, { parse_mode: 'HTML' }).catch(err => {
        console.error("❌ Lỗi phản hồi /help:", err.message);
      });
      return;
    }

    // 1. CHẶN LỆNH /sd VÀ /sodu THEO YÊU CẦU ĐÃ GỠ BỎ
    if (/^\/(sd|sodu)(@\w+)?$/i.test(text)) {
      console.log(`⚠️ Nhận lệnh /sd từ: ${senderName}. Trạng thái: Lệnh này đã bị khoá.`);
      return;
    }

    // 2. TĂNG ĐIỂM TƯƠNG TÁC CHẤT LƯỢNG VÀ TỰ ĐỘNG PHÁT THƯỞNG CHO NGƯỜI ĐỦ MỐC
    const users = readUserData();
    let user = users.find(u => String(u.id) === String(userId));

    if (!user) {
      user = {
        id: userId,
        name: senderName,
        role: 'member',
        sd: 0,
        betWin: 0,
        betLose: 0,
        msgCount: 0,
        claimedCodes: [],
        claimedRewards: {}
      };
      users.push(user);
      writeUserData(users);
    } else {
      user.claimedRewards = user.claimedRewards || {};
      user.claimedCodes = user.claimedCodes || [];
      if (senderName && user.name !== senderName) {
        user.name = senderName; // Cập nhật tên mới nhất nếu người sử dụng đổi tên
      }
    }

    const now = Date.now();

    // Điều kiện chống spam: Mỗi tin nhắn cách ít nhất 15 giây mới tính điểm hoạt động.
    // Và không tính các tin khởi hành bằng ký tự "/"
    if (!text.startsWith('/')) {
      const isCooldowned = user.lastMsg && (now - user.lastMsg < 15000);
      
      if (!isCooldowned) {
        user.lastMsg = now;
        user.msgCount = (user.msgCount || 0) + 1;

        // KIỂM TRA MỐC TƯƠNG TÁC ĐỂ PHÁT THƯỞNG (CHỈ NGƯỜI ĐỦ MỐC ĐẠT ĐIỂM MỚI SINH ĐƯỢC CODE)
        const currentConfig = readConfig();
        const milestones = currentConfig.messageMilestones || [];
        const milestone = milestones.find(m => m.count === user.msgCount);

        if (milestone) {
          if (!user.claimedCodes.includes(milestone.count)) {
            user.claimedCodes.push(milestone.count);

            // Sinh mã thưởng duy nhất có đính kèm UserID của chính thành viên đó
            const uniqueCode = `${milestone.code}_${userId}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
            user.claimedRewards[milestone.count] = uniqueCode;

            const rewardTemplate = `🎁 <b>HỘP THƯ PHẦN THƯỞNG DRAGON BOT</b> 🎁
━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Chúc mừng <b>${user.name}</b>! Bạn đã đạt cột mốc tương tác tích cực hôm nay:

🏆 <b>Đạt cột mốc:</b> <code>${milestone.count} TT</code>
💰 <b>Trị giá giải thưởng:</b> <code>${milestone.amount}</code>
🔑 <b>MÃ CODE ĐỔI THƯỞNG CHÍNH CHỦ:</b> <code>${uniqueCode}</code>

👉 <i>Vui lòng nạp mã trên vào hệ thống để nhận lì xì tự động!</i>
💬 <i>Mã này đính kèm ID ${userId} của bạn, bảo toàn chỉ chính chủ bạn mới đổi thưởng thành công!</i>`;

            // Gửi tin nhắn riêng (Private Message Inbox) qua chat riêng tư
            bot.sendMessage(userId, rewardTemplate, { parse_mode: 'HTML' }).then(() => {
              console.log(`📤 Đã gửi mật mã Code thưởng mốc ${milestone.count} thành công cho ${user.name}`);
              
              // Phát thông báo công khai lên phòng chat nhóm (không lộ mã nạp lì xì)
              if (chatId !== userId) {
                const groupNotice = `🎉 Chúc mừng <b>${user.name}</b> đã cày cuốc xuất sắc đạt mốc <b>${milestone.count} tin nhắn</b>!
Quà tặng trị giá <b>${milestone.amount}</b> đã được gửi thẳng vào DM riêng của bạn rồi nhé. 🔥`;
                bot.sendMessage(chatId, groupNotice, {
                  parse_mode: 'HTML',
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: "Lấy Code Tại Đây", url: "https://t.me/Dragon_tuongtac1_bot" }
                      ]
                    ]
                  }
                }).catch(err => {
                  console.error("❌ Lỗi gửi thông báo nhóm:", err.message);
                });
              }
            }).catch(err => {
              console.error(`❌ Không gửi được tin nhắn riêng cho ${user.name} (Do chưa ấn Start bot):`, err.message);
              // Phản hồi dự phòng ngoài phòng nhóm để người chơi biết cần nhấn Start bot
              bot.sendMessage(chatId, `⚠️ <b>${user.name}</b> ơi! Bạn đã xuất sắc đạt mốc <b>${milestone.count} TT</b> nhưng bot chưa nhắn tin riêng được!\n👉 Vui lòng click vào nút <b>Checktt Tại Đây</b> dưới đây để mở chat bấm nút <b>Start/Bắt đầu</b>, sau đó kiểm tra mật thư nhé!`, {
                parse_mode: 'HTML',
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "Checktt Tại Đây", url: "https://t.me/Dragon_tuongtac1_bot" }
                    ]
                  ]
                }
              }).catch(e => {
                console.error("❌ Lỗi gửi tin nhắn fallback:", e.message);
              });
            });
          }
        }

        writeUserData(users);
      }
    }

    // 3. XỬ LÝ LỆNH /top (Hiển thị TOP 10 tương tác hằng ngày)
    if (/^\/top(@\w+)?$/i.test(text)) {
      // Xoá tin nhắn lệnh của người dùng
      bot.deleteMessage(chatId, msg.message_id).catch(() => {});

      const usersList = readUserData();
      const sortedUsers = [...usersList]
        .filter(u => (u.msgCount || 0) > 0)
        .sort((a, b) => (b.msgCount || 0) - (a.msgCount || 0))
        .slice(0, 10);

      const now = new Date();
      const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      const roomName = msg.chat.title || "Săn Game 🎁";
      
      let topList = "";
      let totalTop10Msg = 0;

      sortedUsers.forEach((u, idx) => {
        const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`;
        const name = u.name || "Người chơi";
        const count = u.msgCount || 0;
        totalTop10Msg += count;
        topList += `${medal} ${name} - ${count.toLocaleString("vi-VN")} tin\n`;
      });

      if (sortedUsers.length === 0) {
        topList = "Chưa có dữ liệu tương tác hôm nay.";
      }

      const topTemplate = `📋 <b>TOP 10 HÔM NAY</b>
📅 <b>Ngày:</b> ${todayStr}
👥 <b>Nhóm:</b> ${roomName}

${topList}
📊 <b>Tổng top 10:</b> ${totalTop10Msg.toLocaleString("vi-VN")} tin nhắn
💪 Gõ <code>/checktt</code> để xem tiến trình!`;

      bot.sendMessage(chatId, topTemplate, { parse_mode: 'HTML' }).catch(err => {
        console.error("❌ Lỗi gửi tin nhắn /top:", err.message);
      });
      return;
    }

    // 4. XỬ LÝ LỆNH TRUY VẤN TƯƠNG TÁC /checktt (Đã định dạng lại theo mẫu mới)
    if (/^\/checktt(@\w+)?$/i.test(text)) {
      // Xoá tin nhắn lệnh của người dùng
      bot.deleteMessage(chatId, msg.message_id).catch(() => {});

      const usersList = readUserData();
      const activeUser = usersList.find(u => String(u.id) === String(userId)) || user;
      const userMsgCount = activeUser.msgCount || 0;

      const currentConfig = readConfig();
      const milestones = (currentConfig.messageMilestones || []).sort((a, b) => a.count - b.count);
      
      const nextMilestoneObj = milestones.find(m => m.count > userMsgCount);
      const nextMilestone = nextMilestoneObj ? nextMilestoneObj.count : null;
      const rewardAmount = nextMilestoneObj ? nextMilestoneObj.amount : "N/A";

      // Tính toán thanh tiến trình
      let progressText = "";
      let percent = 0;
      let lackCount = 0;

      if (nextMilestone) {
        percent = Math.floor((userMsgCount / nextMilestone) * 100);
        lackCount = nextMilestone - userMsgCount;
        const filledBlocks = Math.floor(percent / 10);
        const emptyBlocks = 10 - filledBlocks;
        progressText = "🟦".repeat(filledBlocks) + "⬜".repeat(emptyBlocks);
      } else {
        percent = 100;
        progressText = "🟦".repeat(10);
      }

      // Lấy danh sách code đã nhận
      let claimedCodesText = "";
      const claimedRewards = activeUser.claimedRewards || {};
      const claimedMilestones = Object.keys(claimedRewards).map(Number).sort((a, b) => a - b);
      
      if (claimedMilestones.length > 0) {
        claimedCodesText = `\n🎁 <b>Code đã nhận hôm nay:</b>\n`;
        claimedMilestones.forEach(mCount => {
          const mInfo = milestones.find(m => m.count === mCount);
          const amount = mInfo ? mInfo.amount : "";
          const code = claimedRewards[mCount];
          claimedCodesText += `• ${mCount.toLocaleString("vi-VN")} tin: <code>${code}</code> (${amount})\n`;
        });
      }

      const responseTemplate = `👤 <b>TÀI KHOẢN:</b> ${activeUser.name}
📊 <b>Tương tác hôm nay:</b> ${userMsgCount.toLocaleString("vi-VN")} tin
🎯 <b>Mốc quà kế tiếp:</b> ${nextMilestone ? nextMilestone.toLocaleString("vi-VN") + " tin" : "Đã hoàn thành"}
🎁 <b>Phần thưởng:</b> ${rewardAmount}
🏆 <b>Tiến trình:</b>
${progressText} ${percent}%
${nextMilestone ? `📝 Còn thiếu ${lackCount.toLocaleString("vi-VN")} tin để đạt mốc.` : `👑 Bạn đã hoàn thành tất cả các mốc!`}
${claimedCodesText}
💡 Gõ <code>/help</code> để xem hướng dẫn chi tiết`;

      bot.sendMessage(chatId, responseTemplate, { parse_mode: 'HTML' }).catch(err => {
        console.error("❌ Lỗi gửi tin nhắn /checktt:", err.message);
      });
    }
  });
});

console.log("🚀 Hệ thống Telegram Custom Multibot đang sẵn sàng chạy nền!");
