import BgImg from '/Subtract.png'
import UserImg from '/UserImg.png'
import BarCode from '/BarCode.png'
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';


export default function FormThree({ setStep }) {
  const [ticketDataValues, setTicketDataValues] = useState({
    name: '',
    email: '',
    specialRequest: '',
    ticketData: {
      ticketType: '',
      quantity: ''
  }
});

const ticketRef = useRef(null); // Reference to the ticket section

  const handleNext = () => {
    setStep(1);
};

useEffect(() => {
  const ticketFormData = localStorage.getItem('ticketFormData');
  const ticketData = localStorage.getItem('ticketData');

  if (ticketFormData) {
      const parsedFormData = JSON.parse(ticketFormData);
      setTicketDataValues({
          ...parsedFormData,
          ticketData: JSON.parse(ticketData),
      });
  }
}, []);

const handleDownload = async () => {

  const ticketElement = ticketRef.current;
  if (!ticketElement) {
    console.error("Ticket element not found!");
    return;
  }

  // Wait for images to load before capturing the canvas
  const images = ticketElement.querySelectorAll("img");
  const imagePromises = Array.from(images).map((img) => {
    return new Promise((resolve) => {
      if (img.complete) resolve(); // Image is already loaded
      else img.onload = resolve;
    });
  });

  await Promise.all(imagePromises);

  html2canvas(ticketElement, {
    scale: 2,
    useCORS: true, // ✅ Allow external images
    allowTaint: true, // ✅ Allow data from images without CORS
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Ticket.pdf");

    console.log('Download Complete ✅');
  }).catch((error) => {
    console.error("Error generating PDF:", error);
  });
};

return (
  
  <div
  >
    <div className="mb-[32px]">
        <div className="space-y-2 lg:flex flex-row justify-between text-white">
            <h1 className="jeju-font text-2xl font-normal lg:text-[32px]">Ready</h1>

            <h1 className="roboto-font text-[16px] my-auto">Step 2/3</h1>
        </div>

        <progress className="progress-bar" value="80" max="100" />
    </div>

    <div className="text-center space-y-5 text-[#FAFAFA] roboto-font mb-20">
        <h1 className=" text-2xl lg:text-[32px] font-bold">Your Ticket is Booked!</h1>
        <p className="text-[16px] font-normal">Check your email for a copy or you can download</p>
    </div>

    <div 
        className="w-full h-[600px] bg-center bg-no-repeat bg-contain my-10"
        style={{ backgroundImage: `url(${BgImg})` }}
        ref={ticketRef}
      >
        <div className='flex justify-center h-full'>
            <div className='w-[300px] h-[460px] my-3 px-5'>
                <div className='border h-full border-[#197686] rounded-2xl flex flex-col justify-center items-center space-y-5'> 
                  <div className='h-full w-full flex flex-col justify-start items-start space-y-5'>
                    <div className='w-full'>
                      <h1 className="road-rage-font text-center text-white text-[34px]">Techember Fest ”25</h1>

                      <p className='text-center font-[10px] roboto-font text-white'>📍 04 Rumens road, Ikoyi, Lagos</p>
                      <p className='text-center font-[10px] roboto-font text-white'>📅 March 15, 2025 | 7:00 PM</p>

                      <div className='w-full flex justify-center mt-3'>
                      <img
                          src={ticketDataValues?.profilePhoto || UserImg}
                          alt="userImage"
                          className="w-[150px] h-[150px] my-3"
                          onLoad={() => console.log("Image loaded successfully!")} // Debugging
                          crossOrigin="anonymous" // If fetching from external sources
                      />
                      </div>

                      <div className='bg-[#08343C] mx-3 p-1 rounded-lg roboto-font text-[#FFFFFF]'>
                        <div className=' grid grid-cols-2'>                          
                          <div className='space-y-1 p-1 px-2 border-b border-[#12464E] border-r'>
                            <p className='text-[10px] font-[400px] opacity-[0.33]'>Enter your name</p>
                            <h1 className='break-words overflow-wrap-break-word text-[12px] font-[700]'>{ticketDataValues?.name}</h1>
                          </div>

                          <div className='space-y-1 p-1 border-b border-[#12464E] px-2'>
                            <p className='text-[10px] font-[400px] opacity-[0.33]'>Enter your email *</p>
                            <h1 className='break-words overflow-wrap-break-word text-[12px] font-[700]'>{ticketDataValues?.email}</h1>
                          </div>

                          <div className='space-y-1 p-1 px-2 border-b border-[#12464E] border-r'>
                            <p className='text-[10px] font-[400px] opacity-[0.33]'>Ticket Type:</p>
                            <h1 className='text-[12px] font-[700]'>{ticketDataValues?.ticketData?.ticketType}</h1>
                          </div>

                          <div className='space-y-1 p-1 px-2 border-b border-[#12464E]'>
                            <p className='text-[10px] font-[400px] opacity-[0.33]'>Ticket for :</p>
                            <h1 className='text-[12px] font-[700]'>{ticketDataValues?.ticketData?.quantity}</h1>
                          </div>
                        </div>

                        <div className='px-2 roboto-font space-y-1'>
                          <p className='text-[12px] font-[400px] opacity-[0.33]'>Special request?</p>
                          <h1 className='text-[10px] break-words overflow-wrap-break-word '>
                            {ticketDataValues?.specialRequest?.length > 21 
                              ? ticketDataValues.specialRequest.slice(0, 98) + "..." 
                              : ticketDataValues?.specialRequest}
                          </h1>
                        </div>
                      </div>

                      <div className='mt-12 flex justify-center'>
                        <img src={BarCode} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    

    <div className="lg:flex lg:justify-between mt-8 space-x-10 space-y-3 lg:space-y-0">
        <button onClick={handleDownload} className="lg:hidden lg:order-1 jeju-font p-3 rounded-lg bg-[#24A0B5] text-white w-full cursor-pointer text-[16px]">Download Ticket</button>  
        <button onClick={handleNext} className="jeju-font text-[16px] border-2 border-[#07373F] text-[#24A0B5] p-3 rounded-lg w-full cursor-pointer">Book Another Ticket</button>
        <button onClick={handleDownload} className="hidden lg:block lg:order-1 jeju-font p-3 rounded-lg bg-[#24A0B5] text-white w-full cursor-pointer text-[16px]">Download Ticket</button>  
    </div>
</div>
  )
}

FormThree.propTypes = {
  setStep: PropTypes.func.isRequired,
};
