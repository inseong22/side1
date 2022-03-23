import React, {useState, useContext} from 'react'
import {UserContext} from '../../Router'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ChakraProvider
  } from '@chakra-ui/react'
import {dbService} from '../fbase'

function FeatVote({open, setOpen}) {
    const {state, action} = useContext(UserContext) //ContextAPI로 state와 action을 넘겨받는다.
    const [thank, setThank] = useState(false)

    const closeAfterSeconds = async (chose) => {

        const body = {
            answer:chose,
            created:Date.now(),
            email:state.userObj.email,
        }
        
        await dbService.collection('votes').add(body)

        // setTimeout(() => {
        //     setOpen(false)
        // },500)
    }

    return (
        <ChakraProvider>
            <Modal isOpen={open} onClose={setOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="ask-modal-button uphover" onClick={() => {closeAfterSeconds('A/B테스트')}}>
                        <div>
                            A / B 테스트
                        </div>
                    </div>
                    <div className="ask-modal-button uphover" onClick={() => {closeAfterSeconds('입력')}}>
                        <div>
                            입력의 다양화
                        </div>
                    </div>
                    <div className="ask-modal-button uphover" onClick={() => {closeAfterSeconds('기타')}}>
                        <div>
                            기타
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
            </Modal>            
        </ChakraProvider>
    )
}

export default FeatVote
