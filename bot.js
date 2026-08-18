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
const emojiJsonFile = path.join(__dirname, 'emojis.json');

// Khởi tạo kho emoji nếu chưa có
if (!fs.existsSync(emojiJsonFile)) {
  const initialEmojis = [
    "5368324170671202286", "5449744934175517405", "5447644880824443408", "5445123521250598685", "5431445255622340798",
    "5312134546416752041", "5312134546416752042", "5312134546416752043", "5312134546416752044", "5312134546416752045",
    "5370624388485880757", "5370624388485880758", "5370624388485880759", "5370624388485880760", "5370624388485880761",
    "5431445255622340799", "5431445255622340800", "5431445255622340801", "5431445255622340802", "5431445255622340803",
    "5215286576891894386", "5215286576891894387", "5215286576891894388", "5215286576891894389", "5215286576891894390"
  ];
  fs.writeFileSync(emojiJsonFile, JSON.stringify(initialEmojis));
}

function saveEmoji(id) {
  try {
    let emojis = [];
    if (fs.existsSync(emojiJsonFile)) {
      emojis = JSON.parse(fs.readFileSync(emojiJsonFile, 'utf8'));
    }
    if (!emojis.includes(id)) {
      emojis.push(id);
      fs.writeFileSync(emojiJsonFile, JSON.stringify(emojis, null, 2), 'utf8');
      return true;
    }
  } catch (e) {
    console.error("Lỗi lưu emoji:", e);
  }
  return false;
}

function getRandom3DEmoji() {
  try {
    if (fs.existsSync(emojiJsonFile)) {
      const emojis = JSON.parse(fs.readFileSync(emojiJsonFile, 'utf8'));
      if (emojis.length > 0) {
        const id = emojis[Math.floor(Math.random() * emojis.length)];
        return `<tg-emoji emoji-id="${id}">✨</tg-emoji>`;
      }
    }
  } catch (e) {}
  return "✨";
}

const ADMIN_ID = "8691091149"; // Thay ID Admin của bạn vào đây
function isAdminUser(id) {
  return String(id) === ADMIN_ID || String(id) === "8936805776";
}


const userFilePath = path.join(__dirname, 'user.json');
const configFilePath = path.join(__dirname, 'config.json');
const roomFilePath = path.join(__dirname, 'rooms.json');

const PROMOTION_MESSAGE = `${getRandom3DEmoji()} NHẬN CODE FREE ${getRandom3DEmoji()}`

🕵️ Tương tác đủ mốc là nhận code ngay - trị giá đến 22.222đ
🕵️ Đơn giản vậy thôi, còn chờ gì nữa?

