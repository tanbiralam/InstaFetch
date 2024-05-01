import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./ui/accordion";
  
  const FAQs = () => {
    return (
      <div className="flex justify-center items-center flex-col p-2 ">
        <h1 className="text-2xl font-bold ">Frequently Asked Question!</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="flex justify-between items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <span>Is it Free to download?</span>
            </AccordionTrigger>
            <AccordionContent className="py-2 px-4 bg-white border-l border-r border-b border-gray-200">
              <p className="text-gray-700">
                Yes. It completely free to download instagram videos.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="flex justify-between items-center py-2 px-4 bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <span>How to ?</span>
            </AccordionTrigger>
            <AccordionContent className="py-2 px-4 bg-white border-l border-r border-b border-gray-200">
              <p className="text-gray-700">
                Yes. It adheres to the WAI-ARIA design pattern.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };
  
  export default FAQs;
  