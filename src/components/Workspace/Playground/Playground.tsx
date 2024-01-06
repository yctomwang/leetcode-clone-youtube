import {useState, useEffect} from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import {vscodeDark} from "@uiw/codemirror-theme-vscode";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import EditorFooter from "./EditorFooter";
import {Problem} from "@/utils/types/problem";
import {toast} from "react-toastify";
import {problems} from "@/utils/problems";
import {useRouter} from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";

type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
    fontSize: string;
    settingsModalIsOpen: boolean;
    dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({problem, setSuccess, setSolved}) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    let [userCode, setUserCode] = useState<string>(problem.starterCode);
    const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const [settings, setSettings] = useState<ISettings>({
        fontSize: fontSize,
        settingsModalIsOpen: false,
        dropdownIsOpen: false,
    });
    const user = useCurrentUser();
    const {query: {pid}} = useRouter();
    const [language, setLanguage] = useState("javascript"); // New state for language
    //
    // const languageExtension = python();

    function isJsonObject(value: any) {
        if (typeof value !== 'object' || value === null) {
            return false;
        }

        return Object.prototype.toString.call(value) === '[object Object]';
    }

    const handleSubmit = async () => {
        // if (!user) {
        //     toast.error("Please login to submit your code", {
        //         position: "top-center",
        //         autoClose: 3000,
        //         theme: "dark",
        //     });
        //     return;
        // }
        // try {
        // console.log(`Fuck: ${userCode}`)
        const baseUrl = 'https://5d0spu6m1h.execute-api.us-west-2.amazonaws.com/default/';
        let endPoint = pid;
        // @ts-ignore
        endPoint = endPoint.replace(/-/g, ''); // Replaces all hyphens
        const fullUrl = baseUrl + endPoint;

        let jsonUserCode;
        console.log(userCode);
        try {
            jsonUserCode = {code: userCode};
            console.log(jsonUserCode); // Log the parsed JSON object
        } catch (error) {
            // @ts-ignore
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
            console.log("fucl");
            return; // Exit if JSON parsing fails
        }


        // try {
        //     const response = await fetch(fullUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(jsonUserCode), // Send the parsed JSON object
        //     });
        //
        //     // Always parse the response body to get the result
        //     const responseBody = await response.json();
        //     console.log("Response:", response);
        //     console.log("Parsed Response Body:", responseBody);
        //
        //     if (!response.ok) {
        //         // Handle HTTP errors
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     } else if (responseBody && responseBody.result && responseBody.result.error) {
        //         // Handle execution errors from Lambda
        //         console.error('Execution Error:', responseBody.result.error);
        //         // You can throw an error or handle it as needed
        //     } else if (responseBody && responseBody.result) {
        //         // Handle successful response
        //         toast.success("Congrats! All tests passed!", {
        //                 position: "top-center",
        //                 autoClose: 3000,
        //                 theme: "dark",
        //             });
        //     } else {
        //         // Handle unexpected response format
        //         throw new Error('Unexpected response format');
        //     }
        // } catch (error) {
        //     console.error('Error sending JSON to TwoSum API:', error);
        //     throw error; // Or handle it as needed
        // }
        // try {
        //     const response = await fetch(fullUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(jsonUserCode), // Send the parsed JSON object
        //     });
        //
        //     // Parse the outer JSON
        //     const outerResponseBody = await response.json();
        //     console.log("Response:", response);
        //     console.log("Outer Parsed Response Body:", outerResponseBody);
        //
        //     if (!response.ok) {
        //         // Handle HTTP errors
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //
        //     // Check if the 'body' field is present and parse it
        //     if (outerResponseBody && outerResponseBody.body) {
        //         const innerResponseBody = JSON.parse(outerResponseBody.body);
        //         console.log("Inner Parsed Response Body:", innerResponseBody);
        //
        //         if (innerResponseBody.result && innerResponseBody.result.error) {
        //             // Handle execution errors from Lambda
        //             console.error('Execution Error:', innerResponseBody.result.error);
        //             toast.error(innerResponseBody.result.error, {
        //                 position: "top-center",
        //                 autoClose: 3000,
        //                 theme: "dark",
        //             });
        //         } else if (innerResponseBody.result) {
        //             // Handle successful response
        //             toast.success("Congrats! All tests passed!", {
        //                 position: "top-center",
        //                 autoClose: 3000,
        //                 theme: "dark",
        //             });
        //         } else {
        //             // Handle unexpected inner response format
        //             throw new Error('Unexpected inner response format');
        //         }
        //     } else {
        //         // Handle unexpected outer response format
        //         throw new Error('Unexpected outer response format');
        //     }
        // } catch (error) {
        //     console.error('Error sending JSON to TwoSum API:', error);
        //     toast.error('An error occurred while sending data to the API.', {
        //         position: "top-center",
        //         autoClose: 3000,
        //         theme: "dark",
        //     });
        // }
        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonUserCode), // Send the parsed JSON object
            });

            // Parse the outer JSON
            const outerResponseBody = await response.json();
            console.log("Response:", response);
            console.log("Outer Parsed Response Body:", outerResponseBody);

            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the 'body' field is present and parse it
            if (outerResponseBody && outerResponseBody.body) {
                const innerResponseBody = JSON.parse(outerResponseBody.body);
                console.log("Inner Parsed Response Body:", innerResponseBody);

                if (innerResponseBody.result && innerResponseBody.result.error) {
                    // Handle execution errors from Lambda
                    console.error('Execution Error:', innerResponseBody.result.error);
                    toast.error(innerResponseBody.result.error, {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "dark",
                    });
                } else if (innerResponseBody.result && Array.isArray(innerResponseBody.result)) {
                    // Handle results (test cases)
                    // @ts-ignore
                    const allPassed = innerResponseBody.result.every(test => test.passed);
                    if (allPassed) {
                        toast.success("Congrats! All tests passed!", {
                            position: "top-center",
                            autoClose: 3000,
                            theme: "dark",
                        });
                    } else {
                        toast.error("Some test cases failed. Please review your code.", {
                            position: "top-center",
                            autoClose: 3000,
                            theme: "dark",
                        });
                    }
                } else {
                    // Handle unexpected inner response format
                    throw new Error('Unexpected inner response format');
                }
            } else {
                // Handle unexpected outer response format
                throw new Error('Unexpected outer response format');
            }
        } catch (error) {
            console.error('Error sending JSON to TwoSum API:', error);
            toast.error('An error occurred while sending data to the API.', {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            });
        }


        // console.log(pid);
        //
        // userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
        //
        //
        // //directly send the blo
        // console.log(userCode);
        //we currently have pid on hand aswell as usercode


        //     const cb = new Function(`return ${userCode}`)();
        //     const handler = problems[pid as string].handlerFunction;
        //     // console.log(problems[pid as string]);
        //     // console.log(handler);
        //
        //     if (typeof handler === "function") {
        //         const success = handler(cb);
        //         if (success) {
        //             toast.success("Congrats! All tests passed!", {
        //                 position: "top-center",
        //                 autoClose: 3000,
        //                 theme: "dark",
        //             });
        //             setSuccess(true);
        //             setTimeout(() => {
        //                 setSuccess(false);
        //             }, 4000);
        //
        //             // Update the mock user's solved problems in local storage
        //             updateUserSolvedProblems(pid as string);
        //             setSolved(true);
        //         }
        //     }
        // } catch (error: any) {
        //     console.error(error.message);
        //     if (
        //         error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")
        //     ) {
        //         toast.error("Oops! One or more test cases failed", {
        //             position: "top-center",
        //             autoClose: 3000,
        //             theme: "dark",
        //         });
        //     } else {
        //         toast.error(error.message, {
        //             position: "top-center",
        //             autoClose: 3000,
        //             theme: "dark",
        //         });
        //     }
        // }
    };


    useEffect(() => {
        const code = localStorage.getItem(`code-${pid}`);
        if (user) {
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        } else {
            setUserCode(problem.starterCode);
        }
    }, [pid, user, problem.starterCode]);

    const onChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${pid}`, JSON.stringify(value));
    };

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferenceNav settings={settings} setSettings={setSettings}/>

            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className='w-full overflow-auto'>
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onChange}
                        extensions={[python()]}
                        style={{fontSize: settings.fontSize}}
                    />
                </div>
                <div className='w-full px-5 overflow-auto'>
                    {/* testcase heading */}
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'/>
                        </div>
                    </div>

                    <div className='flex'>
                        {problem.examples.map((example, index) => (
                            <div
                                className='mr-2 items-start mt-2 '
                                key={example.id}
                                onClick={() => setActiveTestCaseId(index)}
                            >
                                <div className='flex flex-wrap items-center gap-y-4'>
                                    <div
                                        className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
                                    >
                                        Case {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='font-semibold my-4'>
                        <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                        <div
                            className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                        <div
                            className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].outputText}
                        </div>
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmit={handleSubmit}/>
        </div>
    );
};

function useCurrentUser() {
    const [user, setUser] = useState<null | { email: string, uid: string }>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('mockUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return user;
}

function updateUserSolvedProblems(pid: string) {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        user.solvedProblems = user.solvedProblems || [];
        if (!user.solvedProblems.includes(pid)) {
            user.solvedProblems.push(pid);
        }
        localStorage.setItem('mockUser', JSON.stringify(user));
    }
}

export default Playground;
