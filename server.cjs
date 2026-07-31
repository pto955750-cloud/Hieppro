var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  CANCUA_LIMIT: () => CANCUA_LIMIT,
  DAILY_STREAK_MIN: () => DAILY_STREAK_MIN,
  DAILY_STREAK_PRIZES: () => DAILY_STREAK_PRIZES,
  DEPOSIT_ACCOUNT_NAME: () => DEPOSIT_ACCOUNT_NAME,
  DEPOSIT_ACCOUNT_NO: () => DEPOSIT_ACCOUNT_NO,
  DEPOSIT_BANK_CODE: () => DEPOSIT_BANK_CODE,
  DEPOSIT_BANK_NAME: () => DEPOSIT_BANK_NAME,
  DEPOSIT_ORDER_COOLDOWN_SECONDS: () => DEPOSIT_ORDER_COOLDOWN_SECONDS,
  EVENT_DAILY_MIN_DEPOSIT: () => EVENT_DAILY_MIN_DEPOSIT,
  EVENT_KEYWORD: () => EVENT_KEYWORD,
  EVENT_REWARD_GIFTCODE_VALUE: () => EVENT_REWARD_GIFTCODE_VALUE,
  EVENT_STREAK_TARGET_DAYS: () => EVENT_STREAK_TARGET_DAYS,
  HOURLY_ROOM_GIFTCODE_VALUE: () => HOURLY_ROOM_GIFTCODE_VALUE,
  SESSION_LIMIT: () => SESSION_LIMIT,
  SOLO_MIN_BET: () => SOLO_MIN_BET,
  SOLO_PAYOUT_RATE: () => SOLO_PAYOUT_RATE,
  SOLO_ROLL_TIMEOUT_MS: () => SOLO_ROLL_TIMEOUT_MS,
  TELEGRAM_XX_MAX_BET: () => TELEGRAM_XX_MAX_BET,
  TELEGRAM_XX_MIN_BET: () => TELEGRAM_XX_MIN_BET,
  TELEGRAM_XX_PAYOUT_RATE: () => TELEGRAM_XX_PAYOUT_RATE,
  VIP_TIERS: () => VIP_TIERS,
  addDepositToUser: () => addDepositToUser,
  adminId: () => adminId,
  adminn: () => adminn,
  applyVipPointFromBet: () => applyVipPointFromBet,
  awardReferralCommission: () => awardReferralCommission,
  banJsonFile: () => banJsonFile,
  bot1: () => bot1,
  bot2: () => bot2,
  bot3: () => bot3,
  bot4: () => bot4,
  bot5: () => bot5,
  botErrors: () => botErrors,
  botUsernames: () => botUsernames,
  bots: () => bots,
  buildDailyStreakLeaderboard: () => buildDailyStreakLeaderboard,
  buildDepositQrImageUrl: () => buildDepositQrImageUrl,
  buildReferralDeepLink: () => buildReferralDeepLink,
  buildSoloRoomDeepLink: () => buildSoloRoomDeepLink,
  caiTimeout: () => caiTimeout,
  checkAndResetUserBets: () => checkAndResetUserBets,
  checkSpecialRoll: () => checkSpecialRoll,
  clearSoloRoomPin: () => clearSoloRoomPin,
  compareSoloRolls: () => compareSoloRolls,
  createGiftcodeRecord: () => createGiftcodeRecord,
  createManualDepositRequest: () => createManualDepositRequest,
  currentCai: () => currentCai,
  distributePotToWinners: () => distributePotToWinners,
  ensureRandomHourlyGiftSchedule: () => ensureRandomHourlyGiftSchedule,
  finalizeSoloRoom: () => finalizeSoloRoom,
  formatDailyStreakTopRoomMessage: () => formatDailyStreakTopRoomMessage,
  formatDepositOrderCaption: () => formatDepositOrderCaption,
  formatGameCatalogMessage: () => formatGameCatalogMessage,
  formatMaskedId: () => formatMaskedId,
  formatRoomBotMessage: () => formatRoomBotMessage,
  formatRoomDefaultGuideMessage: () => formatRoomDefaultGuideMessage,
  formatSoloLobbyMessage: () => formatSoloLobbyMessage,
  formatSoloOpenRooms: () => formatSoloOpenRooms,
  formatSoloPinnedRoomMessage: () => formatSoloPinnedRoomMessage,
  formatSoloRollPrompt: () => formatSoloRollPrompt,
  formatSoloRoomAnnouncement: () => formatSoloRoomAnnouncement,
  formatTelegramXXGuideMessage: () => formatTelegramXXGuideMessage,
  formatUserCheckMessage: () => formatUserCheckMessage,
  formatVipGuideMessage: () => formatVipGuideMessage,
  gameRoomLink: () => gameRoomLink,
  generateAutoRewardGiftCode: () => generateAutoRewardGiftCode,
  generateGiftCode: () => generateGiftCode,
  generateRandomSuffix: () => generateRandomSuffix,
  generateSoloRoomCode: () => generateSoloRoomCode,
  generateUniqueGiftCode: () => generateUniqueGiftCode,
  getDepositItemDateKey: () => getDepositItemDateKey,
  getDepositOrderCooldownRemainingSeconds: () => getDepositOrderCooldownRemainingSeconds,
  getDuaTopReplyMarkup: () => getDuaTopReplyMarkup,
  getGameCatalogReplyMarkup: () => getGameCatalogReplyMarkup,
  getLatestCompletedPhien: () => getLatestCompletedPhien,
  getMainMenuReplyMarkup: () => getMainMenuReplyMarkup,
  getOpenSoloRooms: () => getOpenSoloRooms,
  getSoloRollReplyMarkup: () => getSoloRollReplyMarkup,
  getTelegramXXLabel: () => getTelegramXXLabel,
  getUserActiveBetGame: () => getUserActiveBetGame,
  getUserActiveStreakCounts: () => getUserActiveStreakCounts,
  getUserBalance: () => getUserBalance,
  getUserQualifiedStreak: () => getUserQualifiedStreak,
  getUserStreakStatusText: () => getUserStreakStatusText,
  getUserSuccessfulDepositTotalOnDate: () => getUserSuccessfulDepositTotalOnDate,
  getVNDateKey: () => getVNDateKey,
  getVipBadge: () => getVipBadge,
  getVipExchangeRate: () => getVipExchangeRate,
  getVipLevel: () => getVipLevel,
  getVipPoints: () => getVipPoints,
  getVipRedeemablePoints: () => getVipRedeemablePoints,
  getVipRoomBadgePrefix: () => getVipRoomBadgePrefix,
  getVipTierInfo: () => getVipTierInfo,
  getWelcomeStartCaption: () => getWelcomeStartCaption,
  giftJsonFile: () => giftJsonFile,
  groupt: () => groupt,
  handlePot: () => handlePot,
  handleSoloRollAction: () => handleSoloRollAction,
  hasUserSuccessfulDepositInLastDays: () => hasUserSuccessfulDepositInLastDays,
  hourlyGiftStateJsonFile: () => hourlyGiftStateJsonFile,
  initJsonFiles: () => initJsonFiles,
  isAdminGroupChat: () => isAdminGroupChat,
  isAdminUser: () => isAdminUser,
  isBanned: () => isBanned,
  isGameRoomChat: () => isGameRoomChat,
  isNoviceUnlocked: () => isNoviceUnlocked,
  isSuccessfulDepositStatus: () => isSuccessfulDepositStatus,
  isTelegramNameQualified: () => isTelegramNameQualified,
  isTelegramXXBetType: () => isTelegramXXBetType,
  isTelegramXXWin: () => isTelegramXXWin,
  isTokenValid: () => isTokenValid,
  lockGroupChat: () => lockGroupChat,
  maybeDispatchRandomHourlyGiftCode: () => maybeDispatchRandomHourlyGiftCode,
  normalizeMoneyNumber: () => normalizeMoneyNumber,
  parseBetText: () => parseBetText,
  phienJsFile: () => phienJsFile,
  pinGroupMessageWithResilience: () => pinGroupMessageWithResilience,
  processSoloRoomTimeouts: () => processSoloRoomTimeouts,
  readJson: () => readJson,
  readSoloRooms: () => readSoloRooms,
  registerAllBotCommands: () => registerAllBotCommands,
  removePinnedSoloRoomMessage: () => removePinnedSoloRoomMessage,
  resetBettingSession: () => resetBettingSession,
  resetUserDailyStreaks: () => resetUserDailyStreaks,
  rollSoloBattleResult: () => rollSoloBattleResult,
  rollSoloDiceSet: () => rollSoloDiceSet,
  savePhien: () => savePhien,
  sendAndPinToAdminGroup: () => sendAndPinToAdminGroup,
  sendAndPinToGameRoom: () => sendAndPinToGameRoom,
  sendDice: () => sendDice,
  sendMessageToAdminGroup: () => sendMessageToAdminGroup,
  sendMessageToRoom: () => sendMessageToRoom,
  sendResilientReply: () => sendResilientReply,
  sendSoloReply: () => sendSoloReply,
  sendSoloRoomAnnouncement: () => sendSoloRoomAnnouncement,
  sendSoloTelegramDice: () => sendSoloTelegramDice,
  sendWelcomeStartMessage: () => sendWelcomeStartMessage,
  setUserBalance: () => setUserBalance,
  soloRoomsJsonFile: () => soloRoomsJsonFile,
  state: () => state,
  thongkeJsonFile: () => thongkeJsonFile,
  tickGameLoop: () => tickGameLoop,
  toBoldDigits: () => toBoldDigits,
  tokenBot1: () => tokenBot1,
  tokenBot2: () => tokenBot2,
  tokenBot3: () => tokenBot3,
  tokenBot4: () => tokenBot4,
  tokenBot5: () => tokenBot5,
  unlockGroupChat: () => unlockGroupChat,
  unpinFromAdminGroup: () => unpinFromAdminGroup,
  unpinFromGameRoom: () => unpinFromGameRoom,
  updateUserStreakAfterRound: () => updateUserStreakAfterRound,
  userJsonFile: () => userJsonFile,
  vatphamJsonFile: () => vatphamJsonFile,
  waitingCai: () => waitingCai,
  welcomeStartImagePath: () => welcomeStartImagePath,
  writeJson: () => writeJson,
  writeSoloRooms: () => writeSoloRooms
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_adm_zip = __toESM(require("adm-zip"), 1);
var import_moment_timezone = __toESM(require("moment-timezone"), 1);
var import_node_telegram_bot_api = __toESM(require("node-telegram-bot-api"), 1);
var userJsonFile = "user.json";
var giftJsonFile = "gift.json";
var banJsonFile = "ban.json";
var vatphamJsonFile = "vatpham.json";
var thongkeJsonFile = "thongke.json";
var phienJsFile = "phien.js";
var soloRoomsJsonFile = "solo_rooms.json";
var hourlyGiftStateJsonFile = "hourly_gift_state.json";
var adminn = process.env.ADMIN_GROUP || "-1003933306407";
var groupt = process.env.GAME_GROUP || "-1003928586317";
var gameRoomLink = process.env.GAME_ROOM_LINK || "https://t.me/dragonnroom";
var SESSION_LIMIT = 1e7;
var CANCUA_LIMIT = 5e6;
var DAILY_STREAK_MIN = 4;
var DAILY_STREAK_PRIZES = [2e4, 1e4, 5e3];
var SOLO_MIN_BET = 2e3;
var SOLO_PAYOUT_RATE = 1.9;
var SOLO_ROLL_TIMEOUT_MS = 5 * 60 * 1e3;
var TELEGRAM_XX_MIN_BET = 2e3;
var TELEGRAM_XX_MAX_BET = 199e3;
var TELEGRAM_XX_PAYOUT_RATE = 1.88;
var HOURLY_ROOM_GIFTCODE_VALUE = 1111;
var EVENT_KEYWORD = "Dragon.Room";
var EVENT_DAILY_MIN_DEPOSIT = 3e4;
var EVENT_STREAK_TARGET_DAYS = 7;
var EVENT_REWARD_GIFTCODE_VALUE = 2e4;
var welcomeStartImagePath = process.env.WELCOME_START_IMAGE_PATH || import_path.default.resolve(process.cwd(), "welcome-start.jpg");
var adminId = [8691091149, 5846170183];
if (process.env.ADMIN_ID) {
  process.env.ADMIN_ID.split(",").forEach((id) => {
    const num = parseInt(id.trim(), 10);
    if (!isNaN(num) && !adminId.includes(num)) adminId.push(num);
  });
}
var isAdminUser = (userId) => !!userId && adminId.includes(userId);
var isNoviceUnlocked = (user) => (user?.nap || 0) >= 2e4;
var isAdminGroupChat = (chatId) => chatId !== void 0 && String(chatId) === String(adminn);
var isGameRoomChat = (chatId) => chatId !== void 0 && String(chatId) === String(groupt);
function resetUserDailyStreaks(user, resetDate = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD")) {
  user.currentWinStreak = 0;
  user.currentLossStreak = 0;
  user.bestWinStreakToday = 0;
  user.bestLossStreakToday = 0;
  user.lastStreakPhien = 0;
  user.lastStreakResetDate = resetDate;
}
function getLatestCompletedPhien() {
  if (state.gamePhase === "REVEALING") return state.phien;
  return Math.max(0, state.phien - 1);
}
function getUserActiveStreakCounts(user, latestCompletedPhien = getLatestCompletedPhien()) {
  const isContinuous = Number(user?.lastStreakPhien || 0) === Number(latestCompletedPhien || 0);
  return {
    win: isContinuous ? Number(user?.currentWinStreak || 0) : 0,
    loss: isContinuous ? Number(user?.currentLossStreak || 0) : 0
  };
}
function getUserQualifiedStreak(user, targetDay, latestCompletedPhien = getLatestCompletedPhien()) {
  if (!user || user.lastStreakResetDate !== targetDay) return null;
  const { win, loss } = getUserActiveStreakCounts(user, latestCompletedPhien);
  if (win < DAILY_STREAK_MIN && loss < DAILY_STREAK_MIN) return null;
  if (win >= loss) {
    return { type: "win", count: win, label: "D\xE2y th\u1EAFng" };
  }
  return { type: "loss", count: loss, label: "D\xE2y thua" };
}
function getUserStreakStatusText(user, latestCompletedPhien = getLatestCompletedPhien()) {
  const { win, loss } = getUserActiveStreakCounts(user, latestCompletedPhien);
  if (win >= DAILY_STREAK_MIN) return `D\xE2y th\u1EAFng ${win} phi\xEAn`;
  if (loss >= DAILY_STREAK_MIN) return `D\xE2y thua ${loss} phi\xEAn`;
  if (win > 0) return `\u0110ang th\u1EAFng ${win} phi\xEAn (t\u1EEB ${DAILY_STREAK_MIN} phi\xEAn m\u1EDBi t\xEDnh BXH)`;
  if (loss > 0) return `\u0110ang thua ${loss} phi\xEAn (t\u1EEB ${DAILY_STREAK_MIN} phi\xEAn m\u1EDBi t\xEDnh BXH)`;
  return `Ch\u01B0a c\xF3 d\xE2y h\u1EE3p l\u1EC7`;
}
function buildDailyStreakLeaderboard(users, targetDay, latestCompletedPhien = getLatestCompletedPhien()) {
  return users.map((user) => {
    const streak = getUserQualifiedStreak(user, targetDay, latestCompletedPhien);
    if (!streak) return null;
    return { user, streak };
  }).filter(Boolean).sort(
    (a, b) => b.streak.count - a.streak.count || (b.user.cuocHomNay || 0) - (a.user.cuocHomNay || 0) || (b.user.cuoc || 0) - (a.user.cuoc || 0)
  );
}
function formatRoomBotMessage(text) {
  const content = String(text || "").trim();
  if (!content) return `<b>Th\xF4ng b\xE1o tr\u1ED1ng</b>`;
  if (content.startsWith("<b>") && content.endsWith("</b>")) return content;
  return `<b>${content}</b>`;
}
function formatDailyStreakTopRoomMessage(users, type, requesterId) {
  const todayStr = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
  const latestCompletedPhien = getLatestCompletedPhien();
  const fullLeaderboard = buildDailyStreakLeaderboard(users, todayStr, latestCompletedPhien).filter((entry) => entry?.streak?.type === type);
  const filtered = fullLeaderboard.slice(0, 3);
  const title = type === "win" ? "TOP D\xC2Y TH\u1EAENG H\xD4M NAY" : "TOP D\xC2Y THUA H\xD4M NAY";
  const label = type === "win" ? "D\xE2y th\u1EAFng" : "D\xE2y thua";
  const requesterRank = requesterId !== void 0 ? fullLeaderboard.findIndex((entry) => String(entry?.user?.id || "") === String(requesterId)) : -1;
  if (filtered.length === 0) {
    return `\u{1F3C6} ${title}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
Ch\u01B0a c\xF3 ng\u01B0\u1EDDi ch\u01A1i n\xE0o v\xE0o TOP 1-2-3 ${label.toLowerCase()} t\u1EEB ${DAILY_STREAK_MIN} phi\xEAn li\xEAn ti\u1EBFp.
\u{1F4CD} B\u1EA1n hi\u1EC7n ch\u01B0a c\xF3 h\u1EA1ng trong BXH n\xE0y.`;
  }
  let response = `\u{1F3C6} ${title}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
`;
  filtered.forEach((entry, idx) => {
    const u = entry.user || {};
    const streak = entry.streak || {};
    const medal = idx === 0 ? "\u{1F947}" : idx === 1 ? "\u{1F948}" : "\u{1F949}";
    const name = u.name || `User****${String(u.id || "").slice(-4)}`;
    response += `${medal} TOP ${idx + 1}: ${name} | ${label}: ${streak.count || 0} phi\xEAn
`;
  });
  if (requesterRank >= 0) {
    const requesterEntry = fullLeaderboard[requesterRank];
    response += `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F4CD} B\u1EA1n \u0111ang \u0111\u1EE9ng TOP ${requesterRank + 1} | ${label}: ${requesterEntry?.streak?.count || 0} phi\xEAn`;
  } else {
    response += `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F4CD} B\u1EA1n hi\u1EC7n ch\u01B0a c\xF3 h\u1EA1ng trong BXH n\xE0y`;
  }
  return response.trim();
}
function generateAutoRewardGiftCode(existingCodes, topIndex) {
  let code = "";
  do {
    code = `TOP${topIndex}${generateRandomSuffix()}`;
  } while (existingCodes.has(code));
  existingCodes.add(code);
  return code;
}
function updateUserStreakAfterRound(user, settledPhien, net) {
  const todayStr = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
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
function formatUserCheckMessage(u) {
  const isUnlocked = isNoviceUnlocked(u);
  const vipInfo = getVipTierInfo(u);
  const redeemablePoints = getVipRedeemablePoints(u);
  const balance = Math.floor(u.sd !== void 0 ? u.sd : u.money || 0);
  return `\u{1F464} <b>USER CHECK:</b>
\u{1F194} ID: <code>${u.id}</code>
\u{1F464} T\xEAn: <b>${u.name || "N/A"}</b>
\u{1F4B5} S\u1ED1 d\u01B0: <b>${balance.toLocaleString("vi-VN")} xu</b>
\u{1F451} VIP: <b>${getVipLevel(u)} ${vipInfo.badge} (${vipInfo.name})</b>
\u{1F680} \u0110i\u1EC3m VIP: <b>${vipInfo.points.toLocaleString("vi-VN")}/${vipInfo.nextThresholdPoints.toLocaleString("vi-VN")}</b>
\u{1F590}\uFE0F \u0110i\u1EC3m VIP c\xF3 th\u1EC3 \u0111\u1ED5i: <b>${redeemablePoints.toLocaleString("vi-VN")}</b>
\u{1F3AF} Doanh s\u1ED1 c\u01B0\u1EE3c: <b>${(u.cuoc || 0).toLocaleString("vi-VN")} xu</b>
\u{1F4E5} T\u1ED5ng n\u1EA1p: <b>${(u.nap || 0).toLocaleString("vi-VN")} xu</b>
\u{1F4E4} T\u1ED5ng r\xFAt: <b>${(u.rut || 0).toLocaleString("vi-VN")} xu</b>
\u{1F504} V\xF2ng c\u01B0\u1EE3c c\xF2n l\u1EA1i: <b>${Math.ceil(u.vongCuoc || 0).toLocaleString("vi-VN")} xu</b>
\u{1F525} D\xE2y hi\u1EC7n t\u1EA1i: <b>${getUserStreakStatusText(u)}</b>
\u{1F530} T\xE2n Th\u1EE7: <b>${isUnlocked ? "\u0110\xE3 m\u1EDF kh\xF3a \u2705" : `Ch\u01B0a m\u1EDF kh\xF3a \u274C (${(u.nap || 0).toLocaleString("vi-VN")}/20.000 xu)`}</b>`;
}
var waitingCai = { value: false };
var currentCai = { value: null };
var caiTimeout = { value: null };
var state = {
  phien: 1e3,
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
  userBetsTX: {},
  userBetsCL: {},
  userBetsXien: {},
  userBetsDice: {},
  userBetsSum: {},
  betsLog: [],
  chatLocked: false,
  isProcessing: false,
  canReceiveCommand: true,
  phienAnnounced: false,
  isExtension: false,
  forceNextPotExplosion: false,
  autoPotRate: 0,
  lessBetWinsRate: 80
};
var readJson = (file, def = "[]") => {
  if (!import_fs.default.existsSync(file)) import_fs.default.writeFileSync(file, def, "utf8");
  try {
    return JSON.parse(import_fs.default.readFileSync(file, "utf8"));
  } catch {
    return JSON.parse(def);
  }
};
var writeJson = (file, obj) => {
  import_fs.default.writeFileSync(file, JSON.stringify(obj, null, 2), "utf8");
};
function addDepositToUser(user, amount) {
  const totalNapBefore = user.nap || 0;
  const isAlreadyUnlocked = totalNapBefore >= 2e4;
  let baseResetOccurred = false;
  if (!isAlreadyUnlocked) {
    user.sd = 0;
    if (user.money !== void 0) user.money = 0;
    baseResetOccurred = true;
  }
  user.sd = (user.sd || 0) + amount;
  if (user.money !== void 0) user.money = (user.money || 0) + amount;
  user.nap = (user.nap || 0) + amount;
  user.vongCuoc = (user.vongCuoc || 0) + amount;
  const totalNapAfter = user.nap;
  const newlyUnlocked = !isAlreadyUnlocked && totalNapAfter >= 2e4;
  return {
    baseResetOccurred,
    newlyUnlocked,
    totalNapBefore,
    totalNapAfter
  };
}
function createManualDepositRequest(user, userId, amount) {
  const now = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh");
  const time = now.format("YYYY-MM-DD HH:mm:ss");
  const requestId = `${(0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("HHmmss")}${Math.floor(100 + Math.random() * 900)}`;
  const content = `MUA ${userId}`;
  if (!user.depositHistory) user.depositHistory = [];
  user.depositHistory.unshift({
    time,
    createdAt: time,
    amount: amount.toLocaleString("vi-VN"),
    status: "Ch\u1EDD chuy\u1EC3n kho\u1EA3n",
    transferContent: content,
    expiresAt: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
    requestId,
    adminNotified: false
  });
  return { time, content, requestId };
}
var DEPOSIT_ORDER_COOLDOWN_SECONDS = 150;
function getDepositOrderCooldownRemainingSeconds(user) {
  const latestDepositOrder = Array.isArray(user?.depositHistory) && user.depositHistory.length > 0 ? user.depositHistory[0] : null;
  if (!latestDepositOrder) return 0;
  if (!latestDepositOrder.requestId) return 0;
  const currentStatus = String(latestDepositOrder.status || "").trim();
  const isPendingDepositOrder = currentStatus === "Ch\u1EDD chuy\u1EC3n kho\u1EA3n" || currentStatus === "Ch\u1EDD ki\u1EC3m tra";
  if (!isPendingDepositOrder) return 0;
  const createdAtText = latestDepositOrder.createdAt || latestDepositOrder.time || (latestDepositOrder.expiresAt ? import_moment_timezone.default.tz(latestDepositOrder.expiresAt, "Asia/Ho_Chi_Minh").subtract(10, "minutes").format("YYYY-MM-DD HH:mm:ss") : "");
  if (!createdAtText) return 0;
  const createdAt = import_moment_timezone.default.tz(createdAtText, "YYYY-MM-DD HH:mm:ss", "Asia/Ho_Chi_Minh");
  if (!createdAt.isValid()) return 0;
  const elapsedSeconds = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").diff(createdAt, "seconds");
  return Math.max(0, DEPOSIT_ORDER_COOLDOWN_SECONDS - elapsedSeconds);
}
var DEPOSIT_BANK_CODE = "TCB";
var DEPOSIT_BANK_NAME = "Techcombank";
var DEPOSIT_ACCOUNT_NO = "1667123456789";
var DEPOSIT_ACCOUNT_NAME = "BUI PHAM ANH THY";
function buildDepositQrImageUrl(amount, content) {
  const accountName = encodeURIComponent(DEPOSIT_ACCOUNT_NAME);
  const addInfo = encodeURIComponent(content);
  return `https://img.vietqr.io/image/${DEPOSIT_BANK_CODE}-${DEPOSIT_ACCOUNT_NO}-qr_only.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
}
function formatDepositOrderCaption(amount, content) {
  return `\u{1F4CC} <b>L\u1EC7nh n\u1EA1p ${amount.toLocaleString("vi-VN")} \u0111\xE3 t\u1EA1o.</b>

\u{1F3E6} <b>Ng\xE2n h\xE0ng:</b> ${DEPOSIT_BANK_NAME}
\u{1F4B3} <b>S\u1ED1 TK:</b> <code>${DEPOSIT_ACCOUNT_NO}</code>
\u{1F464} <b>Ch\u1EE7 TK:</b> <b>${DEPOSIT_ACCOUNT_NAME}</b>
\u{1F4B0} <b>S\u1ED1 ti\u1EC1n:</b> <b>${amount.toLocaleString("vi-VN")}</b>
\u{1F4DD} <b>N\u1ED9i dung:</b> <code>${content}</code>
\u23F3 <b>Hi\u1EC7u l\u1EF1c:</b> ~10 ph\xFAt <i>(Sau khi chuy\u1EC3n kho\u1EA3n xong, b\u1EA5m n\xFAt "\u0110\xE3 Chuy\u1EC3n Kho\u1EA3n" b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 g\u1EEDi \u0111\u01A1n n\u1EA1p v\u1EC1 admin.)</i>`;
}
function normalizeMoneyNumber(input) {
  if (input === null || input === void 0) return 0;
  if (typeof input === "number") return Math.floor(input);
  const s = String(input).replace(/[^\d]/g, "");
  const n = parseInt(s, 10);
  return isNaN(n) ? 0 : n;
}
function getVNDateKey(date = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh")) {
  return date.format("YYYY-MM-DD");
}
function isSuccessfulDepositStatus(status) {
  const s = String(status || "").toLowerCase();
  return s.includes("th\xE0nh c\xF4ng");
}
function getDepositItemDateKey(item) {
  const raw = item?.time || item?.createdAt || item?.useTime || item?.createTime || "";
  if (typeof raw === "string" && raw.length >= 10) return raw.slice(0, 10);
  const m = import_moment_timezone.default.tz(String(raw), "Asia/Ho_Chi_Minh");
  return m.isValid() ? m.format("YYYY-MM-DD") : "";
}
function getUserSuccessfulDepositTotalOnDate(user, dateKey) {
  const history = Array.isArray(user?.depositHistory) ? user.depositHistory : [];
  let total = 0;
  for (const item of history) {
    if (!isSuccessfulDepositStatus(item?.status)) continue;
    if (getDepositItemDateKey(item) !== dateKey) continue;
    total += normalizeMoneyNumber(item?.amount);
  }
  return total;
}
function hasUserSuccessfulDepositInLastDays(user, days) {
  const history = Array.isArray(user?.depositHistory) ? user.depositHistory : [];
  const since = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").startOf("day").subtract(Math.max(0, days - 1), "days");
  for (const item of history) {
    if (!isSuccessfulDepositStatus(item?.status)) continue;
    const key = getDepositItemDateKey(item);
    if (!key) continue;
    const m = import_moment_timezone.default.tz(key, "YYYY-MM-DD", "Asia/Ho_Chi_Minh");
    if (m.isValid() && m.isSameOrAfter(since, "day")) return true;
  }
  return false;
}
function isTelegramNameQualified(from, keyword = EVENT_KEYWORD) {
  const kw = String(keyword).toLowerCase();
  const fullName = `${from?.first_name || ""} ${from?.last_name || ""}`.trim().toLowerCase();
  const username = String(from?.username || "").toLowerCase();
  return fullName.includes(kw) || username.includes(kw);
}
function createGiftcodeRecord(value, creatorId) {
  const list = readJson(giftJsonFile);
  const existing = new Set(list.map((g) => String(g.gift)));
  const code = generateUniqueGiftCode(existing);
  const record = {
    gift: code,
    value,
    creatorId,
    createTime: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
    useTime: null,
    userIdUsed: null
  };
  writeJson(giftJsonFile, [...list, record]);
  return code;
}
function initJsonFiles() {
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
  if (!import_fs.default.existsSync(phienJsFile)) {
    import_fs.default.writeFileSync(phienJsFile, "1000", "utf8");
  } else {
    const saved = parseInt(import_fs.default.readFileSync(phienJsFile, "utf8"), 10);
    if (!isNaN(saved)) state.phien = saved;
  }
  const hu = readJson("hu.json", '{"pot": 10000, "history": []}');
  hu.pot = 1e4;
  writeJson("hu.json", hu);
  if (typeof hu.autoPotRate === "number") state.autoPotRate = hu.autoPotRate;
  if (typeof hu.lessBetWinsRate === "number") state.lessBetWinsRate = hu.lessBetWinsRate;
  const lbFile = "leaderboard_state.json";
  if (!import_fs.default.existsSync(lbFile)) {
    writeJson(lbFile, {
      lastResetDay: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD"),
      lastResetWeek: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-W")
    });
  }
}
function savePhien() {
  import_fs.default.writeFileSync(phienJsFile, String(state.phien), "utf8");
}
var tokenBot1 = process.env.BOT_TOKEN_1 || "8925099337:AAG9Qnfmn16qOaGzd_zifUPtSQIFedMJxuY";
var tokenBot2 = process.env.BOT_TOKEN_2 || "8791648429:AAEnvaEE5SN35np7q_iMC9uTfC7sEuJu8-M";
var tokenBot3 = process.env.BOT_TOKEN_3 || "8814013514:AAHLziGV5TcIwZUYiPhIxaNc6SygaQiIvq0";
var tokenBot4 = process.env.BOT_TOKEN_4 || "8575655957:AAEJVpRzOYMDQFDm5gwma83a3OKx9NI2UbY";
var tokenBot5 = process.env.BOT_TOKEN_5 || "8385475918:AAGDXUOGVOQqRidBsdQdKQWSa3rdAhR-8BI";
function isTokenValid(token) {
  return token && token.trim() !== "" && token.includes(":");
}
var pollDisabled = process.env.DISABLE_TELEGRAM_POLLING === "true";
var botOptions = { polling: !pollDisabled };
var bot1 = isTokenValid(tokenBot1) ? new import_node_telegram_bot_api.default(tokenBot1, botOptions) : new import_node_telegram_bot_api.default("123:dummy1", { polling: false });
var bot2 = isTokenValid(tokenBot2) ? new import_node_telegram_bot_api.default(tokenBot2, botOptions) : new import_node_telegram_bot_api.default("123:dummy2", { polling: false });
var bot3 = isTokenValid(tokenBot3) ? new import_node_telegram_bot_api.default(tokenBot3, botOptions) : new import_node_telegram_bot_api.default("123:dummy3", { polling: false });
var bot4 = isTokenValid(tokenBot4) ? new import_node_telegram_bot_api.default(tokenBot4, botOptions) : new import_node_telegram_bot_api.default("123:dummy4", { polling: false });
var bot5 = isTokenValid(tokenBot5) ? new import_node_telegram_bot_api.default(tokenBot5, botOptions) : new import_node_telegram_bot_api.default("123:dummy5", { polling: false });
var bots = [bot1, bot2, bot3, bot4, bot5];
var botUsernames = ["Dragon_1gon_bot", "Dragon_2gon_bot", "Dragon_3gon_bot", "Dragon_4gon_bot", "Dragon_5gon_bot"];
var botErrors = [null, null, null, null, null];
bots.forEach((bot, idx) => {
  bot.on("polling_error", (err) => {
    botErrors[idx] = err.message || "Unknown Error";
  });
  const originSendMessage = bot.sendMessage;
  bot.sendMessage = function(chatId, text, options = {}) {
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
  const b = bot;
  if (b.options?.polling && typeof b.deleteWebHook === "function") {
    b.deleteWebHook().catch(() => {
    });
  }
});
if (isTokenValid(tokenBot1)) bot1.getMe().then((me) => {
  botUsernames[0] = me.username || botUsernames[0];
}).catch((e) => botErrors[0] = e.message);
if (isTokenValid(tokenBot2)) bot2.getMe().then((me) => {
  botUsernames[1] = me.username || botUsernames[1];
}).catch((e) => botErrors[1] = e.message);
if (isTokenValid(tokenBot3)) bot3.getMe().then((me) => {
  botUsernames[2] = me.username || botUsernames[2];
}).catch((e) => botErrors[2] = e.message);
if (isTokenValid(tokenBot4)) bot4.getMe().then((me) => {
  botUsernames[3] = me.username || botUsernames[3];
}).catch((e) => botErrors[3] = e.message);
if (isTokenValid(tokenBot5)) bot5.getMe().then((me) => {
  botUsernames[4] = me.username || botUsernames[4];
}).catch((e) => botErrors[4] = e.message);
function sendMessageToRoom(text, options = {}) {
  const list = [bot3, bot1, bot2, bot5, bot4];
  const trySend = (idx) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(groupt, text, options).catch(() => trySend(idx + 1));
  };
  trySend(0);
}
function sendResilientReply(chatId, text, options = {}) {
  const list = [bot3, bot1, bot2, bot5, bot4];
  const trySend = (idx) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(chatId, text, options).catch(() => trySend(idx + 1));
  };
  trySend(0);
}
function sendSoloReply(chatId, text, options = {}) {
  return bot1.sendMessage(chatId, text, options).catch(() => null);
}
function sendSoloRoomAnnouncement(text, options = {}) {
  return bot1.sendMessage(groupt, text, options).catch(() => null);
}
function sendMessageToAdminGroup(text, options = {}) {
  const list = [bot1, bot2, bot3, bot5, bot4];
  const trySend = (idx) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(adminn, text, options).catch(() => trySend(idx + 1));
  };
  trySend(0);
}
function getMainMenuReplyMarkup() {
  return {
    keyboard: [
      [{ text: "\u{1F4DA} Danh S\xE1ch Game" }, { text: "\u{1F464} V\xED C\xE1 Nh\xE2n" }],
      [{ text: "\u{1F525} N\u1ED5 H\u0169 R\u1ED3ng" }],
      [{ text: "\u{1F396} \u0110ua T\xF4p" }, { text: "\u{1F451} V\xEDp" }],
      [{ text: "\u{1F3EE} \u0110\u1EA1i L\xFD Hoa H\u1ED3ng" }, { text: "\u{1F3AA} EVENT" }]
    ],
    resize_keyboard: true
  };
}
function getWelcomeStartCaption(chatId) {
  return `\u2728 <b>Ch\xE0o m\u1EEBng tr\u1EDF l\u1EA1i s\xF2ng c\u01B0\u1EE3c Dragon Room!</b> \u2728

\u{1F194} <b>ID c\u1EE7a b\u1EA1n l\xE0:</b> <code>${chatId}</code>
\u{1F4AC} <b>Link d\u1EABn v\xE0o ph\xF2ng c\u01B0\u1EE3c:</b> ${gameRoomLink}`;
}
function sendWelcomeStartMessage(chatId) {
  const caption = getWelcomeStartCaption(chatId);
  const options = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: getMainMenuReplyMarkup()
  };
  if (import_fs.default.existsSync(welcomeStartImagePath)) {
    bot1.sendPhoto(chatId, welcomeStartImagePath, {
      caption,
      parse_mode: "HTML",
      reply_markup: getMainMenuReplyMarkup()
    }).catch(() => {
      bot1.sendMessage(chatId, caption, options).catch(() => null);
    });
    return;
  }
  bot1.sendMessage(chatId, caption, options).catch(() => null);
}
function sendAndPinToAdminGroup(text, onPinned) {
  const list = [bot1, bot2, bot3, bot4, bot5];
  const trySend = (idx) => {
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
function unpinFromAdminGroup(messageId) {
  const list = [bot1, bot2, bot3, bot4, bot5];
  const msgIdNum = parseInt(String(messageId), 10);
  if (isNaN(msgIdNum)) return;
  list.forEach((bot) => {
    bot.unpinChatMessage(adminn, { message_id: msgIdNum }).catch(() => {
    });
    bot.unpinChatMessage(adminn, { messageId: msgIdNum }).catch(() => {
    });
  });
}
function pinGroupMessageWithResilience(chatId, messageId) {
  const list = [bot2, bot5, bot1, bot3, bot4];
  const tryPin = (idx) => {
    if (idx >= list.length) return;
    list[idx].pinChatMessage(chatId, messageId).catch(() => tryPin(idx + 1));
  };
  tryPin(0);
}
function sendAndPinToGameRoom(text, options = {}, onPinned) {
  const finalOpts = { parse_mode: "HTML", ...options };
  const list = [bot1, bot2, bot5, bot3, bot4];
  const trySend = (idx) => {
    if (idx >= list.length) return;
    list[idx].sendMessage(groupt, text, finalOpts).then((msg) => {
      pinGroupMessageWithResilience(groupt, msg.message_id);
      if (onPinned) onPinned(msg.message_id);
    }).catch(() => trySend(idx + 1));
  };
  trySend(0);
}
function unpinFromGameRoom(messageId) {
  const msgIdNum = parseInt(String(messageId), 10);
  if (isNaN(msgIdNum)) return;
  [bot1, bot2, bot3, bot4, bot5].forEach((bot) => {
    bot.unpinChatMessage(groupt, { message_id: msgIdNum }).catch(() => {
    });
    bot.unpinChatMessage(groupt, { messageId: msgIdNum }).catch(() => {
    });
  });
}
function removePinnedSoloRoomMessage(messageId) {
  const msgIdNum = parseInt(String(messageId), 10);
  if (isNaN(msgIdNum)) return;
  unpinFromGameRoom(msgIdNum);
  [bot1, bot2, bot3, bot4, bot5].forEach((bot) => {
    bot.deleteMessage(groupt, String(msgIdNum)).catch(() => {
    });
  });
}
function clearSoloRoomPin(room) {
  const msgIdNum = parseInt(String(room?.pinnedMessageId || ""), 10);
  if (isNaN(msgIdNum)) return;
  removePinnedSoloRoomMessage(msgIdNum);
  room.pinnedMessageId = null;
}
function lockGroupChat() {
  state.chatLocked = true;
  bot5.setChatPermissions(groupt, {
    can_send_messages: false,
    can_send_media_messages: false,
    can_send_polls: false,
    can_send_other_messages: false,
    can_add_web_page_previews: false
  }).catch(() => {
  });
}
function unlockGroupChat() {
  state.chatLocked = false;
  bot5.setChatPermissions(groupt, {
    can_send_messages: true,
    can_send_media_messages: true,
    can_send_polls: true,
    can_send_other_messages: true,
    can_add_web_page_previews: true
  }).catch(() => {
  });
}
function parseBetText(inputText) {
  const raw = inputText.trim().toLowerCase();
  const words = raw.split(/\s+/);
  if (words.length < 2) return null;
  const dict = {
    t: { cat: "TX", type: "t" },
    tai: { cat: "TX", type: "t" },
    x: { cat: "TX", type: "x" },
    xiu: { cat: "TX", type: "x" },
    c: { cat: "CL", type: "c" },
    chan: { cat: "CL", type: "c" },
    l: { cat: "CL", type: "l" },
    le: { cat: "CL", type: "l" },
    tt: { cat: "TX", type: "t" },
    xx: { cat: "TX", type: "x" },
    cc: { cat: "CL", type: "c" },
    ll: { cat: "CL", type: "l" },
    tc: { cat: "XI\xCAN", type: "tc" },
    tl: { cat: "XI\xCAN", type: "tl" },
    xc: { cat: "XI\xCAN", type: "xc" },
    xl: { cat: "XI\xCAN", type: "xl" },
    xxc: { cat: "DICE", type: "xxc" },
    xxl: { cat: "DICE", type: "xxl" },
    xxx: { cat: "DICE", type: "xxx" },
    xxt: { cat: "DICE", type: "xxt" }
  };
  const choice = dict[words[0]];
  if (choice) {
    return { category: choice.cat, type: choice.type, amountStr: words[1] };
  }
  if (/^d[1-6]{1,2}$/.test(words[0])) {
    return { category: "DICE", type: words[0], amountStr: words[1] };
  }
  if (/^sb(1[0-8]|[1-9])$/.test(words[0])) {
    return { category: "SUM", type: words[0], amountStr: words[1] };
  }
  if (words[0] === "sb" && words.length >= 3) {
    if (/^(1[0-8]|[1-9])$/.test(words[1])) {
      return { category: "SUM", type: "sb" + words[1], amountStr: words[2] };
    }
  }
  return null;
}
var VIP_TIERS = [
  { level: 0, badge: "\u25AB\uFE0F", name: "T\xE2n Binh", thresholdPoints: 0, exchangeRate: 0 },
  { level: 1, badge: "\u{1F949}", name: "\u0110\u1ED3ng", thresholdPoints: 100, exchangeRate: 100 },
  { level: 2, badge: "\u{1F948}", name: "B\u1EA1c", thresholdPoints: 250, exchangeRate: 200 },
  { level: 3, badge: "\u{1F396}", name: "B\u1EA1ch Kim", thresholdPoints: 350, exchangeRate: 300 },
  { level: 4, badge: "\u{1F451}", name: "Ho\xE0ng Kim", thresholdPoints: 450, exchangeRate: 400 },
  { level: 5, badge: "\u{1F48E}", name: "Kim C\u01B0\u01A1ng", thresholdPoints: 550, exchangeRate: 500 },
  { level: 6, badge: "\u269C\uFE0F", name: "Tinh Anh", thresholdPoints: 650, exchangeRate: 600 },
  { level: 7, badge: "\u{1F6E1}\uFE0F", name: "Cao Th\u1EE7", thresholdPoints: 750, exchangeRate: 700 },
  { level: 8, badge: "\u{1F3C5}", name: "\u0110\u1EA1i Cao Th\u1EE7", thresholdPoints: 850, exchangeRate: 800 },
  { level: 9, badge: "\u{1F525}", name: "V\u01B0\u01A1ng Gi\u1EA3", thresholdPoints: 950, exchangeRate: 900 },
  { level: 10, badge: "\u{1F31F}", name: "Thi\xEAn V\u01B0\u01A1ng", thresholdPoints: 1050, exchangeRate: 1e3 },
  { level: 11, badge: "\u{1FABD}", name: "B\xE1 V\u01B0\u01A1ng", thresholdPoints: 1150, exchangeRate: 1100 },
  { level: 12, badge: "\u{1F409}", name: "Th\u1EA7n Long", thresholdPoints: 1250, exchangeRate: 1200 },
  { level: 13, badge: "\u{1F451}\u{1F409}", name: "Ch\xED T\xF4n", thresholdPoints: 1350, exchangeRate: 1300 }
];
function getVipPoints(user) {
  return Math.max(0, Number(user?.vipPoints || 0));
}
function getVipRedeemablePoints(user) {
  return getVipPoints(user);
}
function getVipTierInfo(user) {
  const points = getVipPoints(user);
  let tier = VIP_TIERS[0];
  for (const item of VIP_TIERS) {
    if (points >= item.thresholdPoints) tier = item;
  }
  const nextTier = VIP_TIERS.find((item) => item.level === tier.level + 1) || null;
  return {
    ...tier,
    points,
    nextTier,
    nextThresholdPoints: nextTier?.thresholdPoints || tier.thresholdPoints
  };
}
function getVipLevel(user) {
  return `VIP${getVipTierInfo(user).level}`;
}
function isTelegramXXBetType(type) {
  return ["xxc", "xxl", "xxx", "xxt"].includes(String(type || "").toLowerCase());
}
function getUserActiveBetGame(user) {
  return user?.activeBetGame === "TELEGRAM_XX" ? "TELEGRAM_XX" : "ROOM_DEFAULT";
}
function getTelegramXXLabel(type) {
  const map = {
    xxc: "XXC",
    xxl: "XXL",
    xxx: "XXX",
    xxt: "XXT"
  };
  return map[String(type || "").toLowerCase()] || String(type || "").toUpperCase();
}
function isTelegramXXWin(type, diceValue) {
  const normalized = String(type || "").toLowerCase();
  if (normalized === "xxc") return [2, 4, 6].includes(diceValue);
  if (normalized === "xxl") return [1, 3, 5].includes(diceValue);
  if (normalized === "xxx") return [1, 2, 3].includes(diceValue);
  if (normalized === "xxt") return [4, 5, 6].includes(diceValue);
  return false;
}
function getVipBadge(user) {
  const info = getVipTierInfo(user);
  return info.level > 0 ? info.badge : "";
}
function getVipRoomBadgePrefix(user) {
  const info = getVipTierInfo(user);
  if (info.level <= 0) return "";
  return `${info.badge}VIP${info.level} `;
}
function toBoldDigits(value) {
  const digitMap = {
    "0": "\u{1D7EC}",
    "1": "\u{1D7ED}",
    "2": "\u{1D7EE}",
    "3": "\u{1D7EF}",
    "4": "\u{1D7F0}",
    "5": "\u{1D7F1}",
    "6": "\u{1D7F2}",
    "7": "\u{1D7F3}",
    "8": "\u{1D7F4}",
    "9": "\u{1D7F5}"
  };
  return String(value ?? "").replace(/\d/g, (digit) => digitMap[digit] || digit);
}
function getVipExchangeRate(user) {
  return Math.max(0, Number(getVipTierInfo(user)?.exchangeRate || 0));
}
function formatVipGuideMessage(user) {
  const info = getVipTierInfo(user);
  const nextLevelText = info.nextTier ? `${info.points.toLocaleString("vi-VN")}/${info.nextThresholdPoints.toLocaleString("vi-VN")} up VIP ${info.nextTier.level}` : `${info.points.toLocaleString("vi-VN")} \u0111i\u1EC3m | \u0110\xE3 \u0111\u1EA1t VIP t\u1ED1i \u0111a`;
  const redeemablePoints = getVipRedeemablePoints(user);
  const currentRate = getVipExchangeRate(user);
  const rateLines = VIP_TIERS.filter((item) => item.level > 0).map((item) => `${item.badge} <b>VIP ${item.level}</b> (${item.name}): <b>${item.exchangeRate.toLocaleString("vi-VN")}\u0111</b>/1 \u0111i\u1EC3m VIP`).join("\n");
  return `\u{1F451} <b>V\xCDP</b> \u{1F451}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F451} C\u1EA5p Vip hi\u1EC7n t\u1EA1i: <b>${info.level}</b> ${info.badge} (<b>${info.name}</b>)
\u{1F680} \u0110i\u1EC3m VIP: <b>${nextLevelText}</b>
\u{1F590}\uFE0F S\u1ED1 \u0111i\u1EC3m VIP c\xF3 th\u1EC3 \u0111\u1ED5i: <b>${redeemablePoints.toLocaleString("vi-VN")}</b>
\u{1F4B8} T\u1EF7 l\u1EC7 quy \u0111\u1ED5i hi\u1EC7n t\u1EA1i: <b>${currentRate.toLocaleString("vi-VN")}\u0111</b>/1 \u0111i\u1EC3m VIP
\u{1F3AF} T\u1ED5ng doanh s\u1ED1 c\u01B0\u1EE3c: <b>${Number(user?.cuoc || 0).toLocaleString("vi-VN")} xu</b>

\u{1F4D6} <b>B\u1EA2NG H\u01AF\u1EDANG D\u1EAAN \u0110\u1ED4I \u0110I\u1EC2M VIP:</b>
${rateLines}

\u{1F9FE} <b>C\xFA ph\xE1p \u0111\u1ED5i \u0111i\u1EC3m:</b> <code>/doidiemvip [s\u1ED1 \u0111i\u1EC3m]</code>
\u{1F4A1} <i>C\u01B0\u1EE3c t\u1EEB 50.000 xu tr\u1EDF l\xEAn m\u1EDBi t\xEDnh. M\u1ED7i l\u1EC7nh h\u1EE3p l\u1EC7 \u0111\u01B0\u1EE3c c\u1ED9ng 1 \u0111i\u1EC3m VIP, nh\u01B0ng ph\u1EA3i c\xE1ch nhau 3 l\u1EC7nh h\u1EE3p l\u1EC7 m\u1EDBi \u0111\u01B0\u1EE3c c\u1ED9ng ti\u1EBFp.</i>`;
}
function applyVipPointFromBet(user, betValue) {
  user.vipPoints = Math.max(0, Number(user.vipPoints || 0));
  user.vipPointCooldown = Math.max(0, Number(user.vipPointCooldown || 0));
  if (Number(betValue || 0) < 5e4) return false;
  if (user.vipPointCooldown > 0) {
    user.vipPointCooldown -= 1;
    return false;
  }
  user.vipPoints += 1;
  user.vipPointCooldown = 3;
  return true;
}
function checkAndResetUserBets(user) {
  const nowVN = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh");
  const todayStr = nowVN.format("YYYY/MM/DD");
  const weekId = nowVN.format("YYYY-W");
  if (user.lastBetResetDate !== todayStr) {
    user.cuocHomNay = 0;
    user.lastBetResetDate = todayStr;
    resetUserDailyStreaks(user, todayStr);
  }
  if (user.lastBetWeekId !== weekId) {
    user.cuocTuanNay = 0;
    user.lastBetWeekId = weekId;
  }
}
function isBanned(userId) {
  const banned = readJson(banJsonFile);
  return banned.some((u) => String(u.id) === String(userId));
}
function generateGiftCode() {
  let res = "";
  for (let i = 8; i > 0; i--) res += Math.floor(Math.random() * 10);
  return res;
}
function generateUniqueGiftCode(existingCodes) {
  let code = "";
  do {
    code = generateGiftCode();
  } while (existingCodes.has(code));
  existingCodes.add(code);
  return code;
}
function generateRandomSuffix() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let res = "";
  for (let i = 0; i < 6; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
  return res;
}
function formatMaskedId(userId) {
  const str = String(userId);
  return str.length > 5 ? "****" + str.slice(-5) : "****" + str;
}
function getUserBalance(user) {
  return Math.floor(user?.sd !== void 0 ? user.sd : user?.money || 0);
}
function setUserBalance(user, balance) {
  user.sd = Math.floor(balance);
  if (user.money !== void 0) user.money = Math.floor(balance);
}
function readSoloRooms() {
  return readJson(soloRoomsJsonFile, "[]");
}
function writeSoloRooms(rooms) {
  const normalized = rooms.slice(-200);
  writeJson(soloRoomsJsonFile, normalized);
}
function generateSoloRoomCode(existingCodes) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  do {
    code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  } while (existingCodes.has(code));
  return code;
}
function getOpenSoloRooms(rooms = readSoloRooms()) {
  return rooms.filter((room) => room.status === "OPEN" && !room.challengerId).sort((a, b) => b.createdAt - a.createdAt);
}
function formatSoloOpenRooms(rooms = readSoloRooms()) {
  const openRooms = getOpenSoloRooms(rooms);
  if (openRooms.length === 0) {
    return `(Ch\u01B0a c\xF3 ph\xF2ng m\u1EDF. G\xF5 <code>solo [s\u1ED1 ti\u1EC1n]</code> \u0111\u1EC3 t\u1EA1o ph\xF2ng.)`;
  }
  return openRooms.slice(0, 20).map(
    (room, idx) => `${idx + 1}. <b>${room.code}</b> | Ch\u1EE7 ph\xF2ng: <b>${room.ownerName}</b> | C\u01B0\u1EE3c: <b>${room.amount.toLocaleString("vi-VN")} xu</b>`
  ).join("\n");
}
function formatSoloLobbyMessage(rooms = readSoloRooms()) {
  return `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b> \u{1F3B2}
T\u1EA1o ph\xF2ng v\xE0 m\u1EDDi b\u1EA1n b\xE8 tham gia \u0111\u1EA5u x\xFAc x\u1EAFc. M\u1ED7i ng\u01B0\u1EDDi tung <b>1 vi\xEAn x\xFAc x\u1EAFc 3D Telegram</b>. Ng\u01B0\u1EDDi c\xF3 k\u1EBFt qu\u1EA3 cao h\u01A1n s\u1EBD th\u1EAFng.

\u{1F449} S\u1ED1 ti\u1EC1n ch\u01A1i t\u1ED1i thi\u1EC3u l\xE0 <b>${SOLO_MIN_BET.toLocaleString("vi-VN")}</b> (kh\xF4ng gi\u1EDBi h\u1EA1n t\u1ED1i \u0111a theo c\u1EA5u h\xECnh game, ch\u1EC9 c\u1EA7n \u0111\u1EE7 s\u1ED1 d\u01B0).
- T\u1EC9 l\u1EC7 tr\u1EA3 th\u01B0\u1EDFng <b>${SOLO_PAYOUT_RATE.toFixed(2)}</b>

C\xE1ch ch\u01A1i:
<code>solo [S\u1ED1 ti\u1EC1n]</code> \u0111\u1EC3 t\u1EA1o ph\xF2ng ch\u01A1i
<code>/solo [M\xE3 ph\xF2ng]</code> \u0111\u1EC3 v\xE0o ph\xF2ng ch\u01A1i
<code>/xx [M\xE3 ph\xF2ng]</code> ho\u1EB7c b\u1EA5m n\xFAt <b>Tung XX</b> \u0111\u1EC3 tung x\xFAc x\u1EAFc
<code>/huy [M\xE3 ph\xF2ng]</code> \u0111\u1EC3 hu\u1EF7 ph\xF2ng (Ch\u1EC9 hu\u1EF7 khi ch\u01B0a c\xF3 ai v\xE0o, ch\u1EC9 \u0111\u01B0\u1EE3c hu\u1EF7 sau 1 ph\xFAt t\u1EA1o ph\xF2ng)

Danh s\xE1ch c\xE1c ph\xF2ng SOLO hi\u1EC7n t\u1EA1i:
${formatSoloOpenRooms(rooms)}`;
}
function formatRoomDefaultGuideMessage() {
  return `\u{1F4AC} <b>T\xC0I X\u1EC8U S\u0102N H\u0168</b> \u{1F4AC}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u0110\xE2y l\xE0 khu <b>\u0111\u1EB7t c\u01B0\u1EE3c ph\xF2ng</b> m\u1EB7c \u0111\u1ECBnh trong Dragon Room.

\u{1F4D6} <b>C\xC1C L\u1EC6NH \u0110\u1EB6T C\u01AF\u1EE2C:</b>

\u{1F539} <b>1. T\xC0I X\u1EC8U (TX)</b>
\u2022 <code>t [s\u1ED1_xu]</code> ho\u1EB7c <code>tai [s\u1ED1_xu]</code>
\u2022 <code>x [s\u1ED1_xu]</code> ho\u1EB7c <code>xiu [s\u1ED1_xu]</code>
<i>V\xED d\u1EE5: <code>tai 10000</code> ho\u1EB7c <code>x 50000</code></i>

\u{1F538} <b>2. CH\u1EB4N L\u1EBA (CL)</b>
\u2022 <code>c [s\u1ED1_xu]</code> ho\u1EB7c <code>chan [s\u1ED1_xu]</code>
\u2022 <code>l [s\u1ED1_xu]</code> ho\u1EB7c <code>le [s\u1ED1_xu]</code>
<i>V\xED d\u1EE5: <code>chan 20000</code> ho\u1EB7c <code>l 30000</code></i>

\u{1F539} <b>3. XI\xCAN</b>
\u2022 <code>tc [s\u1ED1_xu]</code> (T\xE0i Ch\u1EB5n)
\u2022 <code>tl [s\u1ED1_xu]</code> (T\xE0i L\u1EBB)
\u2022 <code>xc [s\u1ED1_xu]</code> (X\u1EC9u Ch\u1EB5n)
\u2022 <code>xl [s\u1ED1_xu]</code> (X\u1EC9u L\u1EBB)

\u{1F539} <b>4. C\u01AF\u1EE2C X\xDAC X\u1EAEC C\u0168 (DICE)</b>
\u2022 <code>d[s\u1ED1] [s\u1ED1_xu]</code> (M\u1EB7t s\u1ED1 t\u1EEB 1-6)
<i>V\xED d\u1EE5: <code>d6 10000</code>, <code>d55 20000</code></i>

\u{1F539} <b>5. C\u01AF\u1EE2C T\u1ED4NG \u0110I\u1EC2M (SUM)</b>
\u2022 <code>sb[t\u1ED5ng] [s\u1ED1_xu]</code> (T\u1ED5ng \u0111i\u1EC3m t\u1EEB 3-18)
<i>V\xED d\u1EE5: <code>sb11 50000</code></i>

\u{1F575}\uFE0F <b>6. C\u01AF\u1EE2C \u1EA8N DANH</b>
\u2022 D\xF9ng: <code>tt</code>, <code>xx</code>, <code>cc</code>, <code>ll</code>
<i>V\xED d\u1EE5: <code>tt 20000</code> c\u01B0\u1EE3c \u1EA9n danh T\xE0i</i>

\u{1F4A1} <i>M\u1EB9o: C\xF3 th\u1EC3 g\xF5 <code>tai max</code> ho\u1EB7c <code>chan max</code> \u0111\u1EC3 c\u01B0\u1EE3c to\xE0n b\u1ED9 s\u1ED1 d\u01B0 h\u1EE3p l\u1EC7.</i>`;
}
function buildSoloRoomDeepLink(roomCode) {
  return `https://t.me/${botUsernames[0]}?start=solo_${roomCode}`;
}
function buildReferralDeepLink(userId) {
  return `https://t.me/${botUsernames[0]}?start=ref_${userId}`;
}
function awardReferralCommission(users, loser, lossAmount) {
  if (!loser || !lossAmount || lossAmount <= 0) return;
  const referrerId = String(loser.referrerId || "").trim();
  if (!referrerId || referrerId === String(loser.id)) return;
  const referrer = users.find((u) => String(u.id) === referrerId);
  if (!referrer) return;
  const commission = Math.floor(lossAmount * 0.01);
  if (commission <= 0) return;
  referrer.hh = (referrer.hh || 0) + commission;
}
function ensureRandomHourlyGiftSchedule(now = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh")) {
  const state2 = readJson(hourlyGiftStateJsonFile, "{}");
  const currentHour = now.hour();
  const windowStartHour = currentHour - currentHour % 2;
  const windowStart = now.clone().startOf("day").add(windowStartHour, "hours");
  const windowEnd = windowStart.clone().add(2, "hours").subtract(1, "millisecond");
  const windowKey = `${windowStart.format("YYYY-MM-DD-HH")}_2H`;
  const currentNextRunAt = Number(state2.nextRunAt || 0);
  const isScheduleValid = state2.scheduledWindowKey === windowKey && currentNextRunAt >= windowStart.valueOf() && currentNextRunAt <= windowEnd.valueOf();
  if (!isScheduleValid) {
    const minRunAt = Math.min(windowEnd.valueOf(), now.valueOf() + 15e3);
    const randomOffset = Math.max(0, windowEnd.valueOf() - minRunAt);
    state2.scheduledWindowKey = windowKey;
    state2.nextRunAt = minRunAt + Math.floor(Math.random() * (randomOffset + 1));
    writeJson(hourlyGiftStateJsonFile, state2);
  }
  return state2;
}
function maybeDispatchRandomHourlyGiftCode() {
  const now = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh");
  const currentHour = now.hour();
  const windowStartHour = currentHour - currentHour % 2;
  const windowKey = `${now.clone().startOf("day").add(windowStartHour, "hours").format("YYYY-MM-DD-HH")}_2H`;
  const state2 = ensureRandomHourlyGiftSchedule(now);
  if (state2.lastDispatchWindowKey === windowKey) return;
  if (Date.now() < Number(state2.nextRunAt || 0)) return;
  const giftData = readJson(giftJsonFile, "[]");
  const existingCodes = new Set((giftData || []).map((g) => String(g.gift || "")));
  const code = generateUniqueGiftCode(existingCodes);
  giftData.push({
    gift: code,
    value: HOURLY_ROOM_GIFTCODE_VALUE,
    creatorId: "AUTO_HOURLY_ROOM",
    createTime: now.format("YYYY-MM-DD HH:mm:ss"),
    useTime: null,
    userIdUsed: null
  });
  writeJson(giftJsonFile, giftData);
  state2.lastDispatchWindowKey = windowKey;
  state2.lastGiftCode = code;
  writeJson(hourlyGiftStateJsonFile, state2);
  sendMessageToRoom(
    `\u2708\uFE0F <b>DRAGONROOM PH\xC1T L\u1ED8C NG\u1EAAU NHI\xCAN</b> \u2708\uFE0F
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u{1F381} <b>Giftcode gi\u1EDD v\xE0ng v\u1EEBa r\u01A1i!</b>
\u{1F48E} M\u1EC7nh gi\xE1: <b>${HOURLY_ROOM_GIFTCODE_VALUE.toLocaleString("vi-VN")} xu</b>
\u{1F511} Nh\u1EADp ngay: /code ${code}
\u23F0 h\u1EC7 th\u1ED1ng ch\u1EC9 ph\xE1t 1 code v\xE0o th\u1EDDi gian ng\u1EABu nhi\xEAn.
\u{1F680} Canh room \u0111\u1EC3 s\u0103n code ti\u1EBFp theo nh\xE9!
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D`,
    { parse_mode: "HTML" }
  );
}
function formatSoloPinnedRoomMessage(room) {
  return `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F451} Ch\u1EE7 ph\xF2ng: <b>${room.ownerName}</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u{1F4B0} M\u1EE9c c\u01B0\u1EE3c: <b>${room.amount.toLocaleString("vi-VN")} xu</b>
\u2694\uFE0F V\xE0o bot ch\xEDnh \u0111\u1EC3 nh\u1EADp l\u1EC7nh <code>/solo ${room.code}</code>`;
}
function formatTelegramXXGuideMessage() {
  return `\u{1F3B2} <b>X\xDAC X\u1EAEC TELEGRAM</b> \u{1F3B2}

Ch\u1EBF \u0111\u1ED9 m\u1EB7c \u0111\u1ECBnh: <b>BOT tung x\xFAc x\u1EAFc</b>

N\u1ED9i dung | K\u1EBFt qu\u1EA3 1 x\xFAc x\u1EAFc | T\u1EF7 l\u1EC7 \u0103n
<code>XXC</code> | <b>2,4,6</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>
<code>XXL</code> | <b>1,3,5</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>
<code>XXX</code> | <b>1,2,3</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>
<code>XXT</code> | <b>4,5,6</b> | <b>x${TELEGRAM_XX_PAYOUT_RATE.toFixed(2)}</b>

\u{1F449} T\u1ED1i thi\u1EC3u l\xE0 <b>${TELEGRAM_XX_MIN_BET.toLocaleString("vi-VN")}</b> v\xE0 t\u1ED1i \u0111a l\xE0 <b>${TELEGRAM_XX_MAX_BET.toLocaleString("vi-VN")}</b>

\u{1F516} C\xE1ch ch\u01A1i: <code>[N\u1ED9i dung] [ti\u1EC1n c\u01B0\u1EE3c]</code>
VD: <code>XXC 10000</code> ho\u1EB7c <code>XXL 10000</code>`;
}
function formatGameCatalogMessage(rooms = readSoloRooms()) {
  return `\u{1F4DA} <b>DANH S\xC1CH GAME</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

\u{1F3B2} 1. <b>T\xC0I X\u1EC8U S\u0102N H\u0168</b>
\u{1F3B2} 2. <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F3B2} 3. <b>X\xDAC X\u1EAEC TELEGRAM</b>`;
}
function getGameCatalogReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "\u{1F3B2} 1 - T\xE0i X\u1EC9u S\u0103n H\u0169", callback_data: "game_catalog_room_default" }],
      [{ text: "\u{1F3B2} 2 - Game Solo X\xFAc X\u1EAFc", callback_data: "game_catalog_solo" }],
      [{ text: "\u{1F3B2} 3 - X\xFAc X\u1EAFc Telegram", callback_data: "game_catalog_telegram" }],
      [{ text: "\u{1F4AC} V\xE0o Ph\xF2ng Dragon Room", url: gameRoomLink }]
    ]
  };
}
function getDuaTopReplyMarkup() {
  return {
    inline_keyboard: [
      [{ text: "\u{1F3C6} BXH PHONG TH\u1EA6N", callback_data: "duatop_phong_than" }],
      [{ text: "\u{1F525} BXH \u0110U D\xC2Y", callback_data: "duatop_du_day" }]
    ]
  };
}
function getSoloRollReplyMarkup(roomCode) {
  return {
    inline_keyboard: [[{ text: "\u{1F3B2} Tung XX", callback_data: `solo_roll_${roomCode}` }]]
  };
}
function formatSoloRollPrompt(room, targetUserId) {
  const isOwner = String(room.ownerId) === String(targetUserId);
  const myRole = isOwner ? "Ch\u1EE7 ph\xF2ng" : "\u0110\u1ED1i th\u1EE7";
  const enemyName = isOwner ? room.challengerName || "\u0110\u1ED1i th\u1EE7" : room.ownerName;
  const myRolled = isOwner ? !!room.ownerRoll : !!room.challengerRoll;
  const enemyRolled = isOwner ? !!room.challengerRoll : !!room.ownerRoll;
  const deadlineText = room.rollDeadlineAt ? (0, import_moment_timezone.default)(room.rollDeadlineAt).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss DD/MM") : "N/A";
  return `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u{1F464} Vai tr\xF2: <b>${myRole}</b>
\u2694\uFE0F \u0110\u1ED1i th\u1EE7: <b>${enemyName}</b>
\u{1F4B0} M\u1EE9c c\u01B0\u1EE3c: <b>${room.amount.toLocaleString("vi-VN")} xu</b>
\u23F0 H\u1EA1n tung XX: <b>${deadlineText}</b>
\u{1F4CC} Tr\u1EA1ng th\xE1i: B\u1EA1n <b>${myRolled ? "\u0111\xE3 tung" : "ch\u01B0a tung"}</b> | \u0110\u1ED1i th\u1EE7 <b>${enemyRolled ? "\u0111\xE3 tung" : "ch\u01B0a tung"}</b>

${myRolled ? `\u2705 B\u1EA1n \u0111\xE3 tung 1 vi\xEAn XX Telegram r\u1ED3i, ch\u1EDD \u0111\u1ED1i th\u1EE7.` : `\u{1F449} B\u1EA5m n\xFAt b\xEAn d\u01B0\u1EDBi ho\u1EB7c g\xF5 <code>/xx ${room.code}</code> \u0111\u1EC3 tung 1 vi\xEAn x\xFAc x\u1EAFc 3D Telegram.`}`;
}
function compareSoloRolls(ownerRoll, challengerRoll) {
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
async function sendSoloTelegramDice(chatId) {
  try {
    const msg = await bot1.sendDice(chatId);
    return msg?.dice?.value || null;
  } catch {
    return null;
  }
}
function formatSoloRoomAnnouncement(room, users) {
  const winner = users.find((u) => String(u.id) === String(room.winnerId || ""));
  const loser = users.find((u) => String(u.id) === String(room.loserId || ""));
  if (!winner || !loser) {
    return `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u26A0\uFE0F K\xE8o n\xE0y ch\u01B0a th\u1EC3 ch\u1ED1t ng\u01B0\u1EDDi th\u1EAFng thua.`;
  }
  const winnerRollText = String(room.winnerId) === String(room.ownerId) ? room.ownerTotal !== null ? String(room.ownerTotal) : "Ch\u01B0a tung" : room.challengerTotal !== null ? String(room.challengerTotal) : "Ch\u01B0a tung";
  const loserRollText = String(room.loserId) === String(room.ownerId) ? room.ownerTotal !== null ? String(room.ownerTotal) : "Ch\u01B0a tung" : room.challengerTotal !== null ? String(room.challengerTotal) : "Ch\u01B0a tung";
  return `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u{1F4B0} M\u1EE9c c\u01B0\u1EE3c: <b>${room.amount.toLocaleString("vi-VN")} xu</b>

\u{1F3C6} Ng\u01B0\u1EDDi chi\u1EBFn th\u1EAFng: <b>${winner.name || "Ng\u01B0\u1EDDi ch\u01A1i"}</b>
\u{1F194} ID: <code>${winner.id}</code>
\u{1F3B2} Tung ra: <b>${winnerRollText}</b>
\u{1F4B8} \u0102n \u0111\u01B0\u1EE3c: <b>${(room.payout || 0).toLocaleString("vi-VN")} xu</b>

\u{1F62D} Ng\u01B0\u1EDDi thua: <b>${loser.name || "Ng\u01B0\u1EDDi ch\u01A1i"}</b>
\u{1F194} ID: <code>${loser.id}</code>
\u{1F3B2} Tung ra: <b>${loserRollText}</b>
\u{1F4CC} K\u1EBFt lu\u1EADn: <b>C\xF2n C\xE1i N\u1ECBt</b>`;
}
function finalizeSoloRoom(room, users, reason = "") {
  const owner = users.find((u) => String(u.id) === String(room.ownerId));
  const challenger = users.find((u) => String(u.id) === String(room.challengerId || ""));
  if (!owner || !challenger) {
    room.status = "CANCELLED";
    room.settledAt = Date.now();
    room.resultReason = "Kh\xF4ng \u0111\u1EE7 ng\u01B0\u1EDDi ch\u01A1i h\u1EE3p l\u1EC7 \u0111\u1EC3 k\u1EBFt to\xE1n.";
    return null;
  }
  let winner = null;
  let loser = null;
  let payout = 0;
  let resultReason = reason;
  if (!room.ownerRoll && !room.challengerRoll) {
    setUserBalance(owner, getUserBalance(owner) + room.amount);
    setUserBalance(challenger, getUserBalance(challenger) + room.amount);
    room.status = "CANCELLED";
    room.settledAt = Date.now();
    room.resultReason = reason || "H\u1EBFt 5 ph\xFAt nh\u01B0ng c\u1EA3 2 b\xEAn \u0111\u1EC1u ch\u01B0a tung x\xFAc x\u1EAFc, h\u1EC7 th\u1ED1ng ho\xE0n ti\u1EC1n.";
    room.payout = 0;
    return {
      mode: "refund",
      message: `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u26A0\uFE0F ${room.resultReason}`,
      roomAnnouncement: `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u26A0\uFE0F ${room.resultReason}`
    };
  }
  if (room.ownerRoll && !room.challengerRoll) {
    winner = owner;
    loser = challenger;
    resultReason = reason || `\u0110\u1ED1i th\u1EE7 kh\xF4ng tung x\xFAc x\u1EAFc trong 5 ph\xFAt n\xEAn thua.`;
  } else if (!room.ownerRoll && room.challengerRoll) {
    winner = challenger;
    loser = owner;
    resultReason = reason || `Ch\u1EE7 ph\xF2ng kh\xF4ng tung x\xFAc x\u1EAFc trong 5 ph\xFAt n\xEAn thua.`;
  } else {
    const diff = compareSoloRolls(room.ownerRoll, room.challengerRoll);
    if (diff === 0) {
      setUserBalance(owner, getUserBalance(owner) + room.amount);
      setUserBalance(challenger, getUserBalance(challenger) + room.amount);
      room.status = "CANCELLED";
      room.settledAt = Date.now();
      room.resultReason = "Hai b\xEAn h\xF2a tuy\u1EC7t \u0111\u1ED1i, h\u1EC7 th\u1ED1ng ho\xE0n ti\u1EC1n.";
      room.payout = 0;
      return {
        mode: "refund",
        message: `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u{1F451} ${room.ownerName}: <b>${room.ownerRoll.join(" - ")}</b> (T\u1ED5ng <b>${room.ownerTotal}</b>)
\u2694\uFE0F ${room.challengerName}: <b>${room.challengerRoll.join(" - ")}</b> (T\u1ED5ng <b>${room.challengerTotal}</b>)
\u26A0\uFE0F ${room.resultReason}`,
        roomAnnouncement: `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u26A0\uFE0F Hai b\xEAn h\xF2a k\xE8o, ho\xE0n ti\u1EC1n.`
      };
    }
    winner = diff > 0 ? owner : challenger;
    loser = diff > 0 ? challenger : owner;
    resultReason = reason || "C\u1EA3 hai \u0111\xE3 tung x\xFAc x\u1EAFc, h\u1EC7 th\u1ED1ng ch\u1ED1t k\u1EBFt qu\u1EA3.";
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
    message: `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u{1F4B0} M\u1EE9c c\u01B0\u1EE3c m\u1ED7i b\xEAn: <b>${room.amount.toLocaleString("vi-VN")} xu</b>
\u{1F451} Ch\u1EE7 ph\xF2ng <b>${room.ownerName}</b>: <b>${room.ownerRoll ? room.ownerRoll.join(" - ") : "Ch\u01B0a tung"}</b>${room.ownerTotal !== null ? ` (T\u1ED5ng <b>${room.ownerTotal}</b>)` : ""}
\u2694\uFE0F \u0110\u1ED1i th\u1EE7 <b>${room.challengerName}</b>: <b>${room.challengerRoll ? room.challengerRoll.join(" - ") : "Ch\u01B0a tung"}</b>${room.challengerTotal !== null ? ` (T\u1ED5ng <b>${room.challengerTotal}</b>)` : ""}

\u{1F3C6} Ng\u01B0\u1EDDi th\u1EAFng: <b>${winner.name || `User****${String(winner.id).slice(-4)}`}</b>
\u{1F4B8} Tr\u1EA3 th\u01B0\u1EDFng: <b>${payout.toLocaleString("vi-VN")} xu</b> (${SOLO_PAYOUT_RATE.toFixed(2)})
\u{1F4CC} K\u1EBFt lu\u1EADn: ${resultReason}`,
    roomAnnouncement: formatSoloRoomAnnouncement(room, users)
  };
}
function processSoloRoomTimeouts() {
  const rooms = readSoloRooms();
  const users = readJson(userJsonFile);
  let changed = false;
  rooms.forEach((room) => {
    if (room.status !== "ROLLING" || !room.rollDeadlineAt || Date.now() < room.rollDeadlineAt) return;
    const result = finalizeSoloRoom(room, users, "H\u1EBFt 5 ph\xFAt, b\xEAn ch\u01B0a tung x\xFAc x\u1EAFc b\u1ECB x\u1EED thua.");
    clearSoloRoomPin(room);
    if (result) {
      if (room.ownerChatId) sendSoloReply(room.ownerChatId, result.message, { parse_mode: "HTML" });
      if (room.challengerChatId && String(room.challengerChatId) !== String(room.ownerChatId)) {
        sendSoloReply(room.challengerChatId, result.message, { parse_mode: "HTML" });
      }
      if (result.roomAnnouncement) sendSoloRoomAnnouncement(result.roomAnnouncement, { parse_mode: "HTML" });
    }
    changed = true;
  });
  if (changed) {
    writeJson(userJsonFile, users);
    writeSoloRooms(rooms);
  }
}
async function handleSoloRollAction(roomCode, actorId, replyChatId) {
  const soloRooms = readSoloRooms();
  const users = readJson(userJsonFile);
  const room = soloRooms.find((item) => item.code === roomCode);
  if (!room || room.status !== "ROLLING") {
    return { ok: false, callbackText: "Ph\xF2ng SOLO kh\xF4ng c\xF2n h\u1EE3p l\u1EC7.", showAlert: true };
  }
  if (![String(room.ownerId), String(room.challengerId || "")].includes(String(actorId))) {
    return { ok: false, callbackText: "B\u1EA1n kh\xF4ng thu\u1ED9c ph\xF2ng SOLO n\xE0y.", showAlert: true };
  }
  if (room.rollDeadlineAt && Date.now() > room.rollDeadlineAt) {
    processSoloRoomTimeouts();
    return { ok: false, callbackText: "\u0110\xE3 h\u1EBFt th\u1EDDi gian tung x\xFAc x\u1EAFc.", showAlert: true };
  }
  const isOwner = String(room.ownerId) === String(actorId);
  if (isOwner && room.ownerRoll || !isOwner && room.challengerRoll) {
    return { ok: false, callbackText: "B\u1EA1n \u0111\xE3 tung r\u1ED3i.", showAlert: false };
  }
  const diceValue = await sendSoloTelegramDice(replyChatId);
  if (!diceValue) {
    return { ok: false, callbackText: "Kh\xF4ng tung \u0111\u01B0\u1EE3c x\xFAc x\u1EAFc 3D Telegram, th\u1EED l\u1EA1i sau.", showAlert: true };
  }
  if (isOwner) {
    room.ownerRoll = [diceValue];
    room.ownerTotal = diceValue;
  } else {
    room.challengerRoll = [diceValue];
    room.challengerTotal = diceValue;
  }
  let replyMsg = `\u{1F3B2} <b>GAME SOLO X\xDAC X\u1EAEC</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${room.code}</code>
\u2705 B\u1EA1n \u0111\xE3 tung 1 vi\xEAn XX Telegram: <b>${diceValue}</b>`;
  if (room.ownerRoll && room.challengerRoll) {
    const result = finalizeSoloRoom(room, users);
    writeJson(userJsonFile, users);
    writeSoloRooms(soloRooms);
    if (result) {
      sendSoloReply(room.ownerChatId, result.message, { parse_mode: "HTML" });
      if (room.challengerChatId && String(room.challengerChatId) !== String(room.ownerChatId)) {
        sendSoloReply(room.challengerChatId, result.message, { parse_mode: "HTML" });
      }
      if (result.roomAnnouncement) sendSoloRoomAnnouncement(result.roomAnnouncement, { parse_mode: "HTML" });
    }
    return { ok: true, callbackText: `B\u1EA1n \u0111\xE3 tung ${diceValue}` };
  }
  writeSoloRooms(soloRooms);
  replyMsg += `
\u23F3 \u0110ang ch\u1EDD \u0111\u1ED1i th\u1EE7 tung x\xFAc x\u1EAFc.`;
  sendSoloReply(replyChatId, replyMsg, { parse_mode: "HTML" });
  return { ok: true, callbackText: `B\u1EA1n \u0111\xE3 tung ${diceValue}` };
}
function rollSoloDiceSet() {
  return [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
}
function rollSoloBattleResult() {
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
function resetBettingSession() {
  state.totalBetT = state.totalBetX = state.totalBetC = state.totalBetL = state.totalBetTC = state.totalBetTL = state.totalBetXC = state.totalBetXL = 0;
  state.userBetsTX = {};
  state.userBetsCL = {};
  state.userBetsXien = {};
  state.userBetsDice = {};
  state.userBetsSum = {};
  state.betsLog = [];
  state.isProcessing = false;
  state.phienAnnounced = false;
}
function checkSpecialRoll(dice) {
  return dice.every((v) => v === dice[0]) && (dice[0] === 1 || dice[0] === 6);
}
function distributePotToWinners(potAmount, winners) {
  const winnersArray = Object.entries(winners);
  if (winnersArray.length === 0) return [];
  const totalBetAmount = winnersArray.reduce((acc, cur) => acc + cur[1], 0);
  if (winnersArray.length === 1) {
    return [{ userId: winnersArray[0][0], winAmount: Math.floor(potAmount * 0.7) }];
  }
  return winnersArray.map(([userId, amount]) => ({
    userId,
    winAmount: Math.floor(potAmount * 0.7 * (amount / totalBetAmount))
  }));
}
function handlePot(potAmount, betters = [], winners = {}) {
  const payouts = distributePotToWinners(potAmount, winners);
  let users = readJson(userJsonFile);
  const winnerDetails = [];
  payouts.forEach(({ userId, winAmount }) => {
    const user = users.find((u) => String(u.id) === String(userId));
    if (user) {
      user.sd = (user.sd || 0) + winAmount;
      if (user.money !== void 0) user.money = (user.money || 0) + winAmount;
      winnerDetails.push({ userId, name: user.name || `User****${String(userId).slice(-4)}`, winAmount });
    } else {
      winnerDetails.push({ userId, name: `User****${String(userId).slice(-4)}`, winAmount });
    }
    bot1.sendMessage(userId, `\u{1F389} N\u1ED4 H\u0168 ROOM R\u1ED2NG PHI\xCAN #${state.phien}! B\u1EA1n nh\u1EADn \u0111\u01B0\u1EE3c +${winAmount.toLocaleString("vi-VN")} xu!`).catch(() => {
    });
  });
  const remainingPot = payouts.length > 0 ? Math.floor(potAmount * 0.3) : potAmount;
  let huData = { pot: remainingPot, history: [], autoPotRate: state.autoPotRate, lessBetWinsRate: state.lessBetWinsRate };
  try {
    const raw = readJson("hu.json");
    huData.history = raw.history || [];
  } catch {
  }
  huData.pot = remainingPot;
  if (!huData.history) huData.history = [];
  if (payouts.length > 0) {
    huData.history.unshift({
      phien: state.phien,
      time: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
      potAmount,
      winners: winnerDetails
    });
    if (huData.history.length > 50) huData.history.pop();
  }
  writeJson("hu.json", huData);
  writeJson(userJsonFile, users);
  const listWinnersText = payouts.length > 0 ? payouts.map((w, i) => `${i + 1}. <b>****${String(w.userId).slice(-4)}</b> | +<b>${w.winAmount.toLocaleString("vi-VN")} xu</b>`).join("\n") : `<i>H\u0169 b\u1EA3o to\xE0n sang phi\xEAn ti\u1EBFp theo!</i>`;
  const msg = `\u{1F451} <b>N\u1ED4 H\u0168 ROOM R\u1ED2NG PHI\xCAN #${state.phien}</b> \u{1F451}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F525} <b>Gi\xE1 tr\u1ECB n\u1ED5 h\u0169:</b> <b>${potAmount.toLocaleString("vi-VN")} xu</b>
\u{1F3C6} <b>Ng\u01B0\u1EDDi nh\u1EADn h\u0169:</b>
${listWinnersText}
\u{1F48E} B\u1EA3o l\u01B0u ban \u0111\u1EA7u: <b>${remainingPot.toLocaleString("vi-VN")} xu</b>.
\u{1F4AC} <a href="${gameRoomLink}">B\u1EA5m nhanh v\xE0o ph\xF2ng c\u01B0\u1EE3c</a>`;
  const potMessageOptions = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [[{ text: "\u{1F4AC} V\xE0o ph\xF2ng c\u01B0\u1EE3c ngay", url: gameRoomLink }]]
    }
  };
  bot2.sendMessage(groupt, msg, potMessageOptions).then((s) => {
    pinGroupMessageWithResilience(groupt, s.message_id);
  }).catch(() => {
  });
  betters.forEach((uid) => {
    bot1.sendMessage(uid, msg, potMessageOptions).catch(() => {
    });
  });
}
async function sendDice() {
  state.isProcessing = true;
  const diceResults = [];
  const diffTX = Math.abs(state.totalBetT - state.totalBetX);
  const diffCL = Math.abs(state.totalBetC - state.totalBetL);
  let targetTX = null;
  let targetCL = null;
  if (diffTX > 0 || diffCL > 0) {
    if (diffTX >= diffCL) {
      targetTX = state.totalBetT < state.totalBetX ? "T\xC0I" : "X\u1EC8U";
    } else {
      targetCL = state.totalBetC < state.totalBetL ? "CH\u1EAEN" : "L\u1EBA";
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
    while (!matched && attempts < 1e3) {
      attempts++;
      diceResults.length = 0;
      diceResults.push(
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      );
      const sum = diceResults[0] + diceResults[1] + diceResults[2];
      const sumCat2 = sum > 10 ? "T\xC0I" : "X\u1EC8U";
      const clCat2 = sum % 2 === 0 ? "CH\u1EAEN" : "L\u1EBA";
      let txMatch = !shouldRig || !targetTX || sumCat2 === targetTX;
      let clMatch = !shouldRig || !targetCL || clCat2 === targetCL;
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
  await new Promise((resolve) => setTimeout(resolve, 3e3));
  if (state.chatLocked) unlockGroupChat();
  const telegramDiceValue = diceResults[0] || Math.floor(Math.random() * 6) + 1;
  const sumOfResults = diceResults.reduce((a, b) => a + b, 0);
  const sumCat = sumOfResults > 10 ? "T\xC0I" : "X\u1EC8U";
  const clCat = sumOfResults % 2 === 0 ? "CH\u1EAEN" : "L\u1EBA";
  const taixiuEmoji = sumCat === "T\xC0I" ? "\u{1F535}" : "\u{1F534}";
  const chanleEmoji = clCat === "CH\u1EAEN" ? "\u26AA" : "\u26AB";
  let potAmount = 1e4;
  try {
    const rawHU = readJson("hu.json");
    potAmount = rawHU.pot || 1e4;
  } catch (e) {
  }
  let users = readJson(userJsonFile);
  let totalWin = 0, totalLoss = 0, potIncrease = 0;
  const playerReports = {};
  const winTXTotal = sumCat === "T\xC0I" ? state.totalBetT : state.totalBetX;
  const loseTXTotal = sumCat === "T\xC0I" ? state.totalBetX : state.totalBetT;
  const isTxPotEligible = winTXTotal <= loseTXTotal;
  const winCLTotal = clCat === "CH\u1EAEN" ? state.totalBetC : state.totalBetL;
  const loseCLTotal = clCat === "CH\u1EAEN" ? state.totalBetL : state.totalBetC;
  const isClPotEligible = winCLTotal <= loseCLTotal;
  const winningXien = sumCat === "T\xC0I" ? clCat === "CH\u1EAEN" ? "tc" : "tl" : clCat === "CH\u1EAEN" ? "xc" : "xl";
  let betTC = 0, betTL = 0, betXC = 0, betXL = 0;
  Object.entries(state.userBetsXien).forEach(([_, bet]) => {
    if (bet.betType === "tc") betTC += bet.amount;
    if (bet.betType === "tl") betTL += bet.amount;
    if (bet.betType === "xc") betXC += bet.amount;
    if (bet.betType === "xl") betXL += bet.amount;
  });
  const winXienTotal = winningXien === "tc" ? betTC : winningXien === "tl" ? betTL : winningXien === "xc" ? betXC : betXL;
  const totalXienBet = betTC + betTL + betXC + betXL;
  const isXienPotEligible = winXienTotal <= totalXienBet - winXienTotal;
  Object.entries(state.userBetsTX).forEach(([userId, bet]) => {
    const isWin = bet.betType === "t" && sumCat === "T\xC0I" || bet.betType === "x" && sumCat === "X\u1EC8U";
    const usr = users.find((u) => String(u.id) === String(userId));
    if (usr) {
      const payout = isWin ? Math.floor(bet.amount * 1.92) : 0;
      if (isWin) {
        usr.sd = (usr.sd || 0) + payout;
        if (usr.money !== void 0) usr.money = (usr.money || 0) + payout;
        usr.thang = (usr.thang || 0) + payout;
        totalWin += payout;
      } else {
        usr.thua = (usr.thua || 0) + bet.amount;
        awardReferralCommission(users, usr, bet.amount);
        if (isTxPotEligible) potIncrease += Math.floor(bet.amount * 0.02 * 0.75);
        totalLoss += bet.amount;
      }
      if (!playerReports[userId]) playerReports[userId] = [];
      playerReports[userId].push({ category: "TX", betType: bet.betType === "t" ? "T\xC0I" : "X\u1EC8U", amount: bet.amount, isWin, payout });
    }
  });
  Object.entries(state.userBetsCL).forEach(([userId, bet]) => {
    const isWin = bet.betType === "c" && clCat === "CH\u1EAEN" || bet.betType === "l" && clCat === "L\u1EBA";
    const usr = users.find((u) => String(u.id) === String(userId));
    if (usr) {
      const payout = isWin ? Math.floor(bet.amount * 1.92) : 0;
      if (isWin) {
        usr.sd = (usr.sd || 0) + payout;
        if (usr.money !== void 0) usr.money = (usr.money || 0) + payout;
        usr.thang = (usr.thang || 0) + payout;
        totalWin += payout;
      } else {
        usr.thua = (usr.thua || 0) + bet.amount;
        awardReferralCommission(users, usr, bet.amount);
        if (isClPotEligible) potIncrease += Math.floor(bet.amount * 0.02 * 0.75);
        totalLoss += bet.amount;
      }
      if (!playerReports[userId]) playerReports[userId] = [];
      playerReports[userId].push({ category: "CL", betType: bet.betType === "c" ? "CH\u1EAEN" : "L\u1EBA", amount: bet.amount, isWin, payout });
    }
  });
  Object.entries(state.userBetsXien).forEach(([userId, bet]) => {
    const isWin = bet.betType === winningXien;
    const usr = users.find((u) => String(u.id) === String(userId));
    if (usr) {
      const payout = isWin ? Math.floor(bet.amount * 2.5) : 0;
      if (isWin) {
        usr.sd = (usr.sd || 0) + payout;
        if (usr.money !== void 0) usr.money = (usr.money || 0) + payout;
        usr.thang = (usr.thang || 0) + payout;
        totalWin += payout;
      } else {
        usr.thua = (usr.thua || 0) + bet.amount;
        awardReferralCommission(users, usr, bet.amount);
        if (isXienPotEligible) potIncrease += Math.floor(bet.amount * 0.02 * 0.75);
        totalLoss += bet.amount;
      }
      if (!playerReports[userId]) playerReports[userId] = [];
      playerReports[userId].push({ category: "XI\xCAN", betType: bet.betType.toUpperCase(), amount: bet.amount, isWin, payout });
    }
  });
  if (state.userBetsDice) {
    Object.entries(state.userBetsDice).forEach(([userId, bets]) => {
      bets.forEach((bet) => {
        const normalizedType = String(bet.betType || "").toLowerCase();
        const numToMatch = parseInt(normalizedType.replace("d", ""), 10);
        const isWin = isTelegramXXBetType(normalizedType) ? isTelegramXXWin(normalizedType, telegramDiceValue) : diceResults.includes(numToMatch);
        const usr = users.find((u) => String(u.id) === String(userId));
        if (usr) {
          const payout = isWin ? Math.floor(bet.amount * (isTelegramXXBetType(normalizedType) ? TELEGRAM_XX_PAYOUT_RATE : 1.93)) : 0;
          if (isWin) {
            usr.sd = (usr.sd || 0) + payout;
            if (usr.money !== void 0) usr.money = (usr.money || 0) + payout;
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
  if (state.userBetsSum) {
    Object.entries(state.userBetsSum).forEach(([userId, bets]) => {
      bets.forEach((bet) => {
        const sumToMatch = parseInt(bet.betType.replace("sb", ""), 10);
        const isWin = sumOfResults === sumToMatch;
        const usr = users.find((u) => String(u.id) === String(userId));
        if (usr) {
          const payout = isWin ? Math.floor(bet.amount * 2.3) : 0;
          if (isWin) {
            usr.sd = (usr.sd || 0) + payout;
            if (usr.money !== void 0) usr.money = (usr.money || 0) + payout;
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
  if (totalWin > totalLoss) potIncrease = 0;
  potAmount = Math.floor(potAmount + potIncrease);
  Object.entries(playerReports).forEach(([uid, bets]) => {
    const usr = users.find((u) => String(u.id) === String(uid));
    if (usr) {
      if (!usr.betHistory) usr.betHistory = [];
      let net = 0;
      bets.forEach((b) => net += b.isWin ? b.payout - b.amount : -b.amount);
      updateUserStreakAfterRound(usr, state.phien, net);
      usr.betHistory.push({
        phien: state.phien,
        time: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        dice: diceResults.join("-"),
        total: sumOfResults,
        result: `${sumCat} ${clCat}`,
        bets: bets.map((b) => ({ category: b.category, betType: b.betType, amount: b.amount, isWin: b.isWin, payout: b.payout })),
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
  if (currentCai.value) {
    const bankerId = String(currentCai.value.id);
    const bankerUser = users.find((u) => String(u.id) === bankerId);
    let totalBetsPlaced = 0;
    if (state.userBetsTX) Object.values(state.userBetsTX).forEach((b) => totalBetsPlaced += b.amount);
    if (state.userBetsCL) Object.values(state.userBetsCL).forEach((b) => totalBetsPlaced += b.amount);
    if (state.userBetsXien) Object.values(state.userBetsXien).forEach((b) => totalBetsPlaced += b.amount);
    if (state.userBetsDice) Object.values(state.userBetsDice).forEach((arr) => arr.forEach((b) => totalBetsPlaced += b.amount));
    if (state.userBetsSum) Object.values(state.userBetsSum).forEach((arr) => arr.forEach((b) => totalBetsPlaced += b.amount));
    const netResult = totalBetsPlaced - totalWin;
    let finalPool = currentCai.value.pool + netResult;
    if (finalPool < 0) finalPool = 0;
    if (bankerUser) {
      const originalSd = bankerUser.sd !== void 0 ? bankerUser.sd : bankerUser.money || 0;
      const newSd = Math.floor(originalSd + finalPool);
      bankerUser.sd = newSd;
      if (bankerUser.money !== void 0) bankerUser.money = newSd;
      if (!bankerUser.depositHistory) bankerUser.depositHistory = [];
      bankerUser.depositHistory.unshift({
        time: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
        amount: finalPool.toLocaleString("vi-VN"),
        status: `K\u1EBFt to\xE1n L\xE0m C\xE1i phi\xEAn #${state.phien} (${netResult >= 0 ? "+" : ""}${netResult.toLocaleString("vi-VN")} xu)`
      });
    }
    const bankerMsg = `\u{1F451} <b>K\u1EBET TO\xC1N L\xC0M C\xC1I PHI\xCAN #${state.phien}</b>
\u{1F3B0} Ch\u1EE7 c\xE1i: <b>${currentCai.value.name}</b>
\u{1F4B5} Ti\u1EC1n l\xE0m c\xE1i: <b>${currentCai.value.pool.toLocaleString("vi-VN")} xu</b>
\u{1F4B5} T\u1ED5ng c\u01B0\u1EE3c nh\u1EADn: <b>${totalBetsPlaced.toLocaleString("vi-VN")} xu</b>
\u{1F4B8} T\u1ED5ng tr\u1EA3 th\u01B0\u1EDFng: <b>${totalWin.toLocaleString("vi-VN")} xu</b>
\u{1F4CA} Bi\u1EBFn \u0111\u1ED9ng: <b>${netResult >= 0 ? "\u{1F7E2} +" + netResult.toLocaleString("vi-VN") : "\u{1F534} -" + Math.abs(netResult).toLocaleString("vi-VN")} xu</b>
\u{1F3E6} Nh\u1EADn l\u1EA1i s\u1ED1 d\u01B0: <b>${finalPool.toLocaleString("vi-VN")} xu</b>`;
    bot1.sendMessage(bankerId, bankerMsg, { parse_mode: "HTML" }).catch(() => {
    });
    sendMessageToRoom(bankerMsg, { parse_mode: "HTML" });
  }
  writeJson("hu.json", { pot: potAmount });
  writeJson(userJsonFile, users);
  Object.entries(playerReports).forEach(([uid, bets]) => {
    const usr = users.find((u) => String(u.id) === String(uid));
    if (!usr) return;
    let msg = `\u{1F514} <b>B\xC1O C\xC1O C\u01AF\u1EE2C PHI\xCAN #${state.phien}</b>
\u{1F3B2} Kq: <b>${diceResults.join(" - ")}</b> (T\u1ED5ng: <b>${sumOfResults}</b>) \u{1F449} <b>${sumCat}</b> - <b>${clCat}</b>
\u{1F3AF} XX Telegram: <b>${telegramDiceValue}</b>

\u{1F9FE} <b>L\u1EC7nh \u0111\u1EB7t:</b>
`;
    let net = 0;
    bets.forEach((b) => {
      const labelType = typeof b.betType === "function" ? clCat === "CH\u1EAEN" ? "CH\u1EAEN" : "L\u1EBA" : b.betType;
      if (b.isWin) {
        msg += `\u{1F7E2} Th\u1EAFng: <b>${b.category}</b> (<code>${labelType}</code>) | C\u01B0\u1EE3c <b>${b.amount.toLocaleString("vi-VN")}</b> | +<b>${b.payout.toLocaleString("vi-VN")} xu</b>
`;
        net += b.payout - b.amount;
      } else {
        msg += `\u{1F534} Thua: <b>${b.category}</b> (<code>${labelType}</code>) | C\u01B0\u1EE3c -<b>${b.amount.toLocaleString("vi-VN")} xu</b>
`;
        net -= b.amount;
      }
    });
    msg += `
\u{1F4CA} Bi\u1EBFn \u0111\u1ED9ng: ${net >= 0 ? "\u{1F7E2} +" + net.toLocaleString("vi-VN") : "\u{1F534} -" + Math.abs(net).toLocaleString("vi-VN")} xu
\u{1F525} D\xE2y hi\u1EC7n t\u1EA1i: <b>${getUserStreakStatusText(usr, state.phien)}</b>
\u{1F4B5} S\u1ED1 d\u01B0: <b>${Math.floor(usr.sd || usr.money || 0).toLocaleString("vi-VN")} xu</b>`;
    bot1.sendMessage(uid, msg, { parse_mode: "HTML" }).catch(() => {
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
  const quayPrize = Math.floor(Math.random() * 9) + 1;
  const recentTxStats = cauList.slice(0, 12).reverse().join("");
  const recentClStats = chanleList.slice(0, 12).reverse().join("");
  const boldDiceResults = diceResults.map((item) => toBoldDigits(item)).join("  ");
  const boldSumOfResults = toBoldDigits(sumOfResults);
  const boldQuayPrize = toBoldDigits(quayPrize);
  const boldTotalWin = toBoldDigits(totalWin.toLocaleString("vi-VN"));
  const boldTotalLoss = toBoldDigits(totalLoss.toLocaleString("vi-VN"));
  const boldPotIncrease = toBoldDigits(potIncrease.toLocaleString("vi-VN"));
  const boldPotAmount = toBoldDigits(potAmount.toLocaleString("vi-VN"));
  const lobbyMsg = `\u{1F3B2} <b>K\u1EBFt qu\u1EA3 XX phi\xEAn #${state.phien}</b>
<pre>\u250F\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2513
\u2503  ${boldDiceResults}  \u{1F449}[${boldSumOfResults}] ${sumCat} ${clCat} ${taixiuEmoji}${chanleEmoji}
\u2503 \u{1F3A1} Gi\u1EA3i s\u1ED1 c\u01B0\u1EE3c v\xF2ng quay: ${boldQuayPrize} (1-9)
\u2503
\u2503 T\u1ED5ng th\u1EAFng: ${boldTotalWin}
\u2503 T\u1ED5ng thua: ${boldTotalLoss}
\u2503 C\u1ED9ng h\u0169  : +${boldPotIncrease}
\u2503 H\u0169 hi\u1EC7n t\u1EA1i: ${boldPotAmount}
\u2517\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u251B</pre>
Th\u1ED1ng k\xEA k\u1EBFt qu\u1EA3 g\u1EA7n \u0111\xE2y:

${recentTxStats}
    
${recentClStats}`;
  const lobbySent = await bot2.sendMessage(groupt, lobbyMsg, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [[
        { text: "\u{1F4B5} N\u1EA1p Ti\u1EC1n Ngay", url: `https://t.me/${botUsernames[0]}` },
        { text: "\u{1F4CA} L\u1ECBch S\u1EED Phi\xEAn", url: "https://t.me/lichsuphiendragon" }
      ]]
    }
  }).catch(() => null);
  const resultToGroup = `\u{1F3B2} K\u1EBFt qu\u1EA3 phi\xEAn ${state.phien} \u{1F3B2}
 ${diceResults.join("  ")} \u{1F449} ${sumCat} ${clCat} ${taixiuEmoji} ${chanleEmoji}`;
  bot2.sendMessage("-1004298002180", resultToGroup).catch(() => {
  });
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
    const betters = Array.from(/* @__PURE__ */ new Set([
      ...Object.keys(state.userBetsTX || {}),
      ...Object.keys(state.userBetsCL || {}),
      ...Object.keys(state.userBetsXien || {}),
      ...Object.keys(state.userBetsDice || {}),
      ...Object.keys(state.userBetsSum || {})
    ]));
    const winnersDict = {};
    for (const uid of betters) {
      const bets = playerReports?.[uid] || [];
      const wins = bets.filter((b) => b.isWin === true);
      if (wins.length > 0) {
        winnersDict[uid] = wins.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
      }
    }
    handlePot(potAmount, betters, winnersDict);
  }
  currentCai.value = null;
  waitingCai.value = false;
  if (caiTimeout.value) {
    clearTimeout(caiTimeout.value);
    caiTimeout.value = null;
  }
  const lamCaiText = `\u23F0 <b>C\xF2n 20s \u0111\u1EC3 L\xC0M C\xC1I phi\xEAn #${state.phien + 1}</b>
\u2705 <code>/lamcai [s\u1ED1 ti\u1EC1n]</code> (1.000.000 - 5.000.000)`;
  if (lobbySent) {
    await bot2.sendMessage(groupt, lamCaiText, { parse_mode: "HTML" }).catch(() => {
    });
  } else {
    sendMessageToRoom(lamCaiText, { parse_mode: "HTML" });
  }
  waitingCai.value = true;
  caiTimeout.value = setTimeout(() => {
    waitingCai.value = false;
    let pot = 1e4;
    try {
      pot = readJson("hu.json").pot || 1e4;
    } catch {
    }
    state.phienAnnounced = true;
    sendMessageToRoom(`\u{1F514} Phi\xEAn c\u01B0\u1EE3c th\u1EE9 #${state.phien} b\u1EAFt \u0111\u1EA7u!
H\u0169 r\u1ED3ng v\xE0ng: ${pot.toLocaleString("vi-VN")} xu!`, {
      reply_markup: {
        inline_keyboard: [[{ text: "\u26A1 N\u1EA1p Ti\u1EC1n Ngay", url: `https://t.me/${botUsernames[0]}` }]]
      }
    });
    sendMessageToRoom(`\u{1F4DD} Xin m\u1EDDi \u0111\u1EB7t c\u01B0\u1EE3c phi\xEAn #${state.phien} - Ti\u1EC1n c\u01B0\u1EE3c t\u1ED1i thi\u1EC3u 1.000 v\xE0 t\u1ED1i \u0111a 5.000.000
C\xE1ch ch\u01A1i: [C\u1EEDa c\u01B0\u1EE3c] [s\u1ED1 ti\u1EC1n]
- T/X/C/L
- D1, D2,... D6
- SB3 - SB18
- TC, TL, XC, XL
C\xFA ph\xE1p c\u01B0\u1EE3c s\u1EA3nh k\u1ECBch t\xEDnh:
<code>t 50000</code> ho\u1EB7c <code>c 100000</code>`, { parse_mode: "HTML" });
  }, 2e4);
  state.gamePhase = "REVEALING";
  state.secondsLeft = 12;
}
function tickGameLoop() {
  try {
    processSoloRoomTimeouts();
    const nowVN = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh");
    const todayStr = nowVN.format("YYYY/MM/DD");
    const lbStateFile = "leaderboard_state.json";
    if (import_fs.default.existsSync(lbStateFile)) {
      let lbState = JSON.parse(import_fs.default.readFileSync(lbStateFile, "utf8"));
      if (lbState.lastResetDay && lbState.lastResetDay !== todayStr) {
        const yesterdayStr = lbState.lastResetDay;
        const users = readJson(userJsonFile);
        const latestCompletedPhien = getLatestCompletedPhien();
        const leaderboard = buildDailyStreakLeaderboard(users, yesterdayStr, latestCompletedPhien);
        let sumAnnounce = `\u{1F3C6} <b>BXH D\xC2Y TH\u1EAENG / D\xC2Y THUA H\xD4M QUA (${yesterdayStr})</b> \u{1F3C6}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
`;
        if (leaderboard.length === 0) {
          sumAnnounce += `<i>Ch\u01B0a c\xF3 ai \u0111\u1EA1t d\xE2y th\u1EAFng ho\u1EB7c d\xE2y thua t\u1EEB ${DAILY_STREAK_MIN} phi\xEAn li\xEAn ti\u1EBFp tr\u1EDF l\xEAn v\xE0 kh\xF4ng b\u1ECF l\u1EE1 phi\xEAn n\xE0o.</i>`;
        } else {
          leaderboard.slice(0, 10).forEach((entry, i) => {
            const u = entry.user;
            const streak = entry.streak;
            const prizeTag = i === 0 ? `\u{1F947} [Giftcode ${DAILY_STREAK_PRIZES[0].toLocaleString("vi-VN")} xu]` : i === 1 ? `\u{1F948} [Giftcode ${DAILY_STREAK_PRIZES[1].toLocaleString("vi-VN")} xu]` : i === 2 ? `\u{1F949} [Giftcode ${DAILY_STREAK_PRIZES[2].toLocaleString("vi-VN")} xu]` : "\u{1F397}\uFE0F [Vinh danh]";
            sumAnnounce += `${i + 1}. player <b>${u.name || `User****${String(u.id).slice(-4)}`}</b> | ${streak.label}: <b>${streak.count}</b> phi\xEAn
   \u{1F449} ${prizeTag}
`;
          });
        }
        const topWinners = leaderboard.slice(0, 3);
        const giftData = readJson(giftJsonFile);
        const existingCodes = new Set((giftData || []).map((g) => String(g.gift)));
        topWinners.forEach((entry, idx) => {
          const u = entry.user;
          const streak = entry.streak;
          const prizePower = DAILY_STREAK_PRIZES[idx];
          const code = generateAutoRewardGiftCode(existingCodes, idx + 1);
          giftData.push({
            gift: code,
            value: prizePower,
            creatorId: "AUTO_DAILY_STREAK",
            createTime: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
            useTime: null,
            userIdUsed: null
          });
          sendResilientReply(
            u.id,
            `\u{1F389} <b>Th\u01B0\u1EDFng BXH d\xE2y ng\xE0y ${yesterdayStr}</b>
\u{1F3C6} H\u1EA1ng: <b>TOP ${idx + 1}</b>
\u{1F525} Th\xE0nh t\xEDch: <b>${streak.label} ${streak.count} phi\xEAn</b>
\u{1F381} Giftcode: <code>/code ${code}</code>
\u{1F48E} M\u1EC7nh gi\xE1: <b>${prizePower.toLocaleString("vi-VN")} xu</b>
\u23F0 H\u1EC7 th\u1ED1ng t\u1EF1 trao l\xFAc 00:00.`,
            { parse_mode: "HTML" }
          );
        });
        writeJson(giftJsonFile, giftData);
        sendMessageToRoom(sumAnnounce, { parse_mode: "HTML" });
        users.forEach((u) => {
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
        list.forEach((b) => diceBetSum += b.amount);
      });
    }
    let sumBetSum = 0;
    if (state.userBetsSum) {
      Object.entries(state.userBetsSum).forEach(([uid, list]) => {
        list.forEach((b) => sumBetSum += b.amount);
      });
    }
    const totalMoneyBetted = state.totalBetT + state.totalBetX + state.totalBetC + state.totalBetL + state.totalBetTC + state.totalBetTL + state.totalBetXC + state.totalBetXL + diceBetSum + sumBetSum;
    const activeBetsCount = Object.keys(state.userBetsTX || {}).length + Object.keys(state.userBetsCL || {}).length + Object.keys(state.userBetsXien || {}).length + Object.keys(state.userBetsDice || {}).length + Object.keys(state.userBetsSum || {}).length;
    if (activeBetsCount > 0 && totalMoneyBetted > 0) {
      if ([45, 30, 20, 10].includes(state.secondsLeft)) {
        const xienParts = [];
        if (state.totalBetTC > 0) xienParts.push(`TC: ${state.totalBetTC.toLocaleString("vi-VN")}`);
        if (state.totalBetTL > 0) xienParts.push(`TL: ${state.totalBetTL.toLocaleString("vi-VN")}`);
        if (state.totalBetXC > 0) xienParts.push(`XC: ${state.totalBetXC.toLocaleString("vi-VN")}`);
        if (state.totalBetXL > 0) xienParts.push(`XL: ${state.totalBetXL.toLocaleString("vi-VN")}`);
        const totalXien = state.totalBetTC + state.totalBetTL + state.totalBetXC + state.totalBetXL;
        const xienDetails = xienParts.length > 0 ? `
\u{1F9E9} XI\xCAN: ${totalXien.toLocaleString("vi-VN")} (${xienParts.join(" | ")})` : "";
        const diceTotals = {};
        if (state.userBetsDice) {
          Object.values(state.userBetsDice).forEach((list) => {
            list.forEach((b) => {
              const key = b.betType.toUpperCase();
              diceTotals[key] = (diceTotals[key] || 0) + b.amount;
            });
          });
        }
        const diceParts = Object.entries(diceTotals).sort((a, b) => a[0].localeCompare(b[0])).map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
        const totalDice = Object.values(diceTotals).reduce((sum, val) => sum + val, 0);
        const diceDetails = diceParts.length > 0 ? `
\u{1F3B2} D: ${totalDice.toLocaleString("vi-VN")} (${diceParts.join(" | ")})` : "";
        const sumTotals = {};
        if (state.userBetsSum) {
          Object.values(state.userBetsSum).forEach((list) => {
            list.forEach((b) => {
              const key = b.betType.toUpperCase();
              sumTotals[key] = (sumTotals[key] || 0) + b.amount;
            });
          });
        }
        const sumParts = Object.entries(sumTotals).sort((a, b) => {
          const numA = parseInt(a[0].replace("SB", ""), 10) || 0;
          const numB = parseInt(b[0].replace("SB", ""), 10) || 0;
          return numA - numB;
        }).map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
        const totalSum = Object.values(sumTotals).reduce((sum, val) => sum + val, 0);
        const sumDetails = sumParts.length > 0 ? `
\u{1F4CA} SB: ${totalSum.toLocaleString("vi-VN")} (${sumParts.join(" | ")})` : "";
        let counters = `\u23F0 <b>C\xF2n ${state.secondsLeft} gi\xE2y phi\xEAn #${state.phien}</b>
\u{1F535} T\xC0I: ${state.totalBetT.toLocaleString("vi-VN")}
\u{1F534} X\u1EC8U: ${state.totalBetX.toLocaleString("vi-VN")}

\u26AA\uFE0F CH\u1EB4N: ${state.totalBetC.toLocaleString("vi-VN")}
\u26AB\uFE0F L\u1EBA: ${state.totalBetL.toLocaleString("vi-VN")}`;
        counters += xienDetails;
        counters += diceDetails;
        counters += sumDetails;
        sendMessageToRoom(counters, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "\u26A1 N\u1EA1p Ti\u1EC1n Ngay", url: `https://t.me/${botUsernames[0]}` }]]
          }
        });
      }
    }
    if (state.secondsLeft <= 0) {
      if (activeBetsCount === 0 || totalMoneyBetted === 0) {
        state.phienAnnounced = false;
        state.secondsLeft = 60;
        return;
      }
      lockGroupChat();
      const xienParts = [];
      if (state.totalBetTC > 0) xienParts.push(`TC: ${state.totalBetTC.toLocaleString("vi-VN")}`);
      if (state.totalBetTL > 0) xienParts.push(`TL: ${state.totalBetTL.toLocaleString("vi-VN")}`);
      if (state.totalBetXC > 0) xienParts.push(`XC: ${state.totalBetXC.toLocaleString("vi-VN")}`);
      if (state.totalBetXL > 0) xienParts.push(`XL: ${state.totalBetXL.toLocaleString("vi-VN")}`);
      const totalXien = state.totalBetTC + state.totalBetTL + state.totalBetXC + state.totalBetXL;
      const xienDetails = xienParts.length > 0 ? `\u{1F9E9} XI\xCAN: ${totalXien.toLocaleString("vi-VN")} (${xienParts.join(" | ")})` : "";
      const diceTotals = {};
      if (state.userBetsDice) {
        Object.values(state.userBetsDice).forEach((list) => {
          list.forEach((b) => {
            const key = String(b.betType || "").toUpperCase();
            if (!key) return;
            diceTotals[key] = (diceTotals[key] || 0) + (b.amount || 0);
          });
        });
      }
      const diceParts = Object.entries(diceTotals).filter(([, val]) => (val || 0) > 0).sort((a, b) => a[0].localeCompare(b[0])).map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
      const totalDice = diceParts.length > 0 ? Object.values(diceTotals).reduce((sum, val) => sum + (val || 0), 0) : 0;
      const diceDetails = diceParts.length > 0 ? `\u{1F3B2} D: ${totalDice.toLocaleString("vi-VN")} (${diceParts.join(" | ")})` : "";
      const sumTotals = {};
      if (state.userBetsSum) {
        Object.values(state.userBetsSum).forEach((list) => {
          list.forEach((b) => {
            const key = String(b.betType || "").toUpperCase();
            if (!key) return;
            sumTotals[key] = (sumTotals[key] || 0) + (b.amount || 0);
          });
        });
      }
      const sumParts = Object.entries(sumTotals).filter(([, val]) => (val || 0) > 0).sort((a, b) => {
        const numA = parseInt(a[0].replace("SB", ""), 10) || 0;
        const numB = parseInt(b[0].replace("SB", ""), 10) || 0;
        return numA - numB;
      }).map(([key, val]) => `${key}: ${val.toLocaleString("vi-VN")}`);
      const totalSum = sumParts.length > 0 ? Object.values(sumTotals).reduce((sum, val) => sum + (val || 0), 0) : 0;
      const sumDetails = sumParts.length > 0 ? `\u{1F4CA} SB: ${totalSum.toLocaleString("vi-VN")} (${sumParts.join(" | ")})` : "";
      let lockedMsg = `H\u1EBFt th\u1EDDi gian \u0111\u1EB7t c\u01B0\u1EE3c phi\xEAn #${state.phien}
\u{1F535} T\xC0I: ${state.totalBetT.toLocaleString("vi-VN")}
\u{1F534} X\u1EC8U: ${state.totalBetX.toLocaleString("vi-VN")}

\u26AA\uFE0F CH\u1EB4N: ${state.totalBetC.toLocaleString("vi-VN")}
\u26AB\uFE0F L\u1EBA: ${state.totalBetL.toLocaleString("vi-VN")}`;
      const extraBlocks = [xienDetails, diceDetails, sumDetails].filter(Boolean);
      if (extraBlocks.length > 0) lockedMsg += `

${extraBlocks.join("\n")}`;
      sendMessageToRoom(lockedMsg, { parse_mode: "HTML" });
      state.gamePhase = "LOCKED";
      state.secondsLeft = 10;
    }
  } else if (state.gamePhase === "LOCKED") {
    state.secondsLeft -= 1;
    if (state.secondsLeft <= 0) {
      state.gamePhase = "ROLLING";
      sendMessageToRoom(`\u{1F4A5} B\u1EAFt \u0111\u1EA7u tung XX phi\xEAn #${state.phien} \u{1F4A5}`, { parse_mode: "HTML" });
      setTimeout(() => {
        sendMessageToRoom(`\u{1F3B2} Tung XX phi\xEAn #${state.phien}...`, { parse_mode: "HTML" });
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
function registerAllBotCommands() {
  const onAdminCommand = (regex, handler) => {
    const wrap = (bot, msg, match) => {
      if (isAdminUser(msg.from?.id)) handler(bot, msg, match);
    };
    bot4.onText(regex, (msg, match) => wrap(bot4, msg, match));
    bot1.onText(regex, (msg, match) => wrap(bot1, msg, match));
  };
  const handleCheckCommand = async (bot, msg, match) => {
    const senderId = msg.from?.id;
    const chatId = msg.chat.id;
    const isAdmin = isAdminUser(senderId);
    let canUse = isAdmin;
    if (!canUse && isGameRoomChat(chatId) && senderId) {
      try {
        const member = await bot1.getChatMember(groupt, senderId);
        canUse = ["creator", "administrator"].includes(member?.status);
      } catch {
      }
    }
    if (!canUse) return;
    let targetId = "";
    if (match?.[1]) targetId = match[1];
    else if (msg.reply_to_message?.from?.id) targetId = String(msg.reply_to_message.from.id);
    if (!targetId) {
      bot.sendMessage(chatId, `\u26A0\uFE0F D\xF9ng <code>/check [id]</code> ho\u1EB7c reply v\xE0o ng\u01B0\u1EDDi c\u1EA7n ki\u1EC3m tra.`, { parse_mode: "HTML" });
      return;
    }
    const users = readJson(userJsonFile);
    const u = users.find((x) => String(x.id) === String(targetId));
    if (!u) {
      bot.sendMessage(chatId, "\u274C Kh\xF4ng t\xECm th\u1EA5y user n\xE0y.");
      return;
    }
    bot.sendMessage(chatId, formatUserCheckMessage(u), { parse_mode: "HTML" });
  };
  bot1.onText(/^\/check(?:\s+(\d+))?$/, (msg, match) => {
    handleCheckCommand(bot1, msg, match).catch(() => {
    });
  });
  bot4.onText(/^\/check(?:\s+(\d+))?$/, (msg, match) => {
    handleCheckCommand(bot4, msg, match).catch(() => {
    });
  });
  onAdminCommand(/^\/thongke/, (bot, msg) => {
    try {
      const users = readJson(userJsonFile);
      let nap = 0, rut = 0, hh = 0, bal = 0;
      users.forEach((u) => {
        nap += u.nap || 0;
        rut += u.rut || 0;
        hh += u.hh || 0;
        bal += u.sd !== void 0 ? u.sd : u.money || 0;
      });
      const pot = readJson("hu.json").pot || 1e4;
      bot.sendMessage(msg.chat.id, `\u{1F4BB} <b>TH\u1ED0NG K\xCA H\u1EC6 TH\u1ED0NG:</b>
\u2022 User: <b>${users.length} acc</b>
\u2022 S\u1ED1 d\u01B0 th\xE0nh vi\xEAn: <b>${bal.toLocaleString("vi-VN")} xu</b>
\u2022 T\u1ED5ng n\u1EA1p: <b>${nap.toLocaleString("vi-VN")} xu</b>
\u2022 T\u1ED5ng r\xFAt: <b>${rut.toLocaleString("vi-VN")} xu</b>
\u2022 Qu\u1EF9 h\u0169 r\u1ED3ng: <b>${pot.toLocaleString("vi-VN")} xu</b>`, { parse_mode: "HTML" });
    } catch {
      bot.sendMessage(msg.chat.id, "L\u1ED7i \u0111\u1ECDc database th\u1ED1ng k\xEA.");
    }
  });
  onAdminCommand(/^\/ban (\d+)/, (bot, msg, match) => {
    if (!match) return;
    const target = parseInt(match[1], 10);
    const banned = readJson(banJsonFile);
    if (!banned.some((x) => x.id === target)) {
      banned.push({ id: target, reason: "Banned by Admin", time: (/* @__PURE__ */ new Date()).toISOString() });
      writeJson(banJsonFile, banned);
      bot.sendMessage(msg.chat.id, `\u2705 \u0110\xE3 kh\xF3a t\xE0i kho\u1EA3n ID ${target}.`);
    }
  });
  onAdminCommand(/^\/unban (\d+)/, (bot, msg, match) => {
    if (!match) return;
    const target = match[1];
    let banned = readJson(banJsonFile);
    banned = banned.filter((x) => String(x.id) !== String(target));
    writeJson(banJsonFile, banned);
    bot.sendMessage(msg.chat.id, `\u2705 \u0110\xE3 m\u1EDF kh\xF3a t\xE0i kho\u1EA3n ID ${target}.`);
  });
  onAdminCommand(/^\/nap (\d+) (\d+)$/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u) => String(u.id) === String(targetId));
    if (idx === -1) {
      bot.sendMessage(msg.chat.id, "\u274C Th\xE0nh vi\xEAn ch\u01B0a t\u1EEBng start Bot!");
      return;
    }
    const result = addDepositToUser(users[idx], money);
    if (!users[idx].depositHistory) users[idx].depositHistory = [];
    users[idx].depositHistory.unshift({ time: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), amount: money.toLocaleString("vi-VN"), status: "Th\xE0nh c\xF4ng" });
    writeJson(userJsonFile, users);
    bot.sendMessage(msg.chat.id, `\u2705 N\u1EA1p th\xE0nh c\xF4ng cho <code>${targetId}</code>.`, { parse_mode: "HTML" });
    let notifyMsg = `\u{1F4B8} B\u1EA1n \u0111\u01B0\u1EE3c c\u1ED9ng +<b>${money.toLocaleString("vi-VN")} xu</b> n\u1EA1p ti\u1EC1n th\xE0nh c\xF4ng!
`;
    if (result.baseResetOccurred) {
      notifyMsg += `\u26A0\uFE0F <b>L\u01B0u \xFD:</b> T\xE0i kho\u1EA3n ch\u01B0a m\u1EDF kh\xF3a t\xE2n th\u1EE7 n\xEAn s\u1ED1 d\u01B0 tr\u01B0\u1EDBc \u0111\xF3 c\u1EE7a b\u1EA1n \u0111\xE3 b\u1ECB reset v\u1EC1 <code>0 xu</code>.
`;
    }
    if (result.newlyUnlocked) {
      notifyMsg += `\u{1F389} <b>Ch\xFAc m\u1EEBng! B\u1EA1n \u0111\xE3 m\u1EDF kh\xF3a th\xE0nh vi\xEAn T\xE2n Th\u1EE7 th\xE0nh c\xF4ng</b> (T\u1ED5ng n\u1EA1p \u0111\u1EA1t ${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).
`;
    } else if (result.totalNapAfter < 1e7) {
      if (result.totalNapAfter < 2e4) {
        notifyMsg += `\u{1F512} <b>Tr\u1EA1ng th\xE1i:</b> Ch\u01B0a m\u1EDF kh\xF3a T\xE2n Th\u1EE7 (${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).
`;
      }
    }
    notifyMsg += `\u{1F504} B\u1EA1n c\u1EA7n th\u1EF1c hi\u1EC7n c\u01B0\u1EE3c th\xEAm <b>${money.toLocaleString("vi-VN")} xu</b> (v\xF2ng c\u01B0\u1EE3c x1) tr\u01B0\u1EDBc khi c\xF3 th\u1EC3 th\u1EF1c hi\u1EC7n r\xFAt ti\u1EC1n!`;
    bot1.sendMessage(targetId, notifyMsg, { parse_mode: "HTML" }).catch(() => {
    });
    sendMessageToRoom(`<b>\u{1F929}\u{1F3EE} ID ng\u01B0\u1EDDi ch\u01A1i: ${formatMaskedId(users[idx].id)} - Ng\xE2n h\xE0ng N\u1EA1p th\xE0nh c\xF4ng: ${money.toLocaleString("vi-VN")}</b>`, { parse_mode: "HTML" });
  });
  onAdminCommand(/^\/tru (\d+) (\d+)$/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u) => String(u.id) === String(targetId));
    if (idx !== -1) {
      users[idx].sd = Math.max(0, (users[idx].sd || 0) - money);
      if (users[idx].money !== void 0) users[idx].money = Math.max(0, (users[idx].money || 0) - money);
      writeJson(userJsonFile, users);
      bot.sendMessage(msg.chat.id, `\u2705 \u0110\xE3 kh\u1EA5u tr\u1EEB -${money.toLocaleString("vi-VN")} xu c\u1EE7a ID ${targetId}.`);
    }
  });
  onAdminCommand(/^\/reset$/, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "\u274C L\u1EC7nh n\xE0y ch\u1EC9 d\xF9ng trong nh\xF3m admin.");
      return;
    }
    writeJson(userJsonFile, []);
    writeJson(banJsonFile, []);
    currentCai.value = null;
    resetBettingSession();
    bot.sendMessage(msg.chat.id, "\u2705 \u0110\xE3 x\xF3a to\xE0n b\u1ED9 ng\u01B0\u1EDDi d\xF9ng v\xE0 danh s\xE1ch kh\xF3a. T\u1EA5t c\u1EA3 s\u1EBD quay v\u1EC1 tr\u1EA1ng th\xE1i ng\u01B0\u1EDDi ch\u01A1i m\u1EDBi.");
  });
  onAdminCommand(/^\/resetcode$/, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "\u274C L\u1EC7nh n\xE0y ch\u1EC9 d\xF9ng trong nh\xF3m admin.");
      return;
    }
    writeJson(giftJsonFile, []);
    bot.sendMessage(msg.chat.id, "\u2705 \u0110\xE3 x\xF3a to\xE0n b\u1ED9 giftcode trong server.");
  });
  onAdminCommand(/^\/hs$/, (bot, msg) => {
    if (!isAdminGroupChat(msg.chat.id)) {
      bot.sendMessage(msg.chat.id, "\u274C L\u1EC7nh n\xE0y ch\u1EC9 d\xF9ng trong nh\xF3m admin.");
      return;
    }
    const helpText = `\u{1F6E0}\uFE0F <b>H\u01AF\u1EDANG D\u1EAAN L\u1EC6NH ADMIN</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u2022 <code>/hs</code> - Xem h\u01B0\u1EDBng d\u1EABn l\u1EC7nh admin
\u2022 <code>/thongke</code> - Xem th\u1ED1ng k\xEA h\u1EC7 th\u1ED1ng
\u2022 <code>/check [id]</code> - Ki\u1EC3m tra th\xF4ng tin user
\u2022 <code>/nap [id] [xu]</code> - C\u1ED9ng n\u1EA1p cho user
\u2022 <code>/tru [id] [xu]</code> - Tr\u1EEB xu user
\u2022 <code>/ban [id]</code> - Kh\xF3a t\xE0i kho\u1EA3n
\u2022 <code>/unban [id]</code> - M\u1EDF kh\xF3a t\xE0i kho\u1EA3n
\u2022 <code>/duyet_rut [id] [xu]</code> - Duy\u1EC7t l\u1EC7nh r\xFAt
\u2022 <code>/tuchoi_rut [id] [xu] [l\xFD do]</code> - T\u1EEB ch\u1ED1i l\u1EC7nh r\xFAt
\u2022 <code>/reset</code> - X\xF3a to\xE0n b\u1ED9 ng\u01B0\u1EDDi d\xF9ng, reset v\u1EC1 ng\u01B0\u1EDDi ch\u01A1i m\u1EDBi
\u2022 <code>/resetcode</code> - X\xF3a to\xE0n b\u1ED9 giftcode trong server

\u{1F510} <i>L\u1EC7nh n\xE0y ch\u1EC9 admin m\u1EDBi d\xF9ng \u0111\u01B0\u1EE3c v\xE0 ch\u1EC9 hi\u1EC3n th\u1ECB trong nh\xF3m admin.</i>`;
    bot.sendMessage(msg.chat.id, helpText, { parse_mode: "HTML" });
  });
  onAdminCommand(/^\/duyet_rut (\d+) (\d+)/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u) => String(u.id) === String(targetId));
    if (idx !== -1) {
      const u = users[idx];
      let adminMsgId;
      let bankName = "Ng\xE2n h\xE0ng";
      if (u.withdrawHistory) {
        const item = u.withdrawHistory.find((h) => h.status === "\u0110ang x\u1EED l\xFD" && String(h.amount) === String(money));
        if (item) {
          item.status = "Th\xE0nh c\xF4ng";
          adminMsgId = item.adminMessageId;
          bankName = item.bankName || "Ng\xE2n h\xE0ng";
        }
      }
      writeJson(userJsonFile, users);
      bot.sendMessage(msg.chat.id, `\u2705 Ch\u1EA5p thu\u1EADn \u0111\u01A1n r\xFAt ${money.toLocaleString("vi-VN")} xu cho ID ${targetId}.`);
      bot1.sendMessage(targetId, `\u2705 \u0110\u01A1n r\xFAt xu tr\u1ECB gi\xE1 <b>${money.toLocaleString("vi-VN")} xu</b> \u0111\xE3 \u0111\u01B0\u1EE3c ph\xEA duy\u1EC7t chuy\u1EC3n kho\u1EA3n th\xE0nh c\xF4ng!`, { parse_mode: "HTML" }).catch(() => {
      });
      if (adminMsgId) unpinFromAdminGroup(adminMsgId);
      sendMessageToRoom(`<b>\u{1F929}\u{1F3EE} ID ng\u01B0\u1EDDi ch\u01A1i: ${formatMaskedId(u.id)} - ${bankName} R\xFAt th\xE0nh c\xF4ng: ${money.toLocaleString("vi-VN")}</b>`, { parse_mode: "HTML" });
    }
  });
  onAdminCommand(/^\/tuchoi_rut (\d+) (\d+)(?: (.+))?$/, (bot, msg, match) => {
    if (!match) return;
    const targetId = match[1];
    const money = parseInt(match[2], 10);
    const reason = match[3] || "Sai th\xF4ng tin";
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u) => String(u.id) === String(targetId));
    if (idx !== -1) {
      const u = users[idx];
      let adminMsgId;
      let refundAmount = money;
      if (u.withdrawHistory) {
        const item = u.withdrawHistory.find((h) => h.status === "\u0110ang x\u1EED l\xFD" && String(h.amount) === String(money));
        if (item) {
          item.status = `T\u1EEB ch\u1ED1i: ${reason}`;
          adminMsgId = item.adminMessageId;
          const fee = item.fee || 0;
          refundAmount = money + fee;
        }
      }
      u.sd = (u.sd || 0) + refundAmount;
      if (u.money !== void 0) u.money = (u.money || 0) + refundAmount;
      writeJson(userJsonFile, users);
      bot.sendMessage(msg.chat.id, `\u274C \u0110\xE3 h\u1EE7y b\u1ECF \u0111\u01A1n r\xFAt xu cho ID ${targetId}.`);
      bot1.sendMessage(targetId, `\u274C Y\xEAu c\u1EA7u r\xFAt xu ${money.toLocaleString("vi-VN")} xu \u0111\xE3 b\u1ECB t\u1EEB ch\u1ED1i! Ho\xE0n xu v\xED. L\xFD do: ${reason}`, { parse_mode: "HTML" }).catch(() => {
      });
      if (adminMsgId) unpinFromAdminGroup(adminMsgId);
    }
  });
  const handleBet = (chatId, userId, username, category, type, amountStr, msgId, isGroup = false, isAnonymous = false) => {
    if (isBanned(userId)) return;
    const sendError = (msgText) => {
      if (isAnonymous) bot1.sendMessage(userId, msgText, { parse_mode: "HTML" }).catch(() => {
      });
      else sendResilientReply(chatId, msgText, { parse_mode: "HTML" });
    };
    if (state.gamePhase !== "BETTING") {
      sendError(`\u26A0\uFE0F <b>R\u1EA5t ti\u1EBFc! H\u1EC7 th\u1ED1ng \u0111ang \u0111\xF3ng s\u1ED5 x\xFAc x\u1EAFc. C\u01B0\u1EE3c kh\xF4ng h\u1EE3p l\u1EC7!</b>`);
      return;
    }
    try {
      const users = readJson(userJsonFile);
      const uIdx = users.findIndex((u) => String(u.id) === String(userId));
      if (uIdx === -1) {
        sendError(`\u26A0\uFE0F B\u1EA1n ch\u01B0a start bot! Click @${botUsernames[0]} g\xF5 <code>/start</code> \u0111\u1EC3 \u0111\u0103ng k\xFD.`);
        return;
      }
      const user = users[uIdx];
      const activeBetGame = getUserActiveBetGame(user);
      const txBet = state.userBetsTX[userId]?.amount || 0;
      const clBet = state.userBetsCL[userId]?.amount || 0;
      const xBet = state.userBetsXien[userId]?.amount || 0;
      let diceBetSum = 0;
      if (state.userBetsDice && state.userBetsDice[userId]) state.userBetsDice[userId].forEach((b) => diceBetSum += b.amount);
      let sumBetSum = 0;
      if (state.userBetsSum && state.userBetsSum[userId]) state.userBetsSum[userId].forEach((b) => sumBetSum += b.amount);
      const combined = txBet + clBet + xBet + diceBetSum + sumBetSum;
      if (combined >= SESSION_LIMIT) {
        sendError(`\u26A0\uFE0F \u0110\u1EA1t gi\u1EDBi h\u1EA1n c\u01B0\u1EE3c t\u1ED1i \u0111a ${SESSION_LIMIT.toLocaleString("vi-VN")} xu m\u1ED9t phi\xEAn!`);
        return;
      }
      const balance = user.sd !== void 0 ? user.sd : user.money || 0;
      let betValue = amountStr.toLowerCase() === "max" ? Math.min(balance, SESSION_LIMIT - combined) : parseInt(amountStr, 10);
      if (isTelegramXXBetType(type)) {
        if (activeBetGame !== "TELEGRAM_XX") {
          bot1.sendMessage(userId, `\u26A0\uFE0F 4 l\u1EC7nh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> \u0111ang b\u1ECB kh\xF3a. Mu\u1ED1n ch\u01A1i th\xEC v\xE0o bot <b>ch\u1ECDn game X\xDAC X\u1EAEC TELEGRAM</b> tr\u01B0\u1EDBc.`, { parse_mode: "HTML" }).catch(() => {
          });
          return;
        }
        if (isNaN(betValue) || betValue < TELEGRAM_XX_MIN_BET) {
          sendError(`\u26A0\uFE0F C\u01B0\u1EE3c ${getTelegramXXLabel(type)} t\u1ED1i thi\u1EC3u t\u1EEB <b>${TELEGRAM_XX_MIN_BET.toLocaleString("vi-VN")} xu</b>!`);
          return;
        }
        if (betValue > TELEGRAM_XX_MAX_BET) {
          sendError(`\u26A0\uFE0F C\u01B0\u1EE3c ${getTelegramXXLabel(type)} t\u1ED1i \u0111a <b>${TELEGRAM_XX_MAX_BET.toLocaleString("vi-VN")} xu</b>!`);
          return;
        }
      } else if (isNaN(betValue) || betValue < 1e3) {
        sendError("\u26A0\uFE0F C\u01B0\u1EE3c t\u1ED1i thi\u1EC3u t\u1EEB 1.000 xu!");
        return;
      }
      if (balance < betValue) {
        sendError("\u26A0\uFE0F S\u1ED1 d\u01B0 v\xED c\u01B0\u1EE3c c\u1EE7a \u0111\u1EC7 t\u1EED kh\xF4ng \u0111\u1EE7!");
        return;
      }
      if (category === "TX") {
        if (type === "t" && state.totalBetT + betValue - state.totalBetX > CANCUA_LIMIT) {
          sendError("\u26A0\uFE0F C\u1EEDa T\xC0I \u0111ang l\u1EC7ch th\u1EB7ng d\u01B0 qu\xE1 l\u1EDBn!");
          return;
        }
        if (type === "x" && state.totalBetX + betValue - state.totalBetT > CANCUA_LIMIT) {
          sendError("\u26A0\uFE0F C\u1EEDa X\u1EC8U \u0111ang l\u1EC7ch th\u1EB7ng d\u01B0 qu\xE1 l\u1EDBn!");
          return;
        }
      } else if (category === "CL") {
        if (type === "c" && state.totalBetC + betValue - state.totalBetL > CANCUA_LIMIT) {
          sendError("\u26A0\uFE0F C\u1EEDa CH\u1EAEN \u0111ang l\u1EC7ch th\u1EB7ng d\u01B0 qu\xE1 l\u1EDBn!");
          return;
        }
        if (type === "l" && state.totalBetL + betValue - state.totalBetC > CANCUA_LIMIT) {
          sendError("\u26A0\uFE0F C\u1EEDa L\u1EBA \u0111ang l\u1EC7ch th\u1EB7ng d\u01B0 qu\xE1 l\u1EDBn!");
          return;
        }
      }
      if (category === "TX" && state.userBetsTX[userId] && state.userBetsTX[userId].betType !== type) {
        sendError("\u26A0\uFE0F Kh\xF4ng \u0111\u1EB7t c\u1EA3 2 b\xEAn T\xC0I - X\u1EC8U!");
        return;
      }
      if (category === "CL" && state.userBetsCL[userId] && state.userBetsCL[userId].betType !== type) {
        sendError("\u26A0\uFE0F Kh\xF4ng \u0111\u1EB7t c\u1EA3 2 b\xEAn CH\u1EAEN - L\u1EBA!");
        return;
      }
      checkAndResetUserBets(user);
      if (user.sd !== void 0) user.sd -= betValue;
      if (user.money !== void 0) user.money -= betValue;
      user.cuoc = (user.cuoc || 0) + betValue;
      user.cuocHomNay = (user.cuocHomNay || 0) + betValue;
      user.cuocTuanNay = (user.cuocTuanNay || 0) + betValue;
      const vipPointGained = applyVipPointFromBet(user, betValue);
      if (user.vongCuoc && user.vongCuoc > 0) user.vongCuoc = Math.max(0, user.vongCuoc - betValue);
      if (category === "TX") {
        if (!state.userBetsTX[userId]) state.userBetsTX[userId] = { betType: type, amount: 0 };
        state.userBetsTX[userId].amount += betValue;
        if (type === "t") state.totalBetT += betValue;
        else state.totalBetX += betValue;
      } else if (category === "CL") {
        if (!state.userBetsCL[userId]) state.userBetsCL[userId] = { betType: type, amount: 0 };
        state.userBetsCL[userId].amount += betValue;
        if (type === "c") state.totalBetC += betValue;
        else state.totalBetL += betValue;
      } else if (category === "DICE") {
        if (!state.userBetsDice) state.userBetsDice = {};
        if (!state.userBetsDice[userId]) state.userBetsDice[userId] = [];
        const existing = state.userBetsDice[userId].find((b) => b.betType === type);
        if (existing) existing.amount += betValue;
        else state.userBetsDice[userId].push({ betType: type, amount: betValue });
      } else if (category === "SUM") {
        if (!state.userBetsSum) state.userBetsSum = {};
        if (!state.userBetsSum[userId]) state.userBetsSum[userId] = [];
        const existing = state.userBetsSum[userId].find((b) => b.betType === type);
        if (existing) existing.amount += betValue;
        else state.userBetsSum[userId].push({ betType: type, amount: betValue });
      } else {
        if (!state.userBetsXien[userId]) state.userBetsXien[userId] = { betType: type, amount: 0 };
        state.userBetsXien[userId].amount += betValue;
        if (type === "tc") state.totalBetTC += betValue;
        else if (type === "tl") state.totalBetTL += betValue;
        else if (type === "xc") state.totalBetXC += betValue;
        else if (type === "xl") state.totalBetXL += betValue;
      }
      state.betsLog.push({ userId, username, category, betType: type, amount: betValue });
      writeJson(userJsonFile, users);
      let typeLabel = type === "t" ? "T\xC0I" : type === "x" ? "X\u1EC8U" : type === "c" ? "CH\u1EAEN" : type === "l" ? "L\u1EBA" : isTelegramXXBetType(type) ? getTelegramXXLabel(type) : type.toUpperCase();
      const finalBalance = user.sd !== void 0 ? user.sd : user.money || 0;
      const vipInfo = getVipTierInfo(user);
      const badgePrefix = getVipRoomBadgePrefix(user);
      const anonymousBadge = vipInfo.level > 0 ? vipInfo.badge : "\u{1F464}";
      const anonymousLabel = vipInfo.level > 0 ? `VIP${vipInfo.level} \u1EA8n Danh` : "\u1EA8n Danh";
      const publicBetSummary = `${isAnonymous ? anonymousBadge : "\u2705"} <b>${isAnonymous ? anonymousLabel : `${badgePrefix}${username}`}</b> c\u01B0\u1EE3c th\xE0nh c\xF4ng <b>${typeLabel}</b> \u2022 <b>${betValue.toLocaleString("vi-VN")} xu</b> \u2022 phi\xEAn <b>#${state.phien}</b>`;
      const privateAnonymousSummary = `\u{1F575}\uFE0F <b>${anonymousLabel}</b> c\u01B0\u1EE3c th\xE0nh c\xF4ng <b>${typeLabel}</b> \u2022 <b>${betValue.toLocaleString("vi-VN")} xu</b> \u2022 phi\xEAn <b>#${state.phien}</b>`;
      const mainBotRoomSummary = `${anonymousBadge} <b>${anonymousLabel}</b> c\u01B0\u1EE3c t\u1EA1i <b>BOT CH\xCDNH</b> th\xE0nh c\xF4ng
\u{1F3AF} C\u1EEDa: <b>${typeLabel}</b>
\u{1F4B8} S\u1ED1 ti\u1EC1n: <b>${betValue.toLocaleString("vi-VN")} xu</b>
\u{1F3B2} Phi\xEAn: <b>#${state.phien}</b>`;
      const privateBetReceipt = `\u2705 <b>\u0110\u1EB7t l\u1EC7nh th\xE0nh c\xF4ng ${typeLabel}</b>
\u{1F4B8} S\u1ED1 ti\u1EC1n: <b>${betValue.toLocaleString("vi-VN")} xu</b>
\u{1F3B2} Phi\xEAn: <b>#${state.phien}</b>
\u{1F451} VIP hi\u1EC7n t\u1EA1i: <b>VIP${vipInfo.level} ${vipInfo.badge} (${vipInfo.name})</b>
\u{1F680} \u0110i\u1EC3m VIP hi\u1EC7n c\xF3: <b>${vipInfo.points.toLocaleString("vi-VN")}</b>${vipPointGained ? ` | +<b>1</b> \u0111i\u1EC3m` : ""}
\u{1F4B0} SD hi\u1EC7n t\u1EA1i: <b>${finalBalance.toLocaleString("vi-VN")} xu</b>`;
      if (isAnonymous) {
        bot1.sendMessage(userId, privateAnonymousSummary, { parse_mode: "HTML" }).catch(() => {
        });
        bot1.sendMessage(userId, privateBetReceipt, { parse_mode: "HTML" }).catch(() => {
        });
        sendMessageToRoom(publicBetSummary, { parse_mode: "HTML" });
      } else if (isGroup && msgId) {
        sendResilientReply(chatId, publicBetSummary, { reply_to_message_id: msgId, parse_mode: "HTML" });
        bot1.sendMessage(userId, privateBetReceipt, { parse_mode: "HTML" }).catch(() => {
        });
      } else {
        sendResilientReply(chatId, `\u{1F575}\uFE0F <b>${vipInfo.level > 0 ? `VIP${vipInfo.level} ` : ""}Kh\u1EDBp c\u01B0\u1EE3c th\xE0nh c\xF4ng</b> <b>${typeLabel}</b> \u2022 <b>${betValue.toLocaleString("vi-VN")} xu</b> \u2022 phi\xEAn <b>#${state.phien}</b> \u2022 v\xED <b>${finalBalance.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        sendMessageToRoom(mainBotRoomSummary, { parse_mode: "HTML" });
      }
    } catch {
    }
  };
  const processedGroupMessages = /* @__PURE__ */ new Set();
  const groupMessageProcessor = (bot, msg) => {
    if (!msg.text) return;
    const chat = msg.chat.id;
    if (String(chat) !== String(groupt)) return;
    const msgKey = `${chat}_${msg.message_id}`;
    if (processedGroupMessages.has(msgKey)) return;
    processedGroupMessages.add(msgKey);
    const text = msg.text.trim();
    const words = text.toLowerCase().split(/\s+/);
    const firstWord = words[0];
    const isAnonymous = ["tt", "xx", "cc", "ll"].includes(firstWord);
    if (isAnonymous) bot.deleteMessage(chat, msg.message_id).catch(() => {
    });
    const parsed = parseBetText(text);
    if (parsed) {
      const name = msg.from?.first_name || msg.from?.username || "\u1EA8n danh";
      const uid = String(msg.from?.id || "");
      if (uid) handleBet(chat, uid, name, parsed.category, parsed.type, parsed.amountStr, msg.message_id, true, isAnonymous);
    }
  };
  bots.forEach((b) => b.on("message", (msg) => {
    const text = msg.text?.trim();
    if (!text) return;
    if (/^\/daythang(?:@\w+)?$/i.test(text) || /^\/daythua(?:@\w+)?$/i.test(text)) {
      if (String(msg.chat.id) !== String(groupt) || b !== bot1) return;
      try {
        const users = readJson(userJsonFile);
        const requesterId = msg.from?.id ? String(msg.from.id) : "";
        const response = /^\/daythang(?:@\w+)?$/i.test(text) ? formatDailyStreakTopRoomMessage(users, "win", requesterId) : formatDailyStreakTopRoomMessage(users, "loss", requesterId);
        b.sendMessage(msg.chat.id, response, { parse_mode: "HTML" });
      } catch {
        b.sendMessage(msg.chat.id, "Kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c b\u1EA3ng x\u1EBFp h\u1EA1ng h\xF4m nay.", { parse_mode: "HTML" });
      }
      return;
    }
    if (text.startsWith("/sd") || text.startsWith("/sodu")) {
      if (b !== bot1) return;
      const userId = msg.from?.id ? msg.from.id.toString() : null;
      if (!userId) return;
      try {
        const users = readJson(userJsonFile);
        const user = users.find((u) => String(u.id) === userId);
        if (!user) {
          b.sendMessage(msg.chat.id, `\u26A0\uFE0F T\xE0i kho\u1EA3n ch\u01B0a \u0111\u01B0\u1EE3c \u0111\u0103ng k\xFD! G\xF5 /start t\u1EA1i @${botUsernames[0]}!`);
          return;
        }
        const bal = user.sd !== void 0 ? user.sd : user.money || 0;
        b.sendMessage(msg.chat.id, `\u{1F916} <b>V\xCD C\u1EE6A B\u1EA0N</b>
\u{1F464} T\xEAn: <b>${user.name}</b>
\u{1F4B0} S\u1ED1 d\u01B0: <b>${bal.toLocaleString("vi-VN")} xu</b>
\u{1F525} D\xE2y hi\u1EC7n t\u1EA1i: <b>${getUserStreakStatusText(user)}</b>`, { parse_mode: "HTML" });
      } catch {
      }
      return;
    }
    if (text.startsWith("/")) return;
    groupMessageProcessor(b, msg);
  }));
  bot1.on("message", (msg) => {
    if (msg.chat.type !== "private" || !msg.text) return;
    const txt = msg.text.trim();
    const chat = msg.chat.id;
    if (txt === "\u{1F3B2} GAME SOLO X\xDAC X\u1EAEC" || txt === "\u{1F3B2} Game Solo") {
      bot1.sendMessage(chat, formatSoloLobbyMessage(), { parse_mode: "HTML" });
      return;
    }
    if (txt === "\u{1F3B2} X\xDAC X\u1EAEC TELEGRAM" || txt === "\u{1F3B2} GAME X\xDAC X\u1EAEC TELEGRAM") {
      const users = readJson(userJsonFile);
      const user = users.find((u) => String(u.id) === String(chat));
      if (user) {
        user.activeBetGame = "TELEGRAM_XX";
        writeJson(userJsonFile, users);
      }
      bot1.sendMessage(chat, `\u2705 B\u1EA1n \u0111\xE3 ch\u1ECDn game <b>X\xDAC X\u1EAEC TELEGRAM</b>.
T\u1EEB gi\u1EDD 4 l\u1EC7nh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> m\u1EDBi \u0111\u01B0\u1EE3c m\u1EDF.

${formatTelegramXXGuideMessage()}`, { parse_mode: "HTML" });
      return;
    }
    if (txt === "\u{1F4DA} Danh S\xE1ch Game" || txt === "\u{1F3B2} \u0110\u1EB7t C\u01B0\u1EE3c Ph\xF2ng") {
      const users = readJson(userJsonFile);
      const user = users.find((u) => String(u.id) === String(chat));
      if (user) {
        user.activeBetGame = "ROOM_DEFAULT";
        writeJson(userJsonFile, users);
      }
      const guideText = formatGameCatalogMessage();
      bot1.sendMessage(chat, guideText, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: getGameCatalogReplyMarkup()
      });
      return;
    }
    if (txt === "\u{1F396} \u0110ua T\xF4p" || txt === "\u{1F947} B\u1EA3ng Phong Th\u1EA7n") {
      bot1.sendMessage(
        chat,
        `\u{1F396} <b>\u0110UA T\xD4P H\xD4M NAY</b>
Ch\u1ECDn b\u1EA3ng x\u1EBFp h\u1EA1ng b\xEAn d\u01B0\u1EDBi:`,
        { parse_mode: "HTML", reply_markup: getDuaTopReplyMarkup() }
      );
      return;
    }
    if (txt === "\u{1F525} N\u1ED5 H\u0169 R\u1ED3ng") {
      let pot = 1e4;
      try {
        pot = readJson("hu.json").pot || 1e4;
      } catch {
      }
      bot1.sendMessage(chat, `\u{1F525} <b>H\u0168 R\u1ED2NG HO\xC0NG KIM:</b> <b>${pot.toLocaleString("vi-VN")} xu</b>

N\u1ED5 h\u0169 khi ba m\u1EB7t x\xFAc x\u1EAFc tr\xF9ng 1-1-1 ho\u1EB7c 6-6-6!
\u{1F4AC} <a href="${gameRoomLink}">B\u1EA5m nhanh v\xE0o ph\xF2ng c\u01B0\u1EE3c</a>`, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard: [[{ text: "\u{1F4AC} V\xE0o ph\xF2ng c\u01B0\u1EE3c ngay", url: gameRoomLink }]] }
      });
      return;
    }
    if (txt === "\u{1F3EE} \u0110\u1EA1i L\xFD Hoa H\u1ED3ng" || txt === "\u{1F3EE} Hoa H\u1ED3ng") {
      const users = readJson(userJsonFile);
      const u = users.find((p) => String(p.id) === String(chat));
      if (u) {
        const referralLink = buildReferralDeepLink(String(u.id));
        bot1.sendMessage(chat, `\u{1F3EE} <b>HOA H\u1ED2NG NH\xD3M \u0110\u1EA0I L\xDD:</b>
\u{1F4B0} Hoa h\u1ED3ng t\xEDch l\u0169y: <b>${(u.hh || 0).toLocaleString("vi-VN")} xu</b>

\u{1F381} <b>Hoa h\u1ED3ng gi\u1EDBi thi\u1EC7u 1%:</b>
M\u1EDDi b\u1EA1n b\xE8 \u0111\u0103ng k\xFD qua link gi\u1EDBi thi\u1EC7u b\xEAn d\u01B0\u1EDBi. Khi ng\u01B0\u1EDDi \u0111\u01B0\u1EE3c gi\u1EDBi thi\u1EC7u c\u01B0\u1EE3c thua, b\u1EA1n s\u1EBD \u0111\u01B0\u1EE3c h\u01B0\u1EDFng <b>1%</b> gi\xE1 tr\u1ECB c\u01B0\u1EE3c thua v\xE0o v\xED hoa h\u1ED3ng.
\u{1F517} <a href="${referralLink}">Link gi\u1EDBi thi\u1EC7u c\u1EE7a b\u1EA1n</a>`, {
          parse_mode: "HTML",
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F517} M\u1EDF Link Gi\u1EDBi Thi\u1EC7u", url: referralLink }],
              [{ text: "\u{1F392} Nh\u1EADn Hoa H\u1ED3ng V\xED", callback_data: "claim_hh" }]
            ]
          }
        });
      }
      return;
    }
    if (txt === "\u{1F451} V\xEDp" || txt === "\u{1F451} VIP" || txt === "\u{1F451} Vip") {
      const users = readJson(userJsonFile);
      const u = users.find((p) => String(p.id) === String(chat));
      if (u) {
        bot1.sendMessage(chat, formatVipGuideMessage(u), { parse_mode: "HTML" });
      }
      return;
    }
    if (txt === "\u{1F3AA} EVENT" || txt === "\u{1F3AA} Event") {
      const users = readJson(userJsonFile);
      const user = users.find((p) => String(p.id) === String(chat));
      if (!user) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n ch\u01B0a \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n! G\xF5 /start \u0111\u1EC3 \u0111\u0103ng k\xFD.`);
        return;
      }
      const todayKey = getVNDateKey();
      const yesterdayKey = getVNDateKey((0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").subtract(1, "day"));
      const lastKey = String(user?.eventCheckinLastDate || "");
      const rawStreak = Number(user?.eventCheckinStreak || 0);
      const effectiveStreak = lastKey === todayKey || lastKey === yesterdayKey ? rawStreak : 0;
      const depositToday = getUserSuccessfulDepositTotalOnDate(user, todayKey);
      const displayName = `${msg.from?.first_name || ""} ${msg.from?.last_name || ""}`.trim() || (msg.from?.username ? `@${msg.from.username}` : "Ng\u01B0\u1EDDi ch\u01A1i");
      const text = `\u{1F5BC} <b>EVENT TREO \u1EA2NH / \u0110I\u1EC2M DANH Dragon.Room</b>

\u2705 \u0110\u1ED5i t\xEAn Telegram c\xF3 ch\u1EE9a <b>${EVENT_KEYWORD}</b>
\u2705 M\u1ED7i ng\xE0y \u0111i\u1EC3m danh 1 l\u1EA7n
\u2705 M\u1ED7i ng\xE0y ph\u1EA3i n\u1EA1p t\u1ED1i thi\u1EC3u <b>${EVENT_DAILY_MIN_DEPOSIT.toLocaleString("vi-VN")}\u0111</b> m\u1EDBi \u0111\u01B0\u1EE3c \u0111i\u1EC3m danh
\u2705 \u0110\u1EE7 <b>${EVENT_STREAK_TARGET_DAYS} ng\xE0y</b> li\xEAn t\u1EE5c v\xE0 c\xF3 n\u1EA1p trong <b>${EVENT_STREAK_TARGET_DAYS} ng\xE0y</b> g\u1EA7n nh\u1EA5t

\u{1F381} Th\u01B0\u1EDFng: <b>Giftcode ${EVENT_REWARD_GIFTCODE_VALUE.toLocaleString("vi-VN")}</b>
\u{1F449} Sau khi \u0111\u1ED5i t\xEAn xong, b\u1EA5m <b>\u2705 \u0110i\u1EC3m danh</b> \u0111\u1EC3 ghi nh\u1EADn.

\u{1F464} T\xEAn Telegram: <b>${displayName}</b>
\u{1F4E5} N\u1EA1p h\xF4m nay: <b>${depositToday.toLocaleString("vi-VN")}\u0111</b>
\u{1F525} Ti\u1EBFn \u0111\u1ED9: <b>${effectiveStreak}/${EVENT_STREAK_TARGET_DAYS}</b> ng\xE0y`;
      bot1.sendMessage(chat, text, {
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: [[{ text: "\u2705 \u0110i\u1EC3m danh", callback_data: "event_checkin" }]] }
      });
      return;
    }
    if (txt === "\u{1F464} V\xED C\xE1 Nh\xE2n") {
      const users = readJson(userJsonFile);
      const u = users.find((p) => String(p.id) === String(chat));
      if (u) {
        const bal = u.sd !== void 0 ? u.sd : u.money || 0;
        const mapTotal = u.nap || 0;
        const activeStreak = getUserActiveStreakCounts(u);
        const rookieStatus = mapTotal >= 2e4 ? `\u{1F7E2} <b>\u0110\xE3 m\u1EDF kh\xF3a \u2705</b>` : `\u{1F534} <b>Ch\u01B0a m\u1EDF kh\xF3a \u274C (${mapTotal.toLocaleString("vi-VN")}/20.000 xu)</b>`;
        const vipInfo = getVipTierInfo(u);
        const redeemablePoints = getVipRedeemablePoints(u);
        const stats = `\u{1F464} <b>V\xCD T\xC0I KHO\u1EA2N:</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F194} ID: <code>${u.id}</code>
\u{1F4B5} S\u1ED1 d\u01B0: <b>${Math.floor(bal).toLocaleString("vi-VN")} xu</b>
\u{1F451} <b>V\xEDp</b> \u{1F451}
C\u1EA5p Vip hi\u1EC7n t\u1EA1i: <b>${vipInfo.level}</b> ${vipInfo.badge} (<b>${vipInfo.name}</b>)
\u{1F680} \u0110i\u1EC3m VIP: <b>${vipInfo.points.toLocaleString("vi-VN")}/${vipInfo.nextThresholdPoints.toLocaleString("vi-VN")} up VIP ${vipInfo.nextTier?.level || vipInfo.level}</b>
\u{1F590}\uFE0F S\u1ED1 \u0111i\u1EC3m VIP c\xF3 th\u1EC3 \u0111\u1ED5i: <b>${redeemablePoints.toLocaleString("vi-VN")}</b>
Doanh s\u1ED1 c\u01B0\u1EE3c: <b>${(u.cuoc || 0).toLocaleString("vi-VN")} xu</b>
\u{1F504} V\xF2ng c\u01B0\u1EE3c c\xF2n l\u1EA1i: <b>${Math.ceil(u.vongCuoc || 0).toLocaleString("vi-VN")} xu</b>
\u{1F530} T\xE2n Th\u1EE7: ${rookieStatus}
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F4CA} <b>T\u1ED5ng c\u01B0\u1EE3c h\xF4m nay:</b> <b>${(u.cuocHomNay || 0).toLocaleString("vi-VN")} xu</b>
\u{1F4C8} <b>T\u1ED5ng c\u01B0\u1EE3c tu\u1EA7n:</b> <b>${(u.cuocTuanNay || 0).toLocaleString("vi-VN")} xu</b>
\u{1F525} <b>D\xE2y th\u1EAFng hi\u1EC7n t\u1EA1i:</b> <b>${activeStreak.win}</b> phi\xEAn
\u{1F976} <b>D\xE2y thua hi\u1EC7n t\u1EA1i:</b> <b>${activeStreak.loss}</b> phi\xEAn
\u{1F3C6} <b>Tr\u1EA1ng th\xE1i BXH:</b> <b>${getUserStreakStatusText(u)}</b>
\u{1F4E5} <b>T\u1ED5ng n\u1EA1p:</b> <b>${(u.nap || 0).toLocaleString("vi-VN")} xu</b>
\u{1F4E4} <b>T\u1ED5ng r\xFAt:</b> <b>${(u.rut || 0).toLocaleString("vi-VN")} xu</b>`;
        bot1.sendMessage(chat, stats, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F4E5} N\u1EA1p Xu", callback_data: "deposit" }, { text: "\u{1F4E4} R\xFAt Bank", callback_data: "withdraw" }],
              [{ text: "\u{1F451} V\xEDp", callback_data: "vip_info" }],
              [{ text: "\u{1F530} K\xEDch Ho\u1EA1t T\xE2n Th\u1EE7", callback_data: "check_rookie" }, { text: "\u{1F511} Nh\u1EADp Giftcode", callback_data: "redeem_gift" }],
              [{ text: "\u{1F39F}\uFE0F Mua Giftcode", callback_data: "buy_giftcode" }],
              [{ text: "\u{1F4DC} LS C\u01B0\u1EE3c", callback_data: "history_bet" }, { text: "\u{1F4DC} LS N\u1EA1p", callback_data: "history_dep" }, { text: "\u{1F4DC} LS R\xFAt", callback_data: "history_wit" }]
            ]
          }
        });
      }
      return;
    }
    const parsed = parseBetText(txt);
    if (parsed) {
      if (isTelegramXXBetType(parsed.type)) {
        bot1.sendMessage(chat, `\u26A0\uFE0F C\xE1c l\u1EC7nh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> ch\u1EC9 d\xF9ng cho game <b>X\xDAC X\u1EAEC TELEGRAM</b> trong room c\u01B0\u1EE3c.`, { parse_mode: "HTML" });
        return;
      }
      handleBet(chat, String(chat), msg.from?.first_name || "\u1EA8n danh", parsed.category, parsed.type, parsed.amountStr);
    }
  });
  bot1.onText(/^solo\s+(\d+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "\u26A0\uFE0F T\u1EA1o ph\xF2ng SOLO ch\u1EC9 d\xF9ng trong chat ri\xEAng v\u1EDBi bot ch\xEDnh.");
      return;
    }
    const amount = parseInt(match[1], 10);
    if (isNaN(amount) || amount < SOLO_MIN_BET) {
      bot1.sendMessage(chat, `\u274C S\u1ED1 ti\u1EC1n SOLO t\u1ED1i thi\u1EC3u l\xE0 <b>${SOLO_MIN_BET.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
      return;
    }
    try {
      const users = readJson(userJsonFile);
      const user = users.find((u) => String(u.id) === userId);
      if (!user) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n ch\u01B0a \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n! G\xF5 /start \u0111\u1EC3 \u0111\u0103ng k\xFD.`);
        return;
      }
      const soloRooms = readSoloRooms();
      const hasOpenRoom = soloRooms.some(
        (room2) => ["OPEN", "ROLLING"].includes(room2.status) && (String(room2.ownerId) === userId || String(room2.challengerId || "") === userId)
      );
      if (hasOpenRoom) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n \u0111ang c\xF3 ph\xF2ng SOLO \u0111ang ch\u1EDD ho\u1EB7c \u0111ang gi\u1EEF k\xE8o. H\xE3y v\xE0o/h\u1EE7y/x\u1EED l\xFD xong ph\xF2ng c\u0169 tr\u01B0\u1EDBc.`);
        return;
      }
      const balance = getUserBalance(user);
      if (balance < amount) {
        bot1.sendMessage(chat, `\u274C S\u1ED1 d\u01B0 kh\xF4ng \u0111\u1EE7 t\u1EA1o ph\xF2ng SOLO. B\u1EA1n c\u1EA7n <b>${amount.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }
      setUserBalance(user, balance - amount);
      user.cuoc = (user.cuoc || 0) + amount;
      user.cuocHomNay = (user.cuocHomNay || 0) + amount;
      user.cuocTuanNay = (user.cuocTuanNay || 0) + amount;
      if (user.vongCuoc && user.vongCuoc > 0) user.vongCuoc = Math.max(0, user.vongCuoc - amount);
      const code = generateSoloRoomCode(new Set(soloRooms.map((room2) => room2.code)));
      const room = {
        code,
        amount,
        ownerId: userId,
        ownerName: user.name || msg.from?.first_name || "Ch\u1EE7 ph\xF2ng",
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
            inline_keyboard: [[{ text: "\u2694\uFE0F V\xE0o bot \u0111\u1EC3 nh\u1EADp l\u1EC7nh ph\xF2ng", url: buildSoloRoomDeepLink(room.code) }]]
          }
        },
        (pinnedId) => {
          room.pinnedMessageId = pinnedId;
          writeSoloRooms(soloRooms);
        }
      );
      writeSoloRooms(soloRooms);
      const reply = `\u2705 <b>T\u1EA0O PH\xD2NG SOLO TH\xC0NH C\xD4NG</b>
\u{1F39F} M\xE3 ph\xF2ng: <code>${code}</code>
\u{1F4B0} M\u1EE9c c\u01B0\u1EE3c: <b>${amount.toLocaleString("vi-VN")} xu</b>
\u{1F4B5} V\xED c\xF2n l\u1EA1i: <b>${getUserBalance(user).toLocaleString("vi-VN")} xu</b>
\u{1F4CC} Bot \u0111\xE3 ghim l\u1EC7nh ph\xF2ng trong room <a href="${gameRoomLink}">Dragon Room</a>.
\u{1F465} B\u1EA1n b\xE8 v\xE0o ph\xF2ng b\u1EB1ng l\u1EC7nh: <code>/solo ${code}</code>
\u26D4 C\xF3 th\u1EC3 h\u1EE7y b\u1EB1ng: <code>/huy ${code}</code> sau 1 ph\xFAt n\u1EBFu ch\u01B0a c\xF3 ai v\xE0o.

` + formatSoloLobbyMessage(soloRooms);
      bot1.sendMessage(chat, reply, { parse_mode: "HTML" });
    } catch (e) {
      console.error("solo create error:", e);
      bot1.sendMessage(chat, "\u274C C\xF3 l\u1ED7i khi t\u1EA1o ph\xF2ng SOLO.");
    }
  });
  bot1.onText(/^\/solo$/i, (msg) => {
    const chat = msg.chat.id;
    if (isBanned(msg.from?.id || chat)) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "\u26A0\uFE0F Vui l\xF2ng m\u1EDF chat ri\xEAng v\u1EDBi bot ch\xEDnh \u0111\u1EC3 xem ph\xF2ng SOLO.");
      return;
    }
    bot1.sendMessage(chat, formatSoloLobbyMessage(), { parse_mode: "HTML" });
  });
  bot1.onText(/^\/solo\s+([A-Z0-9]+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "\u26A0\uFE0F V\xE0o ph\xF2ng SOLO ch\u1EC9 d\xF9ng trong chat ri\xEAng v\u1EDBi bot ch\xEDnh.");
      return;
    }
    const roomCode = match[1].toUpperCase();
    try {
      const users = readJson(userJsonFile);
      const joiner = users.find((u) => String(u.id) === userId);
      if (!joiner) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n ch\u01B0a \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n! G\xF5 /start \u0111\u1EC3 \u0111\u0103ng k\xFD.`);
        return;
      }
      const soloRooms = readSoloRooms();
      const room = soloRooms.find((item) => item.code === roomCode);
      if (!room || room.status !== "OPEN" || room.challengerId) {
        bot1.sendMessage(chat, `\u274C M\xE3 ph\xF2ng SOLO kh\xF4ng t\u1ED3n t\u1EA1i ho\u1EB7c \u0111\xE3 \u0111\u01B0\u1EE3c kh\u1EDBp.`);
        return;
      }
      if (String(room.ownerId) === userId) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n kh\xF4ng th\u1EC3 t\u1EF1 v\xE0o ph\xF2ng c\u1EE7a ch\xEDnh m\xECnh.`);
        return;
      }
      const occupied = soloRooms.some(
        (item) => ["OPEN", "ROLLING"].includes(item.status) && (String(item.ownerId) === userId || String(item.challengerId || "") === userId)
      );
      if (occupied) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n \u0111ang c\xF3 m\u1ED9t ph\xF2ng SOLO \u0111ang ch\u1EDD x\u1EED l\xFD.`);
        return;
      }
      const balance = getUserBalance(joiner);
      if (balance < room.amount) {
        bot1.sendMessage(chat, `\u274C S\u1ED1 d\u01B0 kh\xF4ng \u0111\u1EE7 v\xE0o ph\xF2ng. C\u1EA7n <b>${room.amount.toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }
      const owner = users.find((u) => String(u.id) === String(room.ownerId));
      if (!owner) {
        room.status = "CANCELLED";
        room.settledAt = Date.now();
        room.resultReason = "Ch\u1EE7 ph\xF2ng kh\xF4ng c\xF2n h\u1EE3p l\u1EC7.";
        clearSoloRoomPin(room);
        writeSoloRooms(soloRooms);
        bot1.sendMessage(chat, `\u274C Ch\u1EE7 ph\xF2ng kh\xF4ng c\xF2n h\u1EE3p l\u1EC7. Vui l\xF2ng th\u1EED ph\xF2ng kh\xE1c.`);
        return;
      }
      setUserBalance(joiner, balance - room.amount);
      joiner.cuoc = (joiner.cuoc || 0) + room.amount;
      joiner.cuocHomNay = (joiner.cuocHomNay || 0) + room.amount;
      joiner.cuocTuanNay = (joiner.cuocTuanNay || 0) + room.amount;
      if (joiner.vongCuoc && joiner.vongCuoc > 0) joiner.vongCuoc = Math.max(0, joiner.vongCuoc - room.amount);
      room.challengerId = userId;
      room.challengerName = joiner.name || msg.from?.first_name || "\u0110\u1ED1i th\u1EE7";
      room.challengerChatId = userId;
      room.joinedAt = Date.now();
      room.status = "ROLLING";
      room.rollDeadlineAt = Date.now() + SOLO_ROLL_TIMEOUT_MS;
      room.resultReason = null;
      clearSoloRoomPin(room);
      writeJson(userJsonFile, users);
      writeSoloRooms(soloRooms);
      const ownerPrompt = formatSoloRollPrompt(room, room.ownerId);
      const challengerPrompt = formatSoloRollPrompt(room, room.challengerId);
      sendSoloReply(room.ownerChatId, ownerPrompt, { parse_mode: "HTML", reply_markup: getSoloRollReplyMarkup(room.code) });
      sendSoloReply(room.challengerChatId || chat, challengerPrompt, { parse_mode: "HTML", reply_markup: getSoloRollReplyMarkup(room.code) });
    } catch (e) {
      console.error("solo join error:", e);
      bot1.sendMessage(chat, "\u274C C\xF3 l\u1ED7i khi v\xE0o ph\xF2ng SOLO.");
    }
  });
  bot1.onText(/^\/xx\s+([A-Z0-9]+)$/i, async (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "\u26A0\uFE0F Tung XX SOLO ch\u1EC9 d\xF9ng trong chat ri\xEAng v\u1EDBi bot ch\xEDnh.");
      return;
    }
    const roomCode = match[1].toUpperCase();
    try {
      const result = await handleSoloRollAction(roomCode, userId, chat);
      if (!result.ok) {
        bot1.sendMessage(chat, `\u274C ${result.callbackText}`, { parse_mode: "HTML" });
      }
    } catch (e) {
      console.error("solo roll error:", e);
      bot1.sendMessage(chat, "\u274C C\xF3 l\u1ED7i khi tung x\xFAc x\u1EAFc SOLO.");
    }
  });
  bot1.onText(/^\/huy\s+([A-Z0-9]+)$/i, (msg, match) => {
    const chat = msg.chat.id;
    const userId = String(msg.from?.id || "");
    if (!userId || isBanned(userId) || !match) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "\u26A0\uFE0F H\u1EE7y ph\xF2ng SOLO ch\u1EC9 d\xF9ng trong chat ri\xEAng v\u1EDBi bot ch\xEDnh.");
      return;
    }
    const roomCode = match[1].toUpperCase();
    try {
      const users = readJson(userJsonFile);
      const roomOwner = users.find((u) => String(u.id) === userId);
      if (!roomOwner) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n ch\u01B0a \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n! G\xF5 /start \u0111\u1EC3 \u0111\u0103ng k\xFD.`);
        return;
      }
      const soloRooms = readSoloRooms();
      const room = soloRooms.find((item) => item.code === roomCode);
      if (!room) {
        bot1.sendMessage(chat, `\u274C Kh\xF4ng t\xECm th\u1EA5y ph\xF2ng SOLO n\xE0y.`);
        return;
      }
      if (String(room.ownerId) !== userId) {
        bot1.sendMessage(chat, `\u274C Ch\u1EC9 ch\u1EE7 ph\xF2ng m\u1EDBi \u0111\u01B0\u1EE3c h\u1EE7y ph\xF2ng n\xE0y.`);
        return;
      }
      if (room.status !== "OPEN" || room.challengerId) {
        bot1.sendMessage(chat, `\u274C Kh\xF4ng th\u1EC3 h\u1EE7y ph\xF2ng v\xEC \u0111\xE3 c\xF3 ng\u01B0\u1EDDi v\xE0o ho\u1EB7c ph\xF2ng \u0111\xE3 k\u1EBFt th\xFAc.`);
        return;
      }
      if (Date.now() - room.createdAt < 6e4) {
        bot1.sendMessage(chat, `\u274C Ch\u1EC9 \u0111\u01B0\u1EE3c h\u1EE7y ph\xF2ng sau <b>1 ph\xFAt</b> k\u1EC3 t\u1EEB l\xFAc t\u1EA1o ph\xF2ng.`, { parse_mode: "HTML" });
        return;
      }
      setUserBalance(roomOwner, getUserBalance(roomOwner) + room.amount);
      room.status = "CANCELLED";
      room.settledAt = Date.now();
      room.resultReason = "Ch\u1EE7 ph\xF2ng ch\u1EE7 \u0111\u1ED9ng h\u1EE7y khi ch\u01B0a c\xF3 ai v\xE0o.";
      clearSoloRoomPin(room);
      writeJson(userJsonFile, users);
      writeSoloRooms(soloRooms);
      bot1.sendMessage(chat, `\u2705 \u0110\xE3 h\u1EE7y ph\xF2ng <code>${room.code}</code> v\xE0 ho\xE0n l\u1EA1i <b>${room.amount.toLocaleString("vi-VN")} xu</b> v\xE0o v\xED c\u1EE7a b\u1EA1n.

${formatSoloLobbyMessage(soloRooms)}`, { parse_mode: "HTML" });
    } catch (e) {
      console.error("solo cancel error:", e);
      bot1.sendMessage(chat, "\u274C C\xF3 l\u1ED7i khi h\u1EE7y ph\xF2ng SOLO.");
    }
  });
  bot1.on("callback_query", async (q) => {
    const act = q.data;
    const chat = q.message?.chat.id;
    if (!chat || !act || isBanned(chat)) return;
    try {
      const users = readJson(userJsonFile);
      const user = users.find((u) => String(u.id) === String(chat));
      if (!user) return;
      if (act.startsWith("solo_roll_")) {
        const roomCode = act.replace("solo_roll_", "").toUpperCase();
        const result = await handleSoloRollAction(roomCode, String(chat), chat);
        bot1.answerCallbackQuery(q.id, { text: result.callbackText, show_alert: !result.ok && !!result.showAlert }).catch(() => {
        });
        return;
      } else if (act === "game_catalog_room_default") {
        user.activeBetGame = "ROOM_DEFAULT";
        writeJson(userJsonFile, users);
        bot1.sendMessage(
          chat,
          `\u2705 B\u1EA1n \u0111\xE3 ch\u1ECDn game <b>T\xC0I X\u1EC8U S\u0102N H\u0168</b>.
T\u1EEB gi\u1EDD c\xE1c l\u1EC7nh c\u01B0\u1EE3c ph\xF2ng m\u1EB7c \u0111\u1ECBnh s\u1EBD \u0111\u01B0\u1EE3c \u01B0u ti\xEAn.

${formatRoomDefaultGuideMessage()}`,
          {
            parse_mode: "HTML",
            disable_web_page_preview: true,
            reply_markup: { inline_keyboard: [[{ text: "\u{1F4AC} V\xE0o Ph\xF2ng Dragon Room", url: gameRoomLink }]] }
          }
        );
        bot1.answerCallbackQuery(q.id, { text: "\u0110\xE3 m\u1EDF T\xE0i X\u1EC9u S\u0103n H\u0169" }).catch(() => {
        });
        return;
      } else if (act === "game_catalog_solo") {
        bot1.sendMessage(
          chat,
          `\u2705 B\u1EA1n \u0111\xE3 ch\u1ECDn <b>GAME SOLO X\xDAC X\u1EAEC</b>.

${formatSoloLobbyMessage()}`,
          {
            parse_mode: "HTML",
            disable_web_page_preview: true
          }
        );
        bot1.answerCallbackQuery(q.id, { text: "\u0110\xE3 m\u1EDF Game Solo X\xFAc X\u1EAFc" }).catch(() => {
        });
        return;
      } else if (act === "game_catalog_telegram") {
        user.activeBetGame = "TELEGRAM_XX";
        writeJson(userJsonFile, users);
        bot1.sendMessage(
          chat,
          `\u2705 B\u1EA1n \u0111\xE3 ch\u1ECDn game <b>X\xDAC X\u1EAEC TELEGRAM</b>.
T\u1EEB gi\u1EDD 4 l\u1EC7nh <code>XXC</code>, <code>XXL</code>, <code>XXX</code>, <code>XXT</code> m\u1EDBi \u0111\u01B0\u1EE3c m\u1EDF.

${formatTelegramXXGuideMessage()}`,
          { parse_mode: "HTML" }
        );
        bot1.answerCallbackQuery(q.id, { text: "\u0110\xE3 m\u1EDF X\xFAc X\u1EAFc Telegram" }).catch(() => {
        });
        return;
      } else if (act === "duatop_du_day") {
        const todayStr = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
        const latestCompletedPhien = getLatestCompletedPhien();
        const streakLb = buildDailyStreakLeaderboard(users, todayStr, latestCompletedPhien);
        let response = `\u{1F525} <b>BXH \u0110U D\xC2Y H\xD4M NAY (${todayStr})</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
`;
        if (streakLb.length === 0) {
          response += `<i>Ch\u01B0a c\xF3 ai \u0111\u1EA1t d\xE2y th\u1EAFng ho\u1EB7c d\xE2y thua t\u1EEB ${DAILY_STREAK_MIN} phi\xEAn li\xEAn ti\u1EBFp v\xE0 kh\xF4ng b\u1ECF l\u1EE1 phi\xEAn n\xE0o.</i>
`;
        } else {
          streakLb.slice(0, 3).forEach((entry, idx) => {
            const u = entry.user;
            const streak = entry.streak;
            const crown = idx === 0 ? "\u{1F947}" : idx === 1 ? "\u{1F948}" : "\u{1F949}";
            response += `${crown} <b>TOP ${idx + 1}:</b> <code>User****${String(u.id).slice(-4)}</code> - ${streak.label}: <b>${streak.count}</b> phi\xEAn
`;
          });
        }
        response += `
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F381} <b>TH\u01AF\u1EDENG BXH \u0110U D\xC2Y M\u1ED6I NG\xC0Y:</b>
\u2022 \u{1F947} <b>TOP 1:</b> Giftcode <b>${DAILY_STREAK_PRIZES[0].toLocaleString("vi-VN")} xu</b>
\u2022 \u{1F948} <b>TOP 2:</b> Giftcode <b>${DAILY_STREAK_PRIZES[1].toLocaleString("vi-VN")} xu</b>
\u2022 \u{1F949} <b>TOP 3:</b> Giftcode <b>${DAILY_STREAK_PRIZES[2].toLocaleString("vi-VN")} xu</b>

