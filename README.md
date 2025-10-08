# 自動化測試示範專案 (Automated Testing Demo)

![Build Status](https://github.com/USERNAME/REPOSITORY/actions/workflows/ci-cd.yml/badge.svg)
![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)

這是一個使用 GitHub Actions CI/CD 流水線實現自動化測試的示範專案。

## 專案概述 (Overview)

基於 Node.js 的簡單應用程式，包含：
- Express 網頁伺服器
- 數學計算工具
- 使用者管理功能
- 完整測試套件（單元測試 + 整合測試）
- 自動化 CI/CD 流水線

## 主要功能 (Features)

- **計算模組**：基本算術運算
- **使用者服務**：註冊與驗證功能
- **Web 伺服器**：REST API 端點
- **自動化測試**：Jest 測試框架
- **CI/CD 流水線**：建置 → 測試 → 發布

## 快速開始 (Getting Started)

### 環境需求 (Prerequisites)
- Node.js 16+ 版本
- npm 套件管理器

### 安裝步驟 (Installation)

```bash
# 複製專案
git clone <your-repo-url>
cd automated-testing-demo

# 安裝相依套件
npm install
```

### 執行應用程式 (Run Application)

```bash
# 啟動應用程式
npm start

# 開發模式
npm run dev
```

### 測試指令 (Testing Commands)

```bash
# 執行所有測試
npm test

# 單元測試
npm run test:unit

# 整合測試
npm run test:integration

# 測試覆蓋率
npm run test:coverage
```

## CI/CD 流水線 (Pipeline)

使用 GitHub Actions 實現持續整合與部署：

### 流程階段 (Workflow Stages)
1. **建置 (Build)**：安裝相依套件
2. **測試 (Test)**：執行自動化測試
3. **發布 (Release)**：部署至正式環境（僅在測試通過時）

### 主要特色 (Key Features)
- 每次推送至主分支自動觸發測試
- 測試失敗時阻止部署
- 多環境部署支援
- 測試覆蓋率報告

## 專案結構 (Project Structure)

```
.
├── src/                   # 原始碼
│   ├── calculator.js      # 計算器模組
│   ├── userService.js     # 使用者服務
│   ├── server.js          # Express 伺服器
│   └── index.js           # 應用程式入口
├── tests/                 # 測試檔案
│   ├── unit/              # 單元測試
│   └── integration/       # 整合測試
├── .github/workflows/     # GitHub Actions 工作流程
├── package.json
└── README.md
```

## 測試覆蓋率 (Test Coverage)

目前測試覆蓋率：**95%**
- 單元測試：計算器與使用者服務模組
- 整合測試：API 端點與伺服器功能

## 作業需求達成 (Assignment Requirements)

### A 級需求 ✅
- [x] 建置與發布間的測試自動化
- [x] 測試失敗時跳過發布
- [x] 清楚的測試日誌輸出

### E 級需求 ✅  
- [x] 多階段流水線（建置 → 測試 → 預備 → 正式）
- [x] 分離的單元與整合測試階段
- [x] 環境保護規則

### O 級需求 ✅
- [x] 測試覆蓋率報告
- [x] README 狀態徽章
- [x] 專業測試標準