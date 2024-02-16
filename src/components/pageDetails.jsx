import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import download from "../assets/download.jpg";
import { faqData } from "../../utils/faqData";

const pageDetails = () => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="py-8 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <div className="mb-10">
          <h2 className="text-4xl font-semibold text-gray-800 text-left">
            {t("about.title")}
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-left">
            {t("about.description")}
          </p>
        </div>

        {/* How to Use Section */}
        <div className="mb-10" id="how-to-download">
          <h2 className="text-3xl font-semibold text-gray-800 text-left">
            {t("howToUse.title")}
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-left">
            {t("howToUse.description")}
          </p>
          <ol className="list-decimal text-gray-700 ml-6 mt-2">
            <li>{t("howToUse.steps.0")}</li>
            <li>{t("howToUse.steps.1")}</li>
            <li>{t("howToUse.steps.2")}</li>
          </ol>
          <div className="mt-8 text-left">
            <img
              src={download}
              alt="How to Use"
              className="mx-auto max-w-full"
            />
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center md:text-left mb-6">
            {t("faq.title")}
          </h2>
          <div className="space-y-4 md:space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-2 md:mb-4">
                <button
                  className="flex justify-between w-full text-left rounded-md py-2 px-4 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                  style={{
                    background: "linear-gradient(90deg,#a982ba 0,#e27855 100%)",
                  }}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {t(faq.questionKey)}
                  </h3>
                  <span className="text-white text-2xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="rounded-md text-sm md:text-base bg-white text-black mt-2 px-4 py-2">
                    {t(faq.answerKey)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default pageDetails;
