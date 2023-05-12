import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Content from '../components/paragraphs';
import { ModeContext } from '../contexts/modeContext';
import ScoreContext from '../contexts/scoreContext';

export default function PracticePage() {

    const { mode, setMode } = useContext(ModeContext);
    const { accur, setAccur, wpm, setWpm } = useContext(ScoreContext);

    const [generatedParagraph, setGeneratedParagraph] = useState('');
    const [typedText, setTypedText] = useState('');
    const [correctness, setCorrectness] = useState([]);
    const [start, setStart] = useState(false)
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const inputRef = useRef(null);

    useEffect(() => {
        let paragraph = Content[0]

        if (mode === 'begin') {
            paragraph = Content[0];
        } if (mode === 'adv') {
            paragraph = Content[1] + Content[0];
        } if (mode === 'pro') {

            const randIndex = Math.floor(Math.random() * Content.length);
            paragraph = Content[randIndex]
        }

        // console.log(index);
        // const paragraph = Content[index]
        setGeneratedParagraph(paragraph)
    }, [])

    useEffect(() => {
        if (generatedParagraph && !startTime) {
            setStartTime(Date.now());
        }
    }, [generatedParagraph, startTime])

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setTypedText(inputText);

        // Check the correctness of each character
        const correctnessArray = inputText.split('').map((char, index) => {
            if (char === generatedParagraph[index]) {
                return 'correct'
            } else {
                return 'incorrect'
            }
        });
        setCorrectness(correctnessArray) //set the correctness of the char to the return value of the checks above

        // Update typing speed and accuracy
        const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
        const typedWordCount = inputText.trim().split(' ').length;
        const typingSpeed = typedWordCount / elapsedTime;
        setTypingSpeed((typingSpeed.toFixed(2)));

        const correctCharCount = correctnessArray.filter((correctness) => correctness === 'correct').length;
        const accuracy = (correctCharCount / inputText.length) * 100;
        setAccuracy(accuracy);
    }

    const handleStart = () => {
        setStart(true)
        setCorrectness([])
        setTypedText('')
        setStartTime(null);
        setEndTime(null);
        setTypingSpeed(0);
        setAccuracy(0);
        inputRef.current.focus()
    }

    const handleStop = () => {
        setStart(false)
    }

    const handleRestart = () => {
        inputRef.current.focus()
        setCorrectness([])
        setTypedText('')
        setStartTime(null);
        setEndTime(null);
        setTypingSpeed(0);
        setAccuracy(0);
    }

    return (
        <div className='container flex flex-col mx-auto'>
            {/* Navbar */}
            <div>
                <Navbar />
            </div>
            {/* Practice Page */}
            <div className='mx-auto'>
                <div className='flex flex-col items-center'>
                    <Link to='/videotutorials'>
                        <div className='flex self-center bg-darkBlue py-2 px-10 my-6 text-white font-bold text-lg rounded-full items-center justify-center w-20'>
                            Back
                        </div>
                    </Link>
                    <div className='flex self-center bg-darkBlue py-2 px-10 mb-3 text-white font-bold text-xl justify-between rounded-sm'>
                        <p className='mx-4'>Accuracy: {accuracy.toFixed(2)}%</p>
                        <p className='mx-4'>WPM: {typingSpeed}</p>
                    </div>
                    <div className='flex '>
                        <div className='flex flex-col my-4 mx-auto w-2/5 '>
                            {generatedParagraph && startTime && (
                                <p className='grid-2 text-xl mb-10 py-5 mx-5 px-5 font-semibold bg-gray-100 rounded-lg self-center'>
                                    {generatedParagraph.split('').map((char, index) => (
                                        <span className='' key={index} style={{
                                            color:
                                                correctness[index] === 'correct' ? 'green' : 'red'
                                        }}
                                        >
                                            {char}
                                        </span>
                                    ))}</p>
                            )}
                            {start ?
                                <textarea
                                    ref={inputRef}
                                    rows={3}
                                    placeholder='Start typing...'
                                    value={typedText}
                                    onChange={handleInputChange}
                                >
                                </textarea> :
                                <textarea
                                    ref={inputRef}
                                    rows={3}
                                    placeholder='Start Typing on start'
                                    value={typedText}
                                    disabled={true}
                                >
                                </textarea>}

                            {!start ?
                                <button className='' onClick={handleStart}>Start</button> : (
                                    <div className=''>
                                        <>
                                            <button className='' onClick={handleStop}>Stop</button>
                                            <button className='' onClick={handleRestart}>Restart</button>
                                        </>
                                    </div>
                                )
                            }
                            {endTime && start && (
                                <p>
                                    Typing Speed: {typingSpeed.toFixed(2)} words per second | Accuracy: {accuracy.toFixed(2)}%
                                </p>
                            )}
                            {endTime ? (
                                <></>
                            ) : (
                                <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link to={'/progress/' + mode}>
                                        <button
                                            style={{ width: '100%' }}
                                            disabled={typedText.length !== generatedParagraph.length}
                                            onClick={() => {
                                                setEndTime(Date.now());
                                                inputRef.current.blur();
                                                localStorage.setItem(mode, JSON.stringify({ accuracy, typingSpeed }))
                                                setAccur(accuracy);
                                                setWpm(typingSpeed)
                                            }}
                                        >
                                            Finish
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
