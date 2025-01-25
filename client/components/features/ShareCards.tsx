import { useAnalysisDataContext } from "@/context/AnalysisContext";
import { FRONTENDURL } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

interface SocialShareProps {
 // Add a body or summary to the props
  onClick: () => void;
}

const SocialShare: React.FC<SocialShareProps> = ({ onClick }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [body, setBody] = useState("");
    const {currentBasicInfoId, analysisData} = useAnalysisDataContext();

    useEffect(() => {
        if (currentBasicInfoId) {
          // Find the matching data by basic_info_id
          const matchedData = analysisData.find(
            (data) => data.basic_info_id === currentBasicInfoId
          );
    
          if (matchedData) {
            setTitle(matchedData.basic_info.title);
            setBody(matchedData.basic_info.business_idea);
            setUrl(`${FRONTENDURL}/previous-analysis/${matchedData.basic_info_id}`); // URL can be customized based on your requirements
          }
        }
      }, [currentBasicInfoId, analysisData]);

    


  return (
    <div className="bg-[hsl(var(--accent))] text-white p-4 rounded-lg w-full">
        <div className=" flex items-center justify-between"> 
        <div></div>
      <div className="text-xl font-semibold mb-4 text-center mt-4">Share this post</div>
       <button onClick={onClick}><IoCloseCircle className="text-lg text-white"/></button>
       </div>
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <p className="max-h-[50vh] overflow-y-scroll">{body}</p>
      <div className="w-full flex justify-center space-x-2 mt-3">
        {/* Facebook share with body (using the quote and hashtag props) */}
        <FacebookShareButton url={url} title={`${title} : ${body}`} hashtag="#SAJOKI">
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>

        {/* LinkedIn share with body (using summary and title props) */}
        <LinkedinShareButton url={url} title={`${title}: ${body}`} summary={body} source="https://dev.sajoki.de/">
          <LinkedinIcon size={48} round={true} />
        </LinkedinShareButton>

        {/* Twitter share with body (using title, hashtags, and additional text) */}
        <TwitterShareButton url={url} title={`${title}: ${body}`} hashtags={["SAJOKI", "PersonalityAI"]}>
          <TwitterIcon size={48} round={true} />
        </TwitterShareButton>

        {/* WhatsApp share with body (using title and separator for body) */}
        <WhatsappShareButton url={url} title={`${title}: ${body}`} separator=": " >
          <WhatsappIcon size={48} round={true} />
        </WhatsappShareButton>

        {/* Email share with subject and body */}
        <EmailShareButton url={url} subject={title} body={`${body}\n\nCheck out this link: `}>
          <EmailIcon size={48} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