🛩 /help - Xem chi tiết chương trình
🛩 /checktt - Kiểm tra tương tác của bạn`;

function readRoomIds() {
  try {
    if (!fs.existsSync(roomFilePath)) {
      fs.writeFileSync(roomFilePath, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(roomFilePath, 'utf8');
    const rooms = JSON.parse(raw);
    return Array.isArray(rooms) ? rooms.map(String) : [];
  } catch (error) {
    console.error("❌ Lỗi đọc file rooms.json:", error.message);
    return [];
  }
}

function writeRoomIds(roomIds) {
  try {
    fs.writeFileSync(roomFilePath, JSON.stringify([...new Set(roomIds)], null, 2), 'utf8');
  } catch (error) {
    console.error("❌ Lỗi lưu file rooms.json:", error.message);
  }
}

function rememberRoom(chat) {
  if (!chat || !['group', 'supergroup'].includes(chat.type)) return;
  const roomIds = readRoomIds();
  const roomId = String(chat.id);
  if (!roomIds.includes(roomId)) {
    roomIds.push(roomId);
    writeRoomIds(roomIds);
    console.log(`✅ Đã ghi nhận room: ${chat.title || roomId}`);
  }
}

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

// Tự động gửi thông báo chương trình vào các room đã từng tương tác với bot mỗi 4 phút.
// Chỉ bot đầu tiên trong cụm gửi để tránh gửi trùng khi chạy nhiều bot.
const PROMOTION_INTERVAL_MS = 4 * 60 * 1000;
setInterval(() => {
  const senderBot = activeBots[0];
  if (!senderBot) return;

  const roomIds = readRoomIds();
  roomIds.forEach(roomId => {
    senderBot.sendMessage(roomId, PROMOTION_MESSAGE, { disable_web_page_preview: true })
      .then(() => console.log(`📣 Đã gửi thông báo nhận code vào room ${roomId}`))
      .catch(error => {
        console.error(`❌ Không gửi được thông báo vào room ${roomId}:`, error.message);
        if (/chat not found|bot was kicked|forbidden|not enough rights/i.test(error.message || '')) {
          writeRoomIds(readRoomIds().filter(id => id !== String(roomId)));
        }
      });
  });
}, PROMOTION_INTERVAL_MS);

// --- ĐĂNG KÝ SỰ KIỆN LẮNG NGHE CHO TOÀN BỘ CÁN BỘ BOT TRONG CỤM ---
activeBots.forEach((bot, index) => {
  bot.on("message", async (msg) => {
    const text = msg.text?.trim();
    if (!text) return;

    const chatId = msg.chat.id;
    rememberRoom(msg.chat);
    const userId = msg.from?.id ? msg.from.id.toString() : null;
    const senderName = msg.from?.username || msg.from?.first_name || 'Người chơi';
    // Tự động săn ID Icon 3D Premium
    if (msg.entities) {
      const customEmojis = msg.entities.filter(e => e.type === 'custom_emoji');
      if (customEmojis.length > 0) {
        let report = `💎 <b>PHÁT HIỆN ICON 3D MỚI</b> 💎\n\n`;
        let foundNew = false;
        customEmojis.forEach(e => {
          if (e.custom_emoji_id) {
            const isNew = saveEmoji(e.custom_emoji_id);
            if (isNew) foundNew = true;
            report += `• Icon: <tg-emoji emoji-id="${e.custom_emoji_id}">✨</tg-emoji> | ID: <code>${e.custom_emoji_id}</code>${isNew ? ' (Đã lưu)' : ''}\n`;
          }
        });
        if (foundNew && index === 0) {
          activeBots[0].sendMessage(ADMIN_ID, report, { parse_mode: "HTML" }).catch(() => {});
        }
      }
    }

    // 3D Premium Icons Trigger (Admin only)
    if (isAdminUser(userId) && text === "⚡") {
      const premiumIconsMsg = `${getRandom3DEmoji()} <b>DANH SÁCH ICON 3D PREMIUM</b> ${getRandom3DEmoji()}\n\n` +
        `<tg-emoji emoji-id="5368324170671202286">🏆</tg-emoji> ` +
        `<tg-emoji emoji-id="5449744934175517405">🎲</tg-emoji> ` +
        `<tg-emoji emoji-id="5447644880824443408">💰</tg-emoji> ` +
        `<tg-emoji emoji-id="5445123521250598685">🔥</tg-emoji> ` +
        `<tg-emoji emoji-id="5431445255622340798">🎁</tg-emoji>\n\n` +
        `✨ <i>Bot đã sẵn sàng phục vụ!</i> ✨`;
      
      bot.sendMessage(chatId, premiumIconsMsg, { parse_mode: "HTML" }).catch(() => {});
      return;
    }


    if (!userId) return;

    // Tự động xoá tin nhắn người chơi trong room nếu có link hoặc ký tự @.
    // Các lệnh hệ thống như /help và /checktt được giữ lại để bot vẫn hoạt động bình thường.
    const isRoom = ['group', 'supergroup'].includes(msg.chat.type);
    const isSystemCommand = text.startsWith('/');
    const containsLink = /(?:https?:\/\/|www\.|t\.me\/|telegram\.me\/|(?:^|\s)(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/\S*)?)/i.test(text);
    const containsAtMention = /@[\p{L}\p{N}_]{1,}/u.test(text);

    if (isRoom && !isSystemCommand && (containsLink || containsAtMention)) {
      bot.deleteMessage(chatId, msg.message_id)
        .then(() => console.log(`🧹 Đã xoá tin nhắn chứa link/@ của ${senderName} trong room ${chatId}`))
        .catch(error => console.error(`❌ Không thể xoá tin nhắn trong room ${chatId}:`, error.message));
      return;
    }

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
      const activeUser = usersList.find(u => String(u.id) === String(userId)) || {
        name: senderName,
        msgCount: 0
      };
      const userMsgCount = activeUser.msgCount || 0;

      let milestoneIntro = milestones.map(m => `• Đạt ${m.count.toLocaleString("vi-VN")} tin nhắn → Nhận ${m.amount}`).join('\n');

      const helpTemplate = `${getRandom3DEmoji()} <b>HỆ THỐNG TẶNG CODE TỰ ĐỘNG:</b>`

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