\u26A0\uFE0F <b>GHI CH\xDA:</b>
- Ch\u1EC9 t\xEDnh <b>d\xE2y th\u1EAFng</b> ho\u1EB7c <b>d\xE2y thua</b> t\u1EEB <b>${DAILY_STREAK_MIN} phi\xEAn li\xEAn ti\u1EBFp</b> tr\u1EDF l\xEAn
- <b>Kh\xF4ng \u0111\u01B0\u1EE3c b\u1ECF l\u1EE1 phi\xEAn n\xE0o</b>, h\u1EC5 b\u1ECF l\u1EE1 l\xE0 \u0111\u1EE9t d\xE2y
- Bot t\u1EF1 trao giftcode l\xFAc <b>00:00 h\u1EB1ng ng\xE0y</b> v\xE0 t\u1EF1 reset sau 00:00.

\u{1F449} <i>N\u1EBFu c\xF9ng s\u1ED1 phi\xEAn, h\u1EC7 th\u1ED1ng \u01B0u ti\xEAn ng\u01B0\u1EDDi c\xF3 t\u1ED5ng c\u01B0\u1EE3c h\xF4m nay cao h\u01A1n.</i>`;
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id, { text: "\u0110\xE3 m\u1EDF BXH \u0110u D\xE2y" }).catch(() => {
        });
        return;
      } else if (act === "duatop_phong_than") {
        const todayStr = (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
        const phongThanLb = users.filter((u) => (u.cuocHomNay || 0) >= 2e6).sort((a, b) => (b.cuocHomNay || 0) - (a.cuocHomNay || 0));
        let response = `\u{1F3C6} <b>BXH PHONG TH\u1EA6N H\xD4M NAY (${todayStr})</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
