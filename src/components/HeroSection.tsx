interface HeroSectionProps {
    title: string
    subtitle: string
    imageUrl?: string
  }
  
  const HeroSection = ({ title, subtitle, imageUrl }: HeroSectionProps) => {
    return (
      <div className="relative bg-gray-900 text-white">
        {imageUrl && (
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt="Hero background"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            {subtitle}
          </p>
        </div>
      </div>
    )
  }
  
  export default HeroSection