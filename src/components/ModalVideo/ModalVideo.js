import React, { useState, useEffect } from "react";
import { Modal, ModalContent } from "semantic-ui-react";
import ReactPlayer from "react-player";

import "./ModalVideo.scss";

export default function ModalVideo({ videoKey, videoPlatform, isOpen, close }) {
  const [urlVideo, setUrlVideo] = useState(null);

  useEffect(() => {
    switch (videoPlatform) {
      case "YouTube":
        setUrlVideo(`https://youtu.be/${videoKey}`);
        break;
      case "Vimeo":
        setUrlVideo(`https://vimeo.com/${videoKey}`);
        break;
      default:
        break;
    }
  }, [videoKey, videoPlatform]);

  return (
    <Modal closeIcon open={isOpen} onClose={close} size="small">
      <ModalContent>
        <ReactPlayer url={urlVideo} controls />
      </ModalContent>
    </Modal>
  );
}
