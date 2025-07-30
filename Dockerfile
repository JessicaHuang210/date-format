# 使用 Node.js 23 作為基礎映像
FROM node:23-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安裝依賴
RUN yarn install --frozen-lockfile

# 複製所有源碼
COPY . .

# 建置應用程式
RUN yarn build

# 暴露 port 8080 (Cloud Run 預設)
EXPOSE 8080

# 啟動 Next.js 應用程式
CMD ["yarn", "start"] 