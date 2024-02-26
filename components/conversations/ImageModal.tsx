"use client";

import Image from "next/image";
import Modal from "../ui/Modal";

interface ImageModalProps {
  src?: string | null;
  isOpen?: boolean;
  onClose: () => void;
}

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  if (!src) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" h-full w-full">
        <Image
          alt="image"
          src={src}
          className="object-cover "
          sizes="100%"
          width={600}
          height={600}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
