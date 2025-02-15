import PropTypes from "prop-types";
import { useState } from "react";


export default function FormOne({ setStep}) {

    const [selectedTicket, setSelectedTicket] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('1');

    const [ticketError, setTicketError] = useState(false);

    const handleNext = () => {
        if (!selectedTicket) {
            setTicketError(true);
            return;
        }
        // Store the ticket data in localStorage
        const ticketData = {
            ticketType: selectedTicket,
            quantity: selectedNumber
        };
        localStorage.setItem('ticketData', JSON.stringify(ticketData));
        setStep(2);
    };

    const handlePrevious = () => {
        setStep(1);
    };
    
    const ticketType = [
        {
            fee: "Free",
            class: "Regular Access",
            rate: "20/52"
        },

        {
            fee: "$150",
            class: "VIP Access",
            rate: "20/52"
        },

        {
            fee: "$200",
            class: "VVIP Access",
            rate: "20/52"
        },
    ]

  return (
    <div>
        <div className="mb-[32px]">
            <div className="space-y-2 lg:flex flex-row justify-between text-white">
                <h1 className="jeju-font text-2xl font-normal lg:text-[32px]">Ticket Selection</h1>

                <h1 className="roboto-font text-[16px] my-auto">Step 1/3</h1>
            </div>

            <progress className="progress-bar" value="33" max="100" />
        </div>

        <div className="lg:bg-[#08252B] lg:p-[24px] lg:rounded-4xl lg:border-2 lg:border-[#07373F]">
            <div className="border-b-4 pb-8 border-[#07373F]">
                <div className="text-white rounded-3xl backdrop:blur-[4px] border-2 border-[#07373F] gradient-background text-center pt-5 pb-3 flex flex-col justify-center align-center">
                    <div>
                        <h1 className="road-rage-font text-5xl lg:text-[62px]">Techember Fest ”25</h1>

                        <div className="flex justify-center mt-2 roboto-font text-sm lg:text-[16px]">
                            <p className="w-80 px-10 lg:px-0">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
                        </div>
                    </div>

                    <div className="w-full lg:flex justify-center gap-x-2 mt-10 lg:mt-2 leading-7 roboto-font text-[16px]">
                        <p>📍 [Event Location]</p>

                        <span className="hidden lg:block">||</span>

                        <p>March 15, 2025 | 7:00 PM</p>
                    </div>
                </div>
            </div>

            <div className="pt-8 text-white">
                <h1 className="mb-2 roboto-font text-[16px]">Select Ticket Type:</h1> 

                <div className="border-2 border-[#07373F] bg-[rgb(5,34,40)] rounded-2xl p-3">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {ticketType.map((item) => (
                            <div 
                                className={`hover:bg-[#197686] border-2 border-[#197686] rounded-xl p-3 roboto-font cursor-pointer ${selectedTicket === item.class ? "bg-[#12464E]" : ""}`}
                                onClick={() => setSelectedTicket(item.class)}
                                key={item.index}
                            >
                                <h1 className="font-semibold text-2xl">{item.fee}</h1>

                                <h2 className="mt-2 font-normal text-[16px] xl:text-[14px] uppercase">{item.class}</h2>
                                <p className="text-sm">{item.rate}</p>
                            </div>
                        ))}
                    </div>
                    {ticketError && (
                        <p className="text-red-500 text-sm mt-2">Please select a ticket type.</p>
                    )}
                </div>
            </div>

            <div className="pt-8 text-white roboto-font">
                <h1 className="mb-2 text-[16px] font-normal">Number of Tickets:</h1> 

                <select 
                    className="w-full p-2 bg-[#08252B] border-2 border-[#07373F] rounded-lg focus:outline-none focus:border-[#197686]"
                    onChange={(e) => setSelectedNumber(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div className="lg:flex lg:justify-between mt-8 space-x-10 space-y-3 lg:space-y-0">
                <button onClick={handleNext} className="lg:hidden lg:order-1 jeju-font p-3 rounded-lg bg-[#24A0B5] text-white w-full cursor-pointer text-[16px]">Next</button>  
                <button onClick={handlePrevious} className="jeju-font text-[16px] border-2 border-[#07373F] text-[#24A0B5] p-3 rounded-lg w-full cursor-pointer">Cancel</button>
                <button onClick={handleNext} className="hidden lg:block lg:order-1 jeju-font p-3 rounded-lg bg-[#24A0B5] text-white w-full cursor-pointer text-[16px]">Next</button>  
            </div>
        </div>
    </div>
  )
}

FormOne.propTypes = {
    setStep: PropTypes.func.isRequired,
}
