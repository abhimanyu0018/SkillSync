import React, { useState } from 'react';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: 'What is SkillSync?',
      answer:
        'Getting started is easy! Sign up for an account, and you\'ll have access to our platform\'s features. No credit card required for the initial signup.',
    },
    {
      question: 'What is the pricing structure?',
      answer:
        'Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.',
    },
    {
      question: 'What kind of support do you provide?',
      answer:
        'We offer comprehensive customer support. You can reach out to our support team through email.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'No, you can not cancel your subscription. We believe it would be a hassle to our instrutors.',
    },
  ];

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24 overflow-hidden">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Explore Common Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-black">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 text-gray-400 transform ${openIndex === index ? 'rotate-0' : 'rotate-180'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