`;
        if (phongThanLb.length === 0) {
          response += `<i>Ch\u01B0a c\xF3 ai \u0111\u1EA1t m\u1ED1c t\u1ED1i thi\u1EC3u 2.000.000 xu c\u01B0\u1EE3c h\xF4m nay.</i>
`;
        } else {
          phongThanLb.slice(0, 3).forEach((u, idx) => {
            const crown = idx === 0 ? "\u{1F947}" : idx === 1 ? "\u{1F948}" : "\u{1F949}";
            response += `${crown} <b>TOP ${idx + 1}:</b> <code>User****${String(u.id).slice(-4)}</code> - C\u01B0\u1EE3c: <b>${(u.cuocHomNay || 0).toLocaleString("vi-VN")} xu</b>
`;
          });
        }
        response += `
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u26A0\uFE0F <b>GHI CH\xDA:</b>
- Ch\u1EC9 t\xEDnh ng\u01B0\u1EDDi ch\u01A1i c\xF3 t\u1ED5ng c\u01B0\u1EE3c h\xF4m nay t\u1EEB <b>2.000.000 xu</b> tr\u1EDF l\xEAn
- X\u1EBFp h\u1EA1ng theo <b>t\u1ED5ng c\u01B0\u1EE3c h\xF4m nay</b> (cao h\u01A1n \u0111\u1EE9ng tr\xEAn)
- BXH s\u1EBD t\u1EF1 reset sau <b>00:00</b> m\u1ED7i ng\xE0y`;
        bot1.sendMessage(chat, response, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id, { text: "\u0110\xE3 m\u1EDF BXH Phong Th\u1EA7n" }).catch(() => {
        });
        return;
      } else if (act === "vip_info") {
        bot1.sendMessage(chat, formatVipGuideMessage(user), { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {
        });
        return;
      } else if (act === "check_rookie") {
        const mapTotal = user.nap || 0;
        if (mapTotal >= 2e4) {
          bot1.sendMessage(chat, `\u{1F389} <b>CH\xDAC M\u1EEANG HO\xC0N TH\xC0NH T\xC2N TH\u1EE6!</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u2705 B\u1EA1n \u0111\xE3 n\u1EA1p t\xEDch l\u0169y: <b>${mapTotal.toLocaleString("vi-VN")} xu</b> (\u0110\u1EA1t m\u1ED1c t\u1ED1i thi\u1EC3u 20.000 xu).
