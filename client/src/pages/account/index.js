import React from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import EditAccount from "../components/EditAccount";

function Account() {
  const { userDetails } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="layout h-full">
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-semibold block">Profile</span>
            <a
              onClick={onOpen}
              className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              Edit
            </a>
          </div>

          <span className="text-gray-600">{userDetails.userName}</span>
          <div className="w-full p-8 mx-2 flex justify-center">
            <img
              id="showImage"
              className="max-w-xs w-32 items-center border"
              src="../images/avatar.svg"
              alt=""
            />
            <input onChange={(e) => console.log(e)} type="file" />
          </div>
        </div>

        {isOpen && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <EditAccount />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-4">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Phone Number
              </label>
              <input
                disabled
                className="border-1  rounded-r px-4 py-2 w-full"
                value={userDetails.phoneNumber}
              />
              <span className="text-gray-600 pt-4 block opacity-70"></span>

              <label
                htmlFor="email"
                className="font-semibold text-gray-700 block pb-1"
              >
                Email
              </label>
              <input
                disabled
                id="email"
                className="border-1  rounded-r px-4 py-2 w-full"
                type="email"
                value={userDetails.email}
              />
              <span className="text-gray-600 pt-4 block opacity-70"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
