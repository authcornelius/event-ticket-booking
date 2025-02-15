import { useRef, useState } from "react";
import DownloadIcon from '/cloud-download.png'
import { FaRegEnvelope } from "react-icons/fa";
import PropTypes from "prop-types";
import { SiVerizon } from "react-icons/si";


export default function FormTwo({ setStep }) {
    const [email, setEmail] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [viewProfilePhoto, setViewProfilePhoto] = useState(false);
    const [name, setName] = useState('');
    
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        fileInputRef.current.click(); // Triggers the file input
    };

    const handleNext = (event) => {
        event.preventDefault(); // Prevent form submission
    
        let hasError = false;
    
        if (!name.trim()) {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        } 
    
        if (!email.trim()) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

        if (!profilePhoto) {
            setImageError(true);
            hasError = true;
        } else {
            setImageError(false);
        }
    
        if (hasError) return; // Stop navigation if validation fails
    
        const formData = {
            name,
            email,
            specialRequest,
            profilePhoto: profilePhoto || null,
        };
        localStorage.setItem("ticketFormData", JSON.stringify(formData));
    
        setStep(3); // Move to FormTwo
    };
    
    

    const handlePrevious = () => {
        setStep(1);
    };

    const handleFileChange = async (event) => {
        setUploading(true);
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
                setUploadSuccess(true);
                setUploading(false);
                setImageError(false)
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
                                {profilePhoto ? (
                                    <div 
                                        className="cursor-pointer border-2 w-60 h-60 bg-[#0E464F] border-[#24A0B580] rounded-4xl flex flex-col space-y-5 justify-center items-center lg:absolute lg:top-24 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"
                                    >
                                        <img src={profilePhoto} alt="uploaded" className="w-full h-full object-cover rounded-4xl"/>
                                    </div>
                                ) : (
                                    <>
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
                                            accept="image/*"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {uploading && (
                        <p className="text-white text-center">Uploading....</p>
                    )}

                    {uploadSuccess && (
                        <div className="flex justify-center items-center space-x-2">
                            <p className="text-[#147c6e] font-semibold">Upload Successful</p>
                            <SiVerizon color="#147c6e" size={20} />
                        </div>
                    )}

                    {imageError && (
                        <p className="text-red-700">image is required</p>
                    )}
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

                {nameError && (
                    <p className="text-red-700">name field is required</p>
                )}
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
                {emailError && (
                    <p className="text-red-700">Email field is required</p>
                )}
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