\u{1F6E1}\uFE0F <b>Tr\u1EA1ng th\xE1i:</b> T\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n \u0111\xE3 \u0111\u01B0\u1EE3c <b>M\u1EDF kh\xF3a T\xE2n Th\u1EE7</b> th\xE0nh c\xF4ng!

\u{1F4A1} Gi\u1EDD \u0111\xE2y b\u1EA1n c\xF3 th\u1EC3 tho\u1EA3i m\xE1i giao d\u1ECBch v\xE0 t\xEDch l\u0169y s\u1ED1 d\u01B0 m\xE0 kh\xF4ng lo b\u1ECB reset khi n\u1EA1p ti\u1EC1n.`, { parse_mode: "HTML" });
        } else {
          bot1.sendMessage(chat, `\u{1F530} <b>Y\xCAU C\u1EA6U M\u1EDE KH\xD3A T\xC2N TH\u1EE6</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u{1F512} <b>Tr\u1EA1ng th\xE1i:</b> Ch\u01B0a m\u1EDF kh\xF3a
\u{1F4B5} \u0110\xE3 n\u1EA1p: <b>${mapTotal.toLocaleString("vi-VN")} / 20.000 xu</b>

\u26A0\uFE0F <b>Quy \u0111\u1ECBnh quan tr\u1ECDng:</b>
1. B\u1EA1n ph\u1EA3i n\u1EA1p t\u1ED1i thi\u1EC3u t\xEDch l\u0169y <b>20.000 xu</b> \u0111\u1EC3 k\xEDch ho\u1EA1t m\u1EDF kh\xF3a t\xE0i kho\u1EA3n.
2. <b>Kh\xF4ng n\u1EA1p \u0111\u1EE7:</b> N\u1EBFu ch\u01B0a \u0111\u01B0\u1EE3c m\u1EDF kh\xF3a, m\u1ED7i l\u1EA7n n\u1EA1p m\u1EDBi, to\xE0n b\u1ED9 s\u1ED1 d\u01B0 c\u0169 t\u1EEB tr\u01B0\u1EDBc \u0111\xF3 c\u1EE7a b\u1EA1n s\u1EBD <b>v\u1EC1 0 xu</b> tr\u01B0\u1EDBc khi c\u1ED9ng xu n\u1EA1p m\u1EDBi.

