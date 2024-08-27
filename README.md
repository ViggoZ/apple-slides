
# Apple Bento Slides

A dynamic web application showcasing Apple event slides in a bento-box style layout.

[中文版本](README.zh.md)

## Features

- Responsive grid layout for slides
- Time-based filtering
- Category-based filtering
- Dynamic loading of slide images

## Technologies Used

- Next.js 13+
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm 6.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ViggoZ/apple-slides.git
   ```
2. Navigate to the project directory:
   ```bash
   cd apple-bento-slides
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
