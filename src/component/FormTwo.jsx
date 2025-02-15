import { useRef, useState } from "react";
import DownloadIcon from '/cloud-download.png'
import { FaRegEnvelope } from "react-icons/fa";
import PropTypes from "prop-types";


export default function FormTwo({ setStep }) {
    const [email, setEmail] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [name, setName] = useState('');

    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        fileInputRef.current.click(); // Triggers the file input
    };

    const handleNext = () => {
        if (!name.trim() || !email.trim()) {
            alert('Please fill in both name and email fields');
            return setStep(2);
        }

        const formData = {
            name,
            email,
            specialRequest,
            profilePhoto: profilePhoto ? profilePhoto : null
        };
        console.log(formData);
        localStorage.setItem('ticketFormData', JSON.stringify(formData));

        setStep(3);
    };

    const handlePrevious = () => {
        setStep(1);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default');
    
            try {
                const response = await fetch(
                    'https://api.cloudinary.com/v1_1/dngzamcfh/image/upload',
                    {
                        method: 'POST',
                        body: formData,
                    }
                );
                const data = await response.json();
                setProfilePhoto(data.secure_url);
                console.log('Uploaded image URL:', data);
            } catch (error) {
                console.log('Upload error:', error);
            }
        }
    };
  return (
    <div>
        <div className="mb-[32px]">
            <div className="space-y-2 lg:flex flex-row justify-between text-white">
                <h1 className="jeju-font text-2xl font-normal lg:text-[32px]">Attendee Details</h1>

                <h1 className="roboto-font text-[16px] my-auto">Step 2/3</h1>
            </div>

            <progress className="progress-bar" value="50" max="100" />
        </div>

        <form className="lg:bg-[#08252B] lg:p-[24px] lg:rounded-4xl lg:border-2 lg:border-[#07373F]">
            <div className="border-b-4 pb-8 border-[#07373F]">
                <div 
                    className='bg-[#052228] border border-[#197686] rounded-xl p-3 roboto-font'
                >
                    <h1 className="text-[16px] text-[#FAFAFA]">Upload profile photo</h1>

                    <div className="my-2.5">
                        <div className="lg:bg-[#00000033] lg:h-48 lg:my-10 lg:relative">
                            <div className="flex flex-col justify-center items-center">
                                <div 
                                    className="cursor-pointer border-2 w-60 h-60 bg-[#0E464F] border-[#24A0B580] rounded-4xl flex flex-col space-y-5 justify-center items-center lg:absolute lg:top-24 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"
                                    onClick={handleDivClick}
                                >
                                    <img src={DownloadIcon} alt="download" />
                                    <p className="text-white">Drag & drop or click to upload</p>
                                </div>

                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileChange}
                                    accept="image/*" // Restrict to images
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-8 roboto-font">
                <h1 className="text-[16px] text-white ">Enter your name</h1>
                <input 
                    type="text" 
                    value={name}
                    className="mt-3 w-full bg-[#052228] border border-[#197686] rounded-xl p-3 roboto-font text-white" 
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="my-8 roboto-font">
                <h1 className="text-[16px] text-white ">Enter your email</h1>
                <div className="mt-3 flex flex-row w-full bg-[#052228] border border-[#197686] rounded-xl p-3 roboto-font text-white space-x-3">
                    <FaRegEnvelope size={24} className="text-white" />
                    <input 
                        type="text" 
                        value={email}
                        className="w-full focus:border-0 focus:outline-none" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="my-8 roboto-font">
                <h1 className="text-[16px] text-white ">Special request?</h1>

                <textarea 
                    type="text" 
                    value={specialRequest}
                    className="mt-3 h-32 w-full bg-[#052228] border border-[#197686] rounded-xl p-3 roboto-font text-white" 
                    onChange={(e) => {
                        const words = e.target.value.trim().split(/\s+/);
                        if (words.length <= 21) {
                            setSpecialRequest(e.target.value);
                        }
                    }}
                />
            </div>

            <div className="lg:flex lg:justify-between mt-8 space-x-10 space-y-3 lg:space-y-0">
                <button onClick={handleNext} type="submit" className="lg:hidden lg:order-1 jeju-font p-3 rounded-lg bg-[#24A0B5] text-white w-full cursor-pointer text-[16px]">Next</button>  
                <button onClick={handlePrevious} className="jeju-font text-[16px] border-2 border-[#07373F] text-[#24A0B5] p-3 rounded-lg w-full cursor-pointer">Cancel</button>
                <button onClick={handleNext} type="submit" className="hidden lg:block lg:order-1 jeju-font p-3 rounded-lg bg-[#24A0B5] text-white w-full cursor-pointer text-[16px]">Next</button>  
            </div>
        </form>

    </div>
  )
}

FormTwo.propTypes = {
    setStep: PropTypes.func.isRequired,
};
