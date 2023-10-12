import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import EditAddress from "../components/EditAddress";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {}, [userDetails]);

  return (
    <div>
      <div className="p-2">
        <table className="my-3 flex items-center justify-center">
          <tbody>
            <tr className="">
              <td className="px-2 py-2 text-gray-500 font-semibold">
                First Name :
              </td>
              <td className="px-2 py-2">{userDetails.firstName}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">
                Last Name :
              </td>
              <td className="px-2 py-2">{userDetails.lastName}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">
                Street Address :
              </td>
              <td className="px-2 py-2">{userDetails.streetAddress}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">City : </td>
              <td className="px-2 py-2">{userDetails.city}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">
                State :{" "}
              </td>
              <td className="px-2 py-2">{userDetails.state}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 text-gray-500 font-semibold">
                Country :{" "}
              </td>
              <td className="px-2 py-2">{userDetails.country}</td>
            </tr>
          </tbody>
        </table>

        <div className="text-center my-3">
          <Link
            onClick={onOpen}
            className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
            href="#"
          >
            Edit
          </Link>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <EditAddress onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
