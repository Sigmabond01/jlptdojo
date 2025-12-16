import Image from "next/image";

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={`grid md:auto-rows-[15rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={`row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-500 shadow-input dark:shadow-none p-4 
        bg-white/50 dark:bg-neutral-950 border-2 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30
        flex flex-col space-y-4 ${className}`}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-500">
        {icon}
        <div className="font-bold text-black dark:text-white mb-2 mt-2">
          {title}
        </div>
        <div className="font-normal text-gray-600 dark:text-gray-400 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};

// Image Component
const ImageCard = ({ src }: { src: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden group relative">
    <Image
      src={src}
      alt="Feature"
      className="w-full h-full object-cover transition-transform duration-500"
      width={200} height={100}
    />
  </div>
);

export function Features() {
  const items = [
    {
      title: "Interactive Vocabulary",
      description: "Master Japanese words through smart drills and adaptive spaced repetition.",
      header: <ImageCard src="https://i.pinimg.com/736x/a6/01/6e/a6016ea1ea90ce3a60aae0904ca6bc69.jpg" />,
    },
    {
      title: "Grammar Dojo",
      description: "Train core JLPT grammar with focused examples and intuitive explanations.",
      header: <ImageCard src="https://i.pinimg.com/736x/e8/1b/b1/e81bb19aad86e07c646d4b135ab50c9e.jpg" />,
    },
    {
      title: "Reading Practice",
      description: "Improve comprehension with real-world texts crafted for each JLPT level.",
      header: <ImageCard src="https://i.pinimg.com/736x/9f/ef/b5/9fefb5887c1bd0e17ab771c0a00044e7.jpg" />,
    },
    {
      title: "Progress Tracking",
      description: "Visualize your study growth and unlock milestones with measurable progress.",
      header: <ImageCard src="https://i.pinimg.com/1200x/b7/9e/f5/b79ef51dfdced2ec9d8c471157b0c4f3.jpg" />,
      className: "md:col-span-2",
    },
    {
      title: "Kanji Mastery",
      description: "Build kanji recognition and writing confidence through daily repetition.",
      header: <ImageCard src="https://i.pinimg.com/736x/e9/03/1c/e9031c4c81b06194b90decb17a75207a.jpg" />,
    },
  ];

  return (
    <div className="relative z-10 min-h-screen bg-gray-400 dark:bg-black text-black dark:text-white flex flex-col items-center justify-center p-8 overflow-hidden transition-colors duration-500">
      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">
          FEATURES
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-400 dark:text-gray-500">
          <p className="text-lg">Master vocabulary, grammar, and kanji while tracking your progress like a pro.</p>
        </div>
      </div>

      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}