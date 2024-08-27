
# Apple Bento Slides 苹果便当式幻灯片

一个动态网页应用，以便当盒风格展示苹果发布会幻灯片。

[English Version](README.md)

## 特性

- 响应式网格布局展示幻灯片
- 基于时间的筛选
- 基于类别的筛选
- 动态加载幻灯片图片

## 使用的技术

- Next.js 13+
- React
- TypeScript
- Tailwind CSS

## 开始使用

### 先决条件

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

### 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/ViggoZ/apple-slides.git
   ```
2. 进入项目目录：
   ```bash
   cd apple-bento-slides
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 运行开发服务器：
   ```bash
   npm run dev
   ```
5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 项目结构

```plaintext
apple-slides/
├── app/
│   ├── api/
│   ├── components/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
│   └── assets/
├── types/
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
