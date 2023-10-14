import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import EditAccount from "../components/EditAccount";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userImage, setUserImage] = useState(null);
  const uploadInputRef = useRef(null);
  const { userDetails } = useSelector((state) => state.user);

  const handleUploadClick = () => {
    uploadInputRef.current.click();
  };

  const uploadUserImage = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await fetch(
      "http://localhost:3005/user-image/" + userDetails._id,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
  };

  const fetchUserImage = async () => {
    if (userDetails) {
      const userId = userDetails._id;

      try {
        const response = await fetch(
          `http://localhost:3005/user-image/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setUserImage(imageUrl);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    } else {
      console.error("userDetails is null or undefined");
    }
  };

  useEffect(() => {
    fetchUserImage();
  }, [userDetails]);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="w-24 h-24 overflow-hidden rounded-full">
            <img src={userImage || "/images/defaultImg.png"} alt="" />
          </div>
          <div>
            <input
              ref={uploadInputRef}
              onChange={(e) => uploadUserImage(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
            />
            <button
              className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
              onClick={handleUploadClick}
            >
              Change Profile Picture
            </button>
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {userDetails.userName}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{userDetails.role}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Phone
                  </td>
                  <td className="px-2 py-2">{userDetails.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Email
                  </td>
                  <td className="px-2 py-2">{userDetails.email}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center my-3">
              <Link
                onClick={onOpen}
                className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                href="#"
              >
                Edit Number
              </Link>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <EditAccount onClose={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
