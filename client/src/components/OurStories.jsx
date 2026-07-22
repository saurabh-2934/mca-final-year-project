import Header from "./Header.home";
import Footer from "./Footer";

function OurStories() {
  const stories = [
    {
      title: "Our Beginning",
      year: "2026",
      description:
        "QuickArt started with a vision to simplify online shopping and provide customers with genuine products at affordable prices.",
    },
    {
      title: "Growing Together",
      year: "2027",
      description:
        "We expanded our product categories and partnered with leading brands to bring better quality and greater choice.",
    },
    {
      title: "Today",
      year: "Now",
      description:
        "Thousands of customers trust QuickArt for secure payments, fast delivery and excellent customer service.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="pt-32 flex-1 px-4 md:px-32 pb-10 mt-20">
        <h1 className="text-4xl font-bold mb-10">Our Story</h1>

        <div className="space-y-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-blue-600">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{story.title}</h2>

                <span className="bg-blue-600 text-white px-4 py-1 rounded-full">
                  {story.year}
                </span>
              </div>

              <p className="text-gray-600 mt-5 leading-8">
                {story.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-10 mt-12 text-center">
          <h2 className="text-3xl font-bold mb-5">Thank You ❤️</h2>

          <p className="text-lg leading-8">
            Every order you place helps us improve and serve you better. Thank
            you for being part of the QuickArt journey.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OurStories;