\u{1F449} <i>H\xE3y n\u1EA1p t\xEDch l\u0169y ho\u1EB7c n\u1EA1p \u0111\u1EE7 20k xu ngay h\xF4m nay \u0111\u1EC3 tr\xE1nh m\u1EA5t s\u1ED1 d\u01B0 kh\xF4ng mong mu\u1ED1n!</i>`, { parse_mode: "HTML" });
        }
        bot1.answerCallbackQuery(q.id).catch(() => {
        });
        return;
      } else if (act === "claim_hh") {
        const value = user.hh || 0;
        if (value <= 0) {
          bot1.answerCallbackQuery(q.id, { text: "V\xED hoa h\u1ED3ng \u0111ang tr\u1ED1ng!", show_alert: true });
          return;
        }
        user.sd = (user.sd || 0) + value;
        if (user.money !== void 0) user.money = (user.money || 0) + value;
        user.hh = 0;
        writeJson(userJsonFile, users);
        bot1.sendMessage(chat, `\u2705 \u0110\xE3 nh\u1EADn +${value.toLocaleString("vi-VN")} xu hoa h\u1ED3ng!`);
        bot1.answerCallbackQuery(q.id, { text: "Thao t\xE1c th\xE0nh c\xF4ng!" });
      } else if (act === "deposit") {
        bot1.sendMessage(
          chat,
          `\u{1F4B3} <b>Ch\u1ECDn h\xECnh th\u1EE9c n\u1EA1p ti\u1EC1n</b>

\u2022 <b>Ng\xE2n h\xE0ng:</b> t\u1EA1o giao d\u1ECBch chuy\u1EC3n kho\u1EA3n t\u1EF1 \u0111\u1ED9ng.
\u2022 <b>Th\u1EBB c\xE0o:</b> n\u1EA1p Viettel / Vinaphone / Mobifone (l\u1EC7nh <code>/thecao</code>).

\u{1F449} <b>B\u1EA5m n\xFAt b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 ti\u1EBFp t\u1EE5c.</b>`,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "\u{1F3E6} Bank", callback_data: "deposit_bank" }],
                [{ text: "\u{1F3AB} Th\u1EBB c\xE0o (b\u1EA3o tr\xEC)", callback_data: "deposit_card_maintenance" }]
              ]
            }
          }
        );
      } else if (act === "deposit_bank") {
        bot1.sendMessage(
          chat,
          `\u{1F4B3} <b>Ch\u1ECDn m\u1EC7nh gi\xE1 n\u1EA1p ti\u1EC1n</b>

N\u1EA1p t\u1ED1i thi\u1EC3u: <b>10.000 \u20AB</b>
N\u1EA1p t\u1ED1i \u0111a: <b>500.000.000 \u20AB</b>

B\u1EA5m v\xE0o button d\u01B0\u1EDBi \u0111\u1EC3 n\u1EA1p ti\u1EC1n qua <b>Chuy\u1EC3n kho\u1EA3n Ng\xE2n h\xE0ng</b>

\u27A1\uFE0F <b>C\xE1ch l\u1EA5y th\xF4ng tin n\u1EA1p:</b>

\u{1F536} G\xF5 l\u1EC7nh: <code>/nap s\u1ED1 ti\u1EC1n</code>
V\xED d\u1EE5: <code>/nap 100000</code>

\u{1F536} Ho\u1EB7c b\u1EA5m n\xFAt s\u1ED1 ti\u1EC1n b\xEAn d\u01B0\u1EDBi \u0111\u1EC3 l\u1EA5y nhanh.

\u26A0\uFE0F <b>L\u01B0u \xFD:</b>

\u2705 Chuy\u1EC3n \u0111\xFAng <b>S\u1ED0 TI\u1EC0N</b> v\xE0 <b>N\u1ED8I DUNG</b> \u0111\u01B0\u1EE3c cung c\u1EA5p.
\u2705 M\u1ED7i l\u1EA7n n\u1EA1p c\u1EA7n l\u1EA5y th\xF4ng tin <b>M\u1EDAI</b>.
\u{1F6AB} Kh\xF4ng d\xF9ng th\xF4ng tin c\u0169 cho giao d\u1ECBch sau.
\u{1F4B0} N\u1EA1p t\u1ED1i thi\u1EC3u: <b>10.000\u0111</b>`,
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
        bot1.answerCallbackQuery(q.id).catch(() => {
        });
      } else if (act.startsWith("deposit_quick_")) {
        const amount = parseInt(act.replace("deposit_quick_", ""), 10);
        const minDeposit = 1e4;
        const maxDeposit = 5e8;
        if (isNaN(amount) || amount < minDeposit || amount > maxDeposit) {
          bot1.answerCallbackQuery(q.id, { text: "\u274C M\u1EC7nh gi\xE1 kh\xF4ng h\u1EE3p l\u1EC7.", show_alert: true }).catch(() => {
          });
          return;
        }
        const cooldownRemaining = getDepositOrderCooldownRemainingSeconds(user);
        if (cooldownRemaining > 0) {
          bot1.answerCallbackQuery(q.id, {
            text: `\u23F3 Vui l\xF2ng ch\u1EDD ${cooldownRemaining} gi\xE2y n\u1EEFa \u0111\u1EC3 t\u1EA1o l\u1EC7nh n\u1EA1p ti\u1EBFp theo.`,
            show_alert: true
          }).catch(() => {
          });
          return;
        }
        const req = createManualDepositRequest(user, chat, amount);
        writeJson(userJsonFile, users);
        const qrImageUrl = buildDepositQrImageUrl(amount, req.content);
        bot1.sendPhoto(chat, qrImageUrl, {
          caption: formatDepositOrderCaption(amount, req.content),
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "\u2705 \u0110\xE3 Chuy\u1EC3n Kho\u1EA3n", callback_data: `deposit_sent_${req.requestId}` }]]
          }
        }).catch(() => {
          bot1.sendMessage(chat, formatDepositOrderCaption(amount, req.content), {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[{ text: "\u2705 \u0110\xE3 Chuy\u1EC3n Kho\u1EA3n", callback_data: `deposit_sent_${req.requestId}` }]]
            }
          });
        });
        bot1.answerCallbackQuery(q.id, { text: `\u0110\xE3 t\u1EA1o l\u1EC7nh n\u1EA1p ${amount.toLocaleString("vi-VN")} \u20AB!` }).catch(() => {
        });
      } else if (act.startsWith("deposit_sent_")) {
        const requestId = act.replace("deposit_sent_", "");
        const depositItem = (user.depositHistory || []).find((h) => String(h.requestId || "") === requestId);
        if (!depositItem) {
          bot1.answerCallbackQuery(q.id, { text: "\u274C Kh\xF4ng t\xECm th\u1EA5y l\u1EC7nh n\u1EA1p n\xE0y.", show_alert: true }).catch(() => {
          });
          return;
        }
        if (depositItem.adminNotified) {
          bot1.answerCallbackQuery(q.id, { text: "\u26A0\uFE0F \u0110\u01A1n n\u1EA1p n\xE0y \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi admin tr\u01B0\u1EDBc \u0111\xF3.", show_alert: true }).catch(() => {
          });
          return;
        }
        if (depositItem.expiresAt && (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").isAfter(import_moment_timezone.default.tz(depositItem.expiresAt, "Asia/Ho_Chi_Minh"))) {
          depositItem.status = "H\u1EBFt h\u1EA1n";
          writeJson(userJsonFile, users);
          bot1.answerCallbackQuery(q.id, { text: "\u274C L\u1EC7nh n\u1EA1p \u0111\xE3 h\u1EBFt hi\u1EC7u l\u1EF1c, vui l\xF2ng t\u1EA1o l\u1EC7nh m\u1EDBi.", show_alert: true }).catch(() => {
          });
          return;
        }
        depositItem.status = "Ch\u1EDD ki\u1EC3m tra";
        depositItem.adminNotified = true;
        writeJson(userJsonFile, users);
        sendMessageToAdminGroup(`\u26A0\uFE0F <b>B\xC1O N\u1EA0P M\u1EDAI:</b>
ID: <code>${chat}</code>
S\u1ED1 ti\u1EC1n: <b>${depositItem.amount} \u20AB</b>
N\u1ED9i dung n\u1EA1p: <code>${depositItem.transferContent}</code>
Duy\u1EC7t g\xF5: <code>/nap ${chat} ${String(depositItem.amount).replace(/\./g, "")}</code>`, { parse_mode: "HTML" });
        if (q.message?.message_id) {
          bot1.editMessageReplyMarkup(
            { inline_keyboard: [] },
            {
              chat_id: chat,
              message_id: q.message.message_id
            }
          ).catch(() => {
          });
        }
        bot1.answerCallbackQuery(q.id, { text: "\u2705 \u0110\xE3 g\u1EEDi \u0111\u01A1n n\u1EA1p v\u1EC1 nh\xF3m admin!" }).catch(() => {
        });
        bot1.sendMessage(chat, `\u2705 B\u1EA1n \u0111\xE3 x\xE1c nh\u1EADn chuy\u1EC3n kho\u1EA3n th\xE0nh c\xF4ng. \u0110\u01A1n n\u1EA1p \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 admin \u0111\u1EC3 ki\u1EC3m tra.`, { parse_mode: "HTML" });
      } else if (act === "deposit_card_maintenance") {
        bot1.answerCallbackQuery(q.id, { text: "\u26A0\uFE0F Th\u1EBB c\xE0o hi\u1EC7n \u0111ang b\u1EA3o tr\xEC, vui l\xF2ng quay l\u1EA1i sau.", show_alert: true }).catch(() => {
        });
      } else if (act === "withdraw") {
        if (!isNoviceUnlocked(user)) {
          bot1.answerCallbackQuery(q.id, { text: "\u274C T\xE2n th\u1EE7 ph\u1EA3i n\u1EA1p \u0111\u1EE7 20.000 xu \u0111\u1EC3 m\u1EDF kh\xF3a tr\u01B0\u1EDBc khi t\u1EA1o l\u1EC7nh r\xFAt.", show_alert: true });
          return;
        }
        bot1.sendMessage(chat, `\u{1F4E4} <b>R\xDAT TI\u1EC0N TH\u1EAENG L\u1EDAN V\u1EC0 TH\u1EBA:</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
\u2696\uFE0F <b>H\u1EA1n m\u1EE9c & Ph\xED r\xFAt:</b>
\u2022 <b>H\u1EA1n m\u1EE9c t\u1ED1i thi\u1EC3u (Min):</b> 50.000 xu
\u2022 <b>Ph\xED giao d\u1ECBch r\xFAt:</b> 1% (kh\u1EA5u tr\u1EEB t\u1EEB s\u1ED1 xu r\xFAt)

\u{1F3E6} <b>H\u1EC7 th\u1ED1ng h\u1ED7 tr\u1EE3 c\xE1c ng\xE2n h\xE0ng:</b>
<code>Vietcombank</code> | <code>Techcombank</code> | <code>MBBank</code> | <code>Vietinbank</code> | <code>Agribank</code>

\u270D\uFE0F <b>C\xFA ph\xE1p so\u1EA1n tin nh\u1EAFn g\u1EEDi Bot:</b>
<code>/rut [STK] [BANK] [T\xCAN_CH\u1EE6_TH\u1EBA] [TI\u1EC0N]</code>

\u{1F4A1} <b>V\xED d\u1EE5 m\u1EABu:</b>
<code>/rut 190345 Techcombank BUI_THI_ANH_THY 50000</code>`, { parse_mode: "HTML" });
      } else if (act === "redeem_gift") {
        bot1.sendMessage(chat, "\u{1F511} So\u1EA1n m\u1EABu: <code>/code [M\xE3_qu\xE0_t\u1EB7ng]</code>", { parse_mode: "HTML" });
      } else if (act === "buy_giftcode") {
        if (!isNoviceUnlocked(user)) {
          bot1.answerCallbackQuery(q.id, { text: "\u274C B\u1EA1n ph\u1EA3i m\u1EDF kh\xF3a t\xE2n th\u1EE7 tr\u01B0\u1EDBc m\u1EDBi mua \u0111\u01B0\u1EE3c code.", show_alert: true });
          return;
        }
        const bal = user.sd !== void 0 ? user.sd : user.money || 0;
        const buyIntro = `\u{1F39F}\uFE0F <b>MUA GIFTCODE L\u1ED8C CHIA S\u1EBA</b> \u{1F39F}\uFE0F
\u{1F4B5} S\u1ED1 d\u01B0 v\xED c\u1EE7a b\u1EA1n: <b>${Math.floor(bal).toLocaleString("vi-VN")} xu</b>
\u26A0\uFE0F Mua code m\u1EA5t <code>3%</code> ph\xED giao d\u1ECBch.

\u{1F449} <b>C\xFA ph\xE1p mua t\xF9y ch\u1ECDn:</b>
\u2022 <code>/muacode [m\u1EC7nh_gi\xE1]</code>
\u2022 <code>/muacode [s\u1ED1_l\u01B0\u1EE3ng] [m\u1EC7nh_gi\xE1]</code>
\u{1F4A1} <b>V\xED d\u1EE5:</b> <code>/muacode 10000</code> ho\u1EB7c <code>/muacode 5 10000</code>`;
        bot1.sendMessage(chat, buyIntro, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "\u{1F39F}\uFE0F G\xF3i 10K xu", callback_data: "buy_quick_10000" }, { text: "\u{1F39F}\uFE0F G\xF3i 50K xu", callback_data: "buy_quick_50000" }],
              [{ text: "\u{1F39F}\uFE0F G\xF3i 100K xu", callback_data: "buy_quick_100000" }]
            ]
          }
        });
      } else if (act.startsWith("buy_quick_")) {
        if (!isNoviceUnlocked(user)) {
          bot1.answerCallbackQuery(q.id, { text: "\u274C B\u1EA1n ph\u1EA3i m\u1EDF kh\xF3a t\xE2n th\u1EE7 tr\u01B0\u1EDBc m\u1EDBi mua \u0111\u01B0\u1EE3c code.", show_alert: true });
          return;
        }
        const price = parseInt(act.replace("buy_quick_", ""), 10);
        if (isNaN(price) || price < 1e3) return;
        const cost = Math.ceil(price * 1.03);
        const balance = user.sd !== void 0 ? user.sd : user.money || 0;
        if (balance < cost) {
          bot1.answerCallbackQuery(q.id, { text: `\u274C S\u1ED1 d\u01B0 kh\xF4ng \u0111\u1EE7! C\u1EA7n ${cost.toLocaleString("vi-VN")} xu.`, show_alert: true });
          return;
        }
        user.sd = balance - cost;
        if (user.money !== void 0) user.money = user.money - cost;
        const generatedCode = generateGiftCode();
        const codeRecord = {
          gift: generatedCode,
          value: price,
          creatorId: String(chat),
          createTime: (/* @__PURE__ */ new Date()).toLocaleString("vi-VN"),
          useTime: null,
          userIdUsed: null
        };
        const giftcodes = readJson(giftJsonFile);
        writeJson(giftJsonFile, [...giftcodes, codeRecord]);
        const userList = readJson(userJsonFile);
        const uToUpdate = userList.find((x) => String(x.id) === String(chat));
        if (uToUpdate) {
          uToUpdate.sd = user.sd;
          if (uToUpdate.money !== void 0) uToUpdate.money = user.money;
          writeJson(userJsonFile, userList);
        }
        bot1.answerCallbackQuery(q.id, { text: `\u{1F389} \u0110\xE3 mua th\xE0nh c\xF4ng m\xE3 ${price.toLocaleString("vi-VN")} xu!` });
        bot1.sendMessage(chat, `\u{1F39F}\uFE0F <b>MUA GIFTCODE TH\xC0NH C\xD4NG!</b>
\u{1F48E} M\u1EC7nh gi\xE1: <b>${price.toLocaleString("vi-VN")} xu</b>
\u{1F511} M\xE3: <code>/code ${generatedCode}</code>`, { parse_mode: "HTML" });
        sendMessageToRoom(`\u{1F465} <b>Ng\u01B0\u1EDDi ch\u01A1i \u1EA9n danh</b> \u0111\xE3 mua <b>1</b> giftcode m\u1EC7nh gi\xE1 <b>${price.toLocaleString("vi-VN")} xu</b>!`, { parse_mode: "HTML" });
      } else if (act === "event_checkin") {
        const todayKey = getVNDateKey();
        const yesterdayKey = getVNDateKey((0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").subtract(1, "day"));
        if (!isTelegramNameQualified(q.from, EVENT_KEYWORD)) {
          const msgStr2 = `\u274C B\u1EA1n ch\u01B0a \u0111\u1EE7 \u0111i\u1EC1u ki\u1EC7n \u0111i\u1EC3m danh.

Y\xEAu c\u1EA7u 1: \u0110\u1ED5i t\xEAn Telegram c\xF3 ch\u1EE9a <b>${EVENT_KEYWORD}</b>
\u{1F449} \u0110\u1ED5i t\xEAn xong b\u1EA5m l\u1EA1i <b>\u2705 \u0110i\u1EC3m danh</b> \u0111\u1EC3 ghi nh\u1EADn.`;
          bot1.sendMessage(chat, msgStr2, { parse_mode: "HTML" });
          bot1.answerCallbackQuery(q.id, { text: "Ch\u01B0a \u0111\xFAng t\xEAn Telegram", show_alert: true }).catch(() => {
          });
          return;
        }
        const depositToday = getUserSuccessfulDepositTotalOnDate(user, todayKey);
        if (depositToday < EVENT_DAILY_MIN_DEPOSIT) {
          const msgStr2 = `\u274C B\u1EA1n ch\u01B0a \u0111\u1EE7 \u0111i\u1EC1u ki\u1EC7n \u0111i\u1EC3m danh.

Y\xEAu c\u1EA7u 2: H\xF4m nay ph\u1EA3i n\u1EA1p t\u1ED1i thi\u1EC3u <b>${EVENT_DAILY_MIN_DEPOSIT.toLocaleString("vi-VN")}\u0111</b> m\u1EDBi \u0111\u01B0\u1EE3c \u0111i\u1EC3m danh.
\u{1F4E5} N\u1EA1p h\xF4m nay c\u1EE7a b\u1EA1n: <b>${depositToday.toLocaleString("vi-VN")}\u0111</b>`;
          bot1.sendMessage(chat, msgStr2, { parse_mode: "HTML" });
          bot1.answerCallbackQuery(q.id, { text: "Ch\u01B0a \u0111\u1EE7 n\u1EA1p h\xF4m nay", show_alert: true }).catch(() => {
          });
          return;
        }
        const lastKey = String(user.eventCheckinLastDate || "");
        if (lastKey === todayKey) {
          bot1.answerCallbackQuery(q.id, { text: "B\u1EA1n \u0111\xE3 \u0111i\u1EC3m danh h\xF4m nay r\u1ED3i!", show_alert: true }).catch(() => {
          });
          return;
        }
        let streak = Number(user.eventCheckinStreak || 0);
        streak = lastKey === yesterdayKey ? streak + 1 : 1;
        user.eventCheckinLastDate = todayKey;
        user.eventCheckinStreak = streak;
        let msgStr = `\u2705 <b>\u0110I\u1EC2M DANH TH\xC0NH C\xD4NG!</b>
\u{1F4C5} Ng\xE0y: <b>${todayKey}</b>
\u{1F4E5} N\u1EA1p h\xF4m nay: <b>${depositToday.toLocaleString("vi-VN")}\u0111</b>
\u{1F525} Ti\u1EBFn \u0111\u1ED9: <b>${streak}/${EVENT_STREAK_TARGET_DAYS}</b> ng\xE0y li\xEAn t\u1EE5c`;
        if (streak >= EVENT_STREAK_TARGET_DAYS) {
          const hasDeposit7d = hasUserSuccessfulDepositInLastDays(user, EVENT_STREAK_TARGET_DAYS);
          if (!hasDeposit7d) {
            msgStr += `

\u26A0\uFE0F B\u1EA1n \u0111\xE3 \u0111\u1EE7 ${EVENT_STREAK_TARGET_DAYS} ng\xE0y \u0111i\u1EC3m danh nh\u01B0ng ch\u01B0a c\xF3 n\u1EA1p trong ${EVENT_STREAK_TARGET_DAYS} ng\xE0y g\u1EA7n nh\u1EA5t.`;
          } else {
            const code = createGiftcodeRecord(EVENT_REWARD_GIFTCODE_VALUE, "EVENT_CHECKIN");
            msgStr += `

\u{1F389} <b>CH\xDAC M\u1EEANG B\u1EA0N \u0110\u1EE6 ${EVENT_STREAK_TARGET_DAYS} NG\xC0Y LI\xCAN T\u1EE4C!</b>
\u{1F381} Th\u01B0\u1EDFng: <b>Giftcode ${EVENT_REWARD_GIFTCODE_VALUE.toLocaleString("vi-VN")}</b>
\u{1F511} M\xE3: <code>/code ${code}</code>

\u2705 Chu k\u1EF3 \u0111i\u1EC3m danh \u0111\xE3 reset, mai b\u1EA1n c\xF3 th\u1EC3 b\u1EAFt \u0111\u1EA7u v\xF2ng m\u1EDBi.`;
            user.eventCheckinStreak = 0;
          }
        }
        writeJson(userJsonFile, users);
        bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id, { text: "\u0110\xE3 \u0111i\u1EC3m danh!" }).catch(() => {
        });
      } else if (act === "history_bet") {
        const lastBets = (user.betHistory || []).slice().reverse().slice(0, 5);
        let msgStr = `\u{1F4DC} <b>L\u1ECACH S\u1EEC C\u01AF\u1EE2C G\u1EA6N \u0110\xC2Y:</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
`;
        if (lastBets.length === 0) {
          msgStr += `<i>Ch\u01B0a c\xF3 l\u1ECBch s\u1EED c\u01B0\u1EE3c n\xE0o!</i>`;
        } else {
          lastBets.forEach((h) => {
            msgStr += `\u{1F52E} <b>Phi\xEAn #${h.phien}</b> (${h.time})
\u{1F3B2} Dice: <b>${h.dice}</b> (${h.total} - ${h.result})
`;
            if (Array.isArray(h.bets)) {
              h.bets.forEach((b) => {
                const labelType = typeof b.betType === "function" ? "CH\u1EAEN/L\u1EBA" : b.betType;
                msgStr += `  \u2022 ${b.isWin ? "\u{1F7E2} Th\u1EAFng" : "\u{1F534} Thua"} ${b.category.toUpperCase()} [${String(labelType).toUpperCase()}]: ${b.amount.toLocaleString("vi-VN")} xu ${b.isWin ? `(+${b.payout.toLocaleString("vi-VN")} xu)` : ""}
`;
              });
            }
          });
        }
        bot1.sendMessage(chat, msgStr, { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {
        });
      } else if (act === "history_dep") {
        const history = (user.depositHistory || []).slice(0, 5);
        let msgStr = `\u{1F4E5} <b>L\u1ECACH S\u1EEC N\u1EA0P G\u1EA6N \u0110\xC2Y:</b>
`;
        history.forEach((h, idx) => {
          msgStr += `${idx + 1}. <b>${h.amount}</b> (${h.time}) - <b>${h.status || "Xong"}</b>
`;
          if (h.transferContent) msgStr += `\u{1F4DD} N\u1ED9i dung: <code>${h.transferContent}</code>
`;
        });
        bot1.sendMessage(chat, msgStr || "Tr\u1ED1ng", { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {
        });
      } else if (act === "history_wit") {
        const history = (user.withdrawHistory || []).slice(0, 5);
        let msgStr = `\u{1F4E4} <b>L\u1ECACH S\u1EEC R\xDAT G\u1EA6N \u0110\xC2Y:</b>
`;
        history.forEach((h, idx) => {
          msgStr += `${idx + 1}. <b>${h.amount.toLocaleString("vi-VN")} xu</b> (${h.time}) - <b>${h.status || "X\u1EED l\xFD"}</b>
`;
        });
        bot1.sendMessage(chat, msgStr || "Tr\u1ED1ng", { parse_mode: "HTML" });
        bot1.answerCallbackQuery(q.id).catch(() => {
        });
      }
    } catch {
    }
  });
  bot1.onText(/\/nap (\d+)/, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat) || !match) return;
    const amount = parseInt(match[1], 10);
    const minDeposit = 1e4;
    const maxDeposit = 5e8;
    if (isNaN(amount) || amount < minDeposit || amount > maxDeposit) {
      bot1.sendMessage(chat, `\u274C S\u1ED1 ti\u1EC1n n\u1EA1p kh\xF4ng h\u1EE3p l\u1EC7. T\u1ED1i thi\u1EC3u <b>${minDeposit.toLocaleString("vi-VN")} \u20AB</b> v\xE0 t\u1ED1i \u0111a <b>${maxDeposit.toLocaleString("vi-VN")} \u20AB</b>.`, { parse_mode: "HTML" });
      return;
    }
    try {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u) => String(u.id) === String(chat));
      if (idx === -1) return;
      const user = users[idx];
      const cooldownRemaining = getDepositOrderCooldownRemainingSeconds(user);
      if (cooldownRemaining > 0) {
        bot1.sendMessage(chat, `\u23F3 Vui l\xF2ng ch\u1EDD <b>${cooldownRemaining} gi\xE2y</b> n\u1EEFa \u0111\u1EC3 t\u1EA1o l\u1EC7nh n\u1EA1p ti\u1EBFp theo.`, { parse_mode: "HTML" });
        return;
      }
      const req = createManualDepositRequest(user, chat, amount);
      writeJson(userJsonFile, users);
      const qrImageUrl = buildDepositQrImageUrl(amount, req.content);
      bot1.sendPhoto(chat, qrImageUrl, {
        caption: formatDepositOrderCaption(amount, req.content),
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "\u2705 \u0110\xE3 Chuy\u1EC3n Kho\u1EA3n", callback_data: `deposit_sent_${req.requestId}` }]]
        }
      }).catch(() => {
        bot1.sendMessage(chat, formatDepositOrderCaption(amount, req.content), {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[{ text: "\u2705 \u0110\xE3 Chuy\u1EC3n Kho\u1EA3n", callback_data: `deposit_sent_${req.requestId}` }]]
          }
        });
      });
    } catch {
    }
  });
  bot1.onText(/\/rut (.+)/, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat) || !match) return;
    const parts = match[1].trim().split(/\s+/);
    if (parts.length < 4) {
      bot1.sendMessage(chat, `\u26A0\uFE0F <b>Sai c\xFA ph\xE1p r\xFAt ti\u1EC1n!</b>
\u270D\uFE0F <code>/rut [STK] [BANK] [T\xCAN_CH\u1EE6_TH\u1EBA] [TI\u1EC0N]</code>`, { parse_mode: "HTML" });
      return;
    }
    const account = parts[0];
    const bank = parts[1].toUpperCase();
    const money = parseInt(parts[parts.length - 1], 10);
    const owner = parts.slice(2, parts.length - 1).join(" ").toUpperCase();
    const minWithdraw = 5e4;
    if (isNaN(money) || money < minWithdraw) {
      bot1.sendMessage(chat, `\u274C H\u1EA1n m\u1EE9c r\xFAt t\u1ED1i thi\u1EC3u ${minWithdraw.toLocaleString("vi-VN")} xu!`);
      return;
    }
    try {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u) => String(u.id) === String(chat));
      if (idx === -1) return;
      const user = users[idx];
      if (!isNoviceUnlocked(user)) {
        bot1.sendMessage(chat, `\u274C T\xE0i kho\u1EA3n t\xE2n th\u1EE7 ph\u1EA3i n\u1EA1p \u0111\u1EE7 <b>20.000 xu</b> v\xE0 m\u1EDF kh\xF3a t\xE2n th\u1EE7 tr\u01B0\u1EDBc khi t\u1EA1o l\u1EC7nh r\xFAt.`, { parse_mode: "HTML" });
        return;
      }
      if (user.vongCuoc && user.vongCuoc > 0) {
        bot1.sendMessage(chat, `\u274C Ch\u01B0a ho\xE0n t\u1EA5t v\xF2ng c\u01B0\u1EE3c! C\u1EA7n c\u01B0\u1EE3c th\xEAm <b>${Math.ceil(user.vongCuoc).toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }
      const fee = Math.ceil(money * 0.01);
      const totalDeduct = money + fee;
      const balance = user.sd !== void 0 ? user.sd : user.money || 0;
      if (balance < totalDeduct) {
        bot1.sendMessage(chat, `\u274C Kh\xF4ng \u0111\u1EE7 s\u1ED1 d\u01B0 v\xED k\xE8m 1% ph\xED (C\u1EA7n: ${totalDeduct.toLocaleString("vi-VN")} xu)!`);
        return;
      }
      if (user.sd !== void 0) user.sd -= totalDeduct;
      if (user.money !== void 0) user.money -= totalDeduct;
      user.rut = (user.rut || 0) + money;
      if (!user.withdrawHistory) user.withdrawHistory = [];
      user.withdrawHistory.unshift({ time: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), amount: money, fee, receiveAmount: money, bankNo: account, bankName: bank, bankUser: owner, status: "\u0110ang x\u1EED l\xFD" });
      writeJson(userJsonFile, users);
      bot1.sendMessage(chat, `\u2705 L\u1EADp \u0111\u01A1n r\xFAt xu ${money.toLocaleString("vi-VN")} xu th\xE0nh c\xF4ng! Ch\u1EDD Admin ph\xEA duy\u1EC7t.`);
      const ticket = `\u26A0\uFE0F <b>R\xDAT TI\u1EC0N CH\u1EDC DUY\u1EC6T</b>
ID: <code>${chat}</code>
S\u1ED1 xu r\xFAt: ${money.toLocaleString("vi-VN")}
Th\u1EF1c nh\u1EADn (100%): <b>${money.toLocaleString("vi-VN")} xu</b>
T\u1ED5ng n\u1EA1p: <b>${(user.nap || 0).toLocaleString("vi-VN")} xu</b>
T\u1ED5ng r\xFAt: <b>${(user.rut || 0).toLocaleString("vi-VN")} xu</b>
Bank: ${bank} | ${account} | ${owner}

Duy\u1EC7t: <code>/duyet_rut ${chat} ${money}</code>
T\u1EEB ch\u1ED1i: <code>/tuchoi_rut ${chat} ${money} [L\xFD do]</code>`;
      sendAndPinToAdminGroup(ticket, (pinnedId) => {
        try {
          const list = readJson(userJsonFile);
          const current = list.find((p) => String(p.id) === String(chat));
          if (current?.withdrawHistory) {
            const hIdx = current.withdrawHistory.findIndex((h) => h.status === "\u0110ang x\u1EED l\xFD" && h.amount === money);
            if (hIdx !== -1) {
              current.withdrawHistory[hIdx].adminMessageId = pinnedId;
              writeJson(userJsonFile, list);
            }
          }
        } catch {
        }
      });
    } catch {
    }
  });
  bot1.onText(/\/code (.+)/, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat) || !match) return;
    const code = match[1].trim();
    try {
      const gList = readJson(giftJsonFile);
      const gIdx = gList.findIndex((g2) => String(g2.gift) === code);
      if (gIdx === -1) {
        bot1.sendMessage(chat, `\u274C M\xE3 Giftcode l\u1ED9c kh\xF4ng t\u1ED3n t\u1EA1i!`);
        return;
      }
      const g = gList[gIdx];
      if (g.userIdUsed) {
        bot1.sendMessage(chat, `\u274C M\xE3 qu\xE0 t\u1EB7ng \u0111\xE3 b\u1ECB s\u1EED d\u1EE5ng!`);
        return;
      }
      const users = readJson(userJsonFile);
      const uIdx = users.findIndex((u) => String(u.id) === String(chat));
      if (uIdx === -1) return;
      users[uIdx].sd = (users[uIdx].sd || 0) + g.value;
      if (users[uIdx].money !== void 0) users[uIdx].money = (users[uIdx].money || 0) + g.value;
      users[uIdx].vongCuoc = (users[uIdx].vongCuoc || 0) + g.value;
      g.userIdUsed = String(chat);
      g.useTime = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      writeJson(giftJsonFile, gList);
      writeJson(userJsonFile, users);
      bot1.sendMessage(chat, `\u{1F389} Nh\u1EADp Giftcode +<b>${g.value.toLocaleString("vi-VN")} xu</b> th\xE0nh c\xF4ng!`, { parse_mode: "HTML" });
      sendMessageToRoom(`\u{1F451} player <b>${users[uIdx].name}</b> nh\u1EADp Giftcode l\u1ED9c +<b>${g.value.toLocaleString("vi-VN")} xu</b>!`, { parse_mode: "HTML" });
    } catch {
    }
  });
  bot1.onText(/^\/doidiemvip(?:\s+(\d+))?$/i, (msg, match) => {
    const chat = msg.chat.id;
    if (isBanned(chat)) return;
    if (msg.chat.type !== "private") {
      bot1.sendMessage(chat, "\u26A0\uFE0F L\u1EC7nh \u0111\u1ED5i \u0111i\u1EC3m VIP ch\u1EC9 d\xF9ng trong chat ri\xEAng v\u1EDBi bot ch\xEDnh.", { parse_mode: "HTML" });
      return;
    }
    try {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u) => String(u.id) === String(chat));
      if (idx === -1) {
        bot1.sendMessage(chat, "\u274C B\u1EA1n ch\u01B0a \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n! G\xF5 /start \u0111\u1EC3 \u0111\u0103ng k\xFD.");
        return;
      }
      const user = users[idx];
      user.vipPoints = Math.max(0, Number(user.vipPoints || 0));
      const vipInfo = getVipTierInfo(user);
      const rate = getVipExchangeRate(user);
      if (!match?.[1]) {
        bot1.sendMessage(
          chat,
          `${formatVipGuideMessage(user)}

\u{1F449} <b>V\xED d\u1EE5 \u0111\u1ED5i \u0111i\u1EC3m:</b> <code>/doidiemvip 10</code>
\u{1F4B8} <b>T\u1EF7 l\u1EC7 hi\u1EC7n t\u1EA1i c\u1EE7a b\u1EA1n:</b> <b>${rate.toLocaleString("vi-VN")}\u0111</b>/1 \u0111i\u1EC3m VIP`,
          { parse_mode: "HTML" }
        );
        return;
      }
      const redeemPoints = parseInt(match[1], 10);
      if (isNaN(redeemPoints) || redeemPoints <= 0) {
        bot1.sendMessage(chat, `\u26A0\uFE0F <b>Sai c\xFA ph\xE1p!</b>
D\xF9ng: <code>/doidiemvip [s\u1ED1 \u0111i\u1EC3m]</code>`, { parse_mode: "HTML" });
        return;
      }
      if (vipInfo.level <= 0 || rate <= 0) {
        bot1.sendMessage(chat, `\u26A0\uFE0F <b>B\u1EA1n ch\u01B0a \u0111\u1EE7 c\u1EA5p VIP \u0111\u1EC3 \u0111\u1ED5i \u0111i\u1EC3m.</b>
Hi\u1EC7n t\u1EA1i c\u1EA7n \u0111\u1EA1t t\u1ED1i thi\u1EC3u <b>VIP 1</b>.`, { parse_mode: "HTML" });
        return;
      }
      if (user.vipPoints < redeemPoints) {
        bot1.sendMessage(chat, `\u26A0\uFE0F <b>\u0110i\u1EC3m VIP kh\xF4ng \u0111\u1EE7!</b>
B\u1EA1n \u0111ang c\xF3: <b>${user.vipPoints.toLocaleString("vi-VN")}</b> \u0111i\u1EC3m.
D\xF9ng: <code>/doidiemvip [s\u1ED1 \u0111i\u1EC3m]</code>`, { parse_mode: "HTML" });
        return;
      }
      const receiveAmount = redeemPoints * rate;
      user.vipPoints -= redeemPoints;
      user.sd = (user.sd || 0) + receiveAmount;
      if (user.money !== void 0) user.money = (user.money || 0) + receiveAmount;
      writeJson(userJsonFile, users);
      bot1.sendMessage(
        chat,
        `\u{1F381} <b>\u0110\u1ED4I \u0110I\u1EC2M VIP TH\xC0NH C\xD4NG!</b>
\u{1F451} C\u1EA5p hi\u1EC7n t\u1EA1i: <b>VIP${vipInfo.level} ${vipInfo.badge} (${vipInfo.name})</b>
\u{1F9EE} S\u1ED1 \u0111i\u1EC3m \u0111\xE3 \u0111\u1ED5i: <b>${redeemPoints.toLocaleString("vi-VN")}</b>
\u{1F4B8} T\u1EF7 l\u1EC7 \xE1p d\u1EE5ng: <b>${rate.toLocaleString("vi-VN")}\u0111</b>/1 \u0111i\u1EC3m VIP
\u{1F4B0} S\u1ED1 xu nh\u1EADn \u0111\u01B0\u1EE3c: <b>${receiveAmount.toLocaleString("vi-VN")} xu</b>
\u{1F590}\uFE0F \u0110i\u1EC3m VIP c\xF2n l\u1EA1i: <b>${user.vipPoints.toLocaleString("vi-VN")}</b>
\u{1F3E6} S\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i: <b>${(user.sd !== void 0 ? user.sd : user.money || 0).toLocaleString("vi-VN")} xu</b>`,
        { parse_mode: "HTML" }
      );
    } catch {
    }
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
      bot1.sendMessage(chat, "\u274C S\u1ED1 l\u01B0\u1EE3ng giftcode kh\xF4ng h\u1EE3p l\u1EC7 (t\u1EEB 1 \u0111\u1EBFn 100).");
      return;
    }
    if (isNaN(value) || value < 1e3) {
      bot1.sendMessage(chat, "\u274C M\u1EC7nh gi\xE1 giftcode t\u1ED1i thi\u1EC3u 1.000 xu!");
      return;
    }
    try {
      const users = readJson(userJsonFile);
      const uIdx = users.findIndex((u) => String(u.id) === String(userId));
      if (uIdx === -1) {
        bot1.sendMessage(chat, "\u274C B\u1EA1n ch\u01B0a \u0111\u0103ng k\xFD t\xE0i kho\u1EA3n! G\xF5 /start \u0111\u1EC3 \u0111\u0103ng k\xFD.");
        return;
      }
      const user = users[uIdx];
      if (!isNoviceUnlocked(user)) {
        bot1.sendMessage(chat, `\u274C B\u1EA1n ph\u1EA3i m\u1EDF kh\xF3a t\xE2n th\u1EE7 tr\u01B0\u1EDBc m\u1EDBi mua \u0111\u01B0\u1EE3c giftcode. C\u1EA7n n\u1EA1p \u0111\u1EE7 <b>20.000 xu</b>.`, { parse_mode: "HTML" });
        return;
      }
      const balance = user.sd !== void 0 ? user.sd : user.money || 0;
      const totalValue = value * quantity;
      const totalCost = Math.ceil(totalValue * 1.03);
      if (balance < totalCost) {
        bot1.sendMessage(chat, `\u274C S\u1ED1 d\u01B0 kh\xF4ng \u0111\u1EE7! B\u1EA1n c\u1EA7n <b>${totalCost.toLocaleString("vi-VN")} xu</b> (M\u1EC7nh gi\xE1: ${totalValue.toLocaleString("vi-VN")} xu + 3% ph\xED l\xE0 ${(totalCost - totalValue).toLocaleString("vi-VN")} xu) nh\u01B0ng hi\u1EC7n t\u1EA1i ch\u1EC9 c\xF3 <b>${Math.floor(balance).toLocaleString("vi-VN")} xu</b>.`, { parse_mode: "HTML" });
        return;
      }
      user.sd = balance - totalCost;
      if (user.money !== void 0) user.money = user.money - totalCost;
      const giftcodes = readJson(giftJsonFile);
      const newCodes = [];
      const codeStrings = [];
      for (let i = 0; i < quantity; i++) {
        const generatedCode = generateGiftCode();
        newCodes.push({
          gift: generatedCode,
          value,
          creatorId: String(userId),
          createTime: (/* @__PURE__ */ new Date()).toLocaleString("vi-VN"),
          useTime: null,
          userIdUsed: null
        });
        codeStrings.push(`\u{1F511} G\xF3i: <b>${value.toLocaleString("vi-VN")}</b> xu \u{1F449} Code: <code>/code ${generatedCode}</code>`);
      }
      writeJson(giftJsonFile, [...giftcodes, ...newCodes]);
      writeJson(userJsonFile, users);
      const replyMsg = `\u{1F39F}\uFE0F <b>MUA GIFTCODE TH\xC0NH C\xD4NG!</b>
\u{1F48E} S\u1ED1 l\u01B0\u1EE3ng: <b>${quantity} m\xE3</b>
\u{1F4B0} T\u1ED5ng v\xED tr\u1EEB (g\u1ED3m 3% ph\xED): <b>${totalCost.toLocaleString("vi-VN")} xu</b>
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
${codeStrings.join("\n")}`;
      bot1.sendMessage(chat, replyMsg, { parse_mode: "HTML" });
      sendMessageToRoom(`\u{1F465} <b>Ng\u01B0\u1EDDi ch\u01A1i \u1EA9n danh</b> \u0111\xE3 mua th\xE0nh c\xF4ng <b>${quantity}</b> giftcode m\u1EC7nh gi\xE1 <b>${value.toLocaleString("vi-VN")} xu</b>!`, { parse_mode: "HTML" });
    } catch (e) {
      console.error(e);
      bot1.sendMessage(chat, "\u274C C\xF3 l\u1ED7i x\u1EA3y ra trong qu\xE1 tr\xECnh mua giftcode.");
    }
  });
  bot1.onText(/^\/lamcai\s+(\d+)$/, (msg, match) => {
    const chat = msg.chat.id;
    if (!match || !match[1] || !msg.from) return;
    const amount = parseInt(match[1], 10);
    if (isNaN(amount) || amount < 1e6 || amount > 5e6) {
      bot1.sendMessage(chat, "\u274C C\xFA ph\xE1p l\xE0m c\xE1i t\u1EEB 1.000.000 - 5.000.000!");
      return;
    }
    if (!waitingCai.value) {
      bot1.sendMessage(chat, "\u274C Ngo\xE0i th\u1EDDi gian \u0111\u0103ng k\xFD l\xE0m c\xE1i!");
      return;
    }
    if (currentCai.value) {
      bot1.sendMessage(chat, "\u26A0\uFE0F \u0110\xE3 c\xF3 ng\u01B0\u1EDDi l\xE0m c\xE1i phi\xEAn n\xE0y!");
      return;
    }
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u) => String(u.id) === String(msg.from.id));
    let user = null;
    let balance = 0;
    if (idx !== -1) {
      user = users[idx];
      balance = user.sd !== void 0 ? user.sd : user.money || 0;
    }
    if (!user || balance < amount) {
      bot1.sendMessage(chat, "\u274C S\u1ED1 d\u01B0 c\u1EE7a b\u1EA1n kh\xF4ng \u0111\u1EE7 \u0111\u1EC3 l\xE0m c\xE1i! C\u1EA7n t\u1ED1i thi\u1EC3u b\u1EB1ng s\u1ED1 ti\u1EC1n \u0111\u0103ng k\xFD.", { reply_to_message_id: msg.message_id });
      return;
    }
    if (user.sd !== void 0) user.sd -= amount;
    if (user.money !== void 0) user.money -= amount;
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
    sendMessageToRoom(
      `\u{1F451} <b>\u0110\xC3 C\xD3 NG\u01AF\u1EDCI L\xC0M C\xC1I PHI\xCAN M\u1EDAI!</b>
\u{1F3B0} Ch\u1EE7 c\xE1i: <b>${currentCai.value.name}</b>
\u{1F4B0} M\u1EE9c v\u1ED1n c\xE1i: <b>${amount.toLocaleString("vi-VN")} xu</b>
\u23F3 Vui l\xF2ng ch\u1EDD h\u1EBFt <b>20 gi\xE2y</b> l\xE0m c\xE1i \u0111\u1EC3 m\u1EDF c\u01B0\u1EE3c.`,
      { parse_mode: "HTML" }
    );
  });
  bot1.onText(/\/start(?:\s+(.+))?/, (msg, match) => {
    const chat = msg.chat.id;
    if (msg.chat.type !== "private" || isBanned(chat)) return;
    const name = msg.from?.first_name || "H\u1EA3o H\xE1n";
    const startParam = String(match?.[1] || "").trim();
    const referredById = startParam.startsWith("ref_") ? startParam.replace("ref_", "").trim() : "";
    const users = readJson(userJsonFile);
    let u = users.find((x) => String(x.id) === String(chat));
    let shouldSaveUsers = false;
    if (!u) {
      u = {
        id: String(chat),
        name,
        sd: 1e3,
        cuoc: 0,
        thang: 0,
        thua: 0,
        nap: 0,
        rut: 0,
        dkrut: 0,
        hh: 0,
        lastBetResetDate: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD"),
        lastBetWeekId: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-W"),
        cuocHomNay: 0,
        cuocTuanNay: 0,
        currentWinStreak: 0,
        currentLossStreak: 0,
        bestWinStreakToday: 0,
        bestLossStreakToday: 0,
        lastStreakPhien: 0,
        lastStreakResetDate: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD"),
        vipPoints: 0,
        vipPointCooldown: 0
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
    sendWelcomeStartMessage(chat);
  });
}
async function bootstrap() {
  initJsonFiles();
  registerAllBotCommands();
  setInterval(tickGameLoop, 1e3);
  maybeDispatchRandomHourlyGiftCode();
  setInterval(maybeDispatchRandomHourlyGiftCode, 15e3);
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      gamePhase: state.gamePhase,
      secondsLeft: state.secondsLeft,
      phien: state.phien
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
        totalBetXL: state.totalBetXL
      },
      betsLog: state.betsLog,
      cau,
      chanle,
      usersCount: list.length,
      users: list.map((u) => ({
        id: u.id,
        name: u.name,
        sd: u.sd !== void 0 ? u.sd : u.money || 0,
        vip: getVipLevel(u),
        vipPoints: getVipPoints(u),
        nap: u.nap || 0,
        rut: u.rut || 0,
        cuocHomNay: u.cuocHomNay || 0,
        cuocTuanNay: u.cuocTuanNay || 0,
        currentWinStreak: getUserActiveStreakCounts(u).win,
        currentLossStreak: getUserActiveStreakCounts(u).loss,
        streakStatus: getUserStreakStatusText(u),
        banned: banned.some((b) => String(b.id) === String(u.id)),
        depositHistory: u.depositHistory || [],
        withdrawHistory: u.withdrawHistory || []
      })),
      giftcodes: gifts,
      soloRooms: {
        open: getOpenSoloRooms(soloRooms),
        total: soloRooms.length
      },
      hu: {
        pot: hu.pot || 1e4,
        history: hu.history || [],
        forceNextPotExplosion: state.forceNextPotExplosion,
        autoPotRate: state.autoPotRate,
        lessBetWinsRate: state.lessBetWinsRate
      },
      botsStatus: [
        { name: "Bot 1 (Ch\xEDnh)", tag: "Dragon [BotChinh]", username: botUsernames[0], active: isTokenValid(tokenBot1), error: botErrors[0], token: tokenBot1 },
        { name: "Bot 2 (Ph\u1EE5 1)", tag: "Dragon Room ph\u1EE5 1", username: botUsernames[1], active: isTokenValid(tokenBot2), error: botErrors[1], token: tokenBot2 },
        { name: "Bot 3 (Ph\u1EE5 2)", tag: "Dragon Room ph\u1EE5 2", username: botUsernames[2], active: isTokenValid(tokenBot3), error: botErrors[2], token: tokenBot3 },
        { name: "Bot 4 (Ph\u1EE5 3)", tag: "Dragon Room ph\u1EE5 3", username: botUsernames[3], active: isTokenValid(tokenBot4), error: botErrors[3], token: tokenBot4 },
        { name: "Bot 5 (Ph\u1EE5 4)", tag: "Dragon Room ph\u1EE5 4", username: botUsernames[4], active: isTokenValid(tokenBot5), error: botErrors[4], token: tokenBot5 }
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
    const generated = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        gift: "GIFT" + generateGiftCode(),
        value: amount,
        creatorId: "WEB_ADMIN_PANEL",
        createTime: (/* @__PURE__ */ new Date()).toLocaleString("vi-VN"),
        useTime: null,
        userIdUsed: null
      });
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
        if (!banned.some((b) => String(b.id) === String(id))) {
          banned.push({ id: parseInt(id, 10), reason: reason || "Web Penalty", time: (/* @__PURE__ */ new Date()).toISOString() });
          bot1.sendMessage(id, `\u26D4 T\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n \u0111\xE3 b\u1ECB t\u1EA1m d\u1EEBng!`).catch(() => {
          });
        }
      } else {
        banned = banned.filter((b) => String(b.id) !== String(id));
      }
      writeJson(banJsonFile, banned);
      return res.json({ success: true });
    }
    if (action === "add" || action === "subtract") {
      const users = readJson(userJsonFile);
      const idx = users.findIndex((u) => String(u.id) === String(id));
      if (idx === -1) return res.status(404).json({ error: "User not found" });
      const value = parseInt(money, 10);
      if (isNaN(value) || value <= 0) return res.status(400).json({ error: "Invalid amount" });
      if (action === "add") {
        const result = addDepositToUser(users[idx], value);
        if (!users[idx].depositHistory) users[idx].depositHistory = [];
        users[idx].depositHistory.unshift({ time: (0, import_moment_timezone.default)().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"), amount: value.toLocaleString("vi-VN"), status: "Th\xE0nh c\xF4ng (Web Admin)" });
        let notifyMsg = `\u{1F4B8} B\u1EA1n \u0111\u01B0\u1EE3c c\u1ED9ng n\u1EA1p t\u1EEB Admin: +<b>${value.toLocaleString("vi-VN")} xu</b>.
`;
        if (result.baseResetOccurred) {
          notifyMsg += `\u26A0\uFE0F <b>L\u01B0u \xFD:</b> T\xE0i kho\u1EA3n ch\u01B0a m\u1EDF kh\xF3a t\xE2n th\u1EE7 n\xEAn s\u1ED1 d\u01B0 tr\u01B0\u1EDBc \u0111\xF3 c\u1EE7a b\u1EA1n \u0111\xE3 b\u1ECB reset v\u1EC1 <code>0 xu</code>.
`;
        }
        if (result.newlyUnlocked) {
          notifyMsg += `\u{1F389} <b>Ch\xFAc m\u1EEBng! B\u1EA1n \u0111\xE3 m\u1EDF kh\xF3a th\xE0nh vi\xEAn T\xE2n Th\u1EE7 th\xE0nh c\xF4ng</b> (T\u1ED5ng n\u1EA1p \u0111\u1EA1t ${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).
`;
        } else if (result.totalNapAfter < 2e4) {
          notifyMsg += `\u{1F512} <b>Tr\u1EA1ng th\xE1i:</b> Ch\u01B0a m\u1EDF kh\xF3a T\xE2n Th\u1EE7 (${result.totalNapAfter.toLocaleString("vi-VN")}/20.000 xu).
`;
        }
        notifyMsg += `\u{1F504} B\u1EA1n c\u1EA7n th\u1EF1c hi\u1EC7n c\u01B0\u1EE3c th\xEAm <b>${value.toLocaleString("vi-VN")} xu</b> (v\xF2ng c\u01B0\u1EE3c x1) tr\u01B0\u1EDBc khi c\xF3 th\u1EC3 th\u1EF1c hi\u1EC7n r\xFAt ti\u1EC1n!`;
        bot1.sendMessage(id, notifyMsg, { parse_mode: "HTML" }).catch(() => {
        });
      } else {
        users[idx].sd = Math.max(0, (users[idx].sd || 0) - value);
        if (users[idx].money !== void 0) users[idx].money = Math.max(0, (users[idx].money || 0) - value);
      }
      writeJson(userJsonFile, users);
      return res.json({ success: true, balance: users[idx].sd });
    }
  });
  app.post("/api/withdrawals/action", (req, res) => {
    const { id, amount, action, reason } = req.body;
    const users = readJson(userJsonFile);
    const idx = users.findIndex((u2) => String(u2.id) === String(id));
    if (idx === -1) return res.status(404).json({ error: "User not found" });
    const u = users[idx];
    const money = parseInt(amount, 10);
    let pinMsgId;
    let refundAmount = money;
    let bankName = "Ng\xE2n h\xE0ng";
    if (u.withdrawHistory) {
      const item = u.withdrawHistory.find((h) => h.status === "\u0110ang x\u1EED l\xFD" && String(h.amount) === String(money));
      if (item) {
        item.status = action === "approve" ? "Th\xE0nh c\xF4ng" : `T\u1EEB ch\u1ED1i: ${reason || "H\u1EE7y"}`;
        pinMsgId = item.adminMessageId;
        const fee = item.fee || 0;
        refundAmount = money + fee;
        bankName = item.bankName || "Ng\xE2n h\xE0ng";
      }
    }
    if (action === "reject") {
      u.sd = (u.sd || 0) + refundAmount;
      if (u.money !== void 0) u.money = (u.money || 0) + refundAmount;
      bot1.sendMessage(id, `\u274C \u0110\u01A1n r\xFAt xu tr\u1ECB gi\xE1 ${money.toLocaleString("vi-VN")} xu \u0111\xE3 b\u1ECB t\u1EEB ch\u1ED1i! Ho\xE0n xu v\xE0o v\xED.`).catch(() => {
      });
    } else {
      bot1.sendMessage(id, `\u2705 Y\xEAu c\u1EA7u r\xFAt xu tr\u1ECB gi\xE1 ${money.toLocaleString("vi-VN")} xu \u0111\xE3 \u0111\u01B0\u1EE3c duy\u1EC7t chuy\u1EC3n kho\u1EA3n th\xE0nh c\xF4ng!`).catch(() => {
      });
      sendMessageToRoom(`<b>\u{1F929} R\xFAt Xu Th\xE0nh C\xF4ng - ID ${formatMaskedId(u.id)}: +${money.toLocaleString("vi-VN")} xu v\u1EC1 ${bankName}</b>`, { parse_mode: "HTML" });
    }
    writeJson(userJsonFile, users);
    if (pinMsgId) unpinFromAdminGroup(pinMsgId);
    res.json({ success: true });
  });
  app.get("/api/download", (req, res) => {
    try {
      const zip = new import_adm_zip.default();
      const files = import_fs.default.readdirSync(process.cwd());
      for (const file of files) {
        if (["node_modules", ".git", ".next", "dist", "package-lock.json", "Source.zip"].includes(file)) continue;
        const s = import_fs.default.statSync(import_path.default.join(process.cwd(), file));
        if (s.isDirectory()) zip.addLocalFolder(import_path.default.join(process.cwd(), file), file);
        else zip.addLocalFile(import_path.default.join(process.cwd(), file));
      }
      const zipPath = import_path.default.join(process.cwd(), "Source.zip");
      zip.writeZip(zipPath);
      res.download(zipPath, "LuckyBank_Source.zip");
    } catch (e) {
      res.status(500).send("Zipping failed: " + e.message);
    }
  });
  const distPath = import_path.default.join(process.cwd(), "dist");
  if (import_fs.default.existsSync(distPath)) {
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  } else {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
      app.use(vite.middlewares);
    } catch {
    }
  }
  app.listen(3e3, "0.0.0.0", () => {
    console.log("\u{1F680} Server running on port 3000");
  });
}
bootstrap();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CANCUA_LIMIT,
  DAILY_STREAK_MIN,
  DAILY_STREAK_PRIZES,
  DEPOSIT_ACCOUNT_NAME,
  DEPOSIT_ACCOUNT_NO,
  DEPOSIT_BANK_CODE,
  DEPOSIT_BANK_NAME,
  DEPOSIT_ORDER_COOLDOWN_SECONDS,
  EVENT_DAILY_MIN_DEPOSIT,
  EVENT_KEYWORD,
  EVENT_REWARD_GIFTCODE_VALUE,
  EVENT_STREAK_TARGET_DAYS,
  HOURLY_ROOM_GIFTCODE_VALUE,
  SESSION_LIMIT,
  SOLO_MIN_BET,
  SOLO_PAYOUT_RATE,
  SOLO_ROLL_TIMEOUT_MS,
  TELEGRAM_XX_MAX_BET,
  TELEGRAM_XX_MIN_BET,
  TELEGRAM_XX_PAYOUT_RATE,
  VIP_TIERS,
  addDepositToUser,
  adminId,
  adminn,
  applyVipPointFromBet,
  awardReferralCommission,
  banJsonFile,
  bot1,
  bot2,
  bot3,
  bot4,
  bot5,
  botErrors,
  botUsernames,
  bots,
  buildDailyStreakLeaderboard,
  buildDepositQrImageUrl,
  buildReferralDeepLink,
  buildSoloRoomDeepLink,
  caiTimeout,
  checkAndResetUserBets,
  checkSpecialRoll,
  clearSoloRoomPin,
  compareSoloRolls,
  createGiftcodeRecord,
  createManualDepositRequest,
  currentCai,
  distributePotToWinners,
  ensureRandomHourlyGiftSchedule,
  finalizeSoloRoom,
  formatDailyStreakTopRoomMessage,
  formatDepositOrderCaption,
  formatGameCatalogMessage,
  formatMaskedId,
  formatRoomBotMessage,
  formatRoomDefaultGuideMessage,
  formatSoloLobbyMessage,
  formatSoloOpenRooms,
  formatSoloPinnedRoomMessage,
  formatSoloRollPrompt,
  formatSoloRoomAnnouncement,
  formatTelegramXXGuideMessage,
  formatUserCheckMessage,
  formatVipGuideMessage,
  gameRoomLink,
  generateAutoRewardGiftCode,
  generateGiftCode,
  generateRandomSuffix,
  generateSoloRoomCode,
  generateUniqueGiftCode,
  getDepositItemDateKey,
  getDepositOrderCooldownRemainingSeconds,
  getDuaTopReplyMarkup,
  getGameCatalogReplyMarkup,
  getLatestCompletedPhien,
  getMainMenuReplyMarkup,
  getOpenSoloRooms,
  getSoloRollReplyMarkup,
  getTelegramXXLabel,
  getUserActiveBetGame,
  getUserActiveStreakCounts,
  getUserBalance,
  getUserQualifiedStreak,
  getUserStreakStatusText,
  getUserSuccessfulDepositTotalOnDate,
  getVNDateKey,
  getVipBadge,
  getVipExchangeRate,
  getVipLevel,
  getVipPoints,
  getVipRedeemablePoints,
  getVipRoomBadgePrefix,
  getVipTierInfo,
  getWelcomeStartCaption,
  giftJsonFile,
  groupt,
  handlePot,
  handleSoloRollAction,
  hasUserSuccessfulDepositInLastDays,
  hourlyGiftStateJsonFile,
  initJsonFiles,
  isAdminGroupChat,
  isAdminUser,
  isBanned,
  isGameRoomChat,
  isNoviceUnlocked,
  isSuccessfulDepositStatus,
  isTelegramNameQualified,
  isTelegramXXBetType,
  isTelegramXXWin,
  isTokenValid,
  lockGroupChat,
  maybeDispatchRandomHourlyGiftCode,
  normalizeMoneyNumber,
  parseBetText,
  phienJsFile,
  pinGroupMessageWithResilience,
  processSoloRoomTimeouts,
  readJson,
  readSoloRooms,
  registerAllBotCommands,
  removePinnedSoloRoomMessage,
  resetBettingSession,
  resetUserDailyStreaks,
  rollSoloBattleResult,
  rollSoloDiceSet,
  savePhien,
  sendAndPinToAdminGroup,
  sendAndPinToGameRoom,
  sendDice,
  sendMessageToAdminGroup,
  sendMessageToRoom,
  sendResilientReply,
  sendSoloReply,
  sendSoloRoomAnnouncement,
  sendSoloTelegramDice,
  sendWelcomeStartMessage,
  setUserBalance,
  soloRoomsJsonFile,
  state,
  thongkeJsonFile,
  tickGameLoop,
  toBoldDigits,
  tokenBot1,
  tokenBot2,
  tokenBot3,
  tokenBot4,
  tokenBot5,
  unlockGroupChat,
  unpinFromAdminGroup,
  unpinFromGameRoom,
  updateUserStreakAfterRound,
  userJsonFile,
  vatphamJsonFile,
  waitingCai,
  welcomeStartImagePath,
  writeJson,
  writeSoloRooms
});
//# sourceMappingURL=server.cjs.map
