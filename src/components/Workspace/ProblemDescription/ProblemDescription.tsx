// import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
// import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
// import { Problem } from "@/utils/types/problem";
// import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
// import { BsCheck2Circle } from "react-icons/bs";
// import { TiStarOutline } from "react-icons/ti";
// import { toast } from "react-toastify";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
//
// type ProblemDescriptionProps = {
//     problem: Problem;
//     _solved: boolean;
// };
//
// const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
//     const { user } = useCurrentUser();
//     const { currentProblem, loading, problemDifficultyClass } = useGetCurrentProblem(problem.id);
//     const { liked, disliked, starred, setData } = useGetUsersDataOnProblem(problem.id);
//     const [updating, setUpdating] = useState(false);
//
//     const handleInteraction = (type: 'like' | 'dislike' | 'star') => {
//         if (!user) {
//             toast.error(`You must be logged in to ${type} a problem`, { position: "top-left", theme: "dark" });
//             return;
//         }
//         if (updating) return;
//         setUpdating(true);
//
//         // Here, we'll simulate updating user interactions using local storage
//         let userData = localStorage.getItem(user.id);
//         if (!userData) {
//             userData = {
//                 likedProblems: [],
//                 dislikedProblems: [],
//                 starredProblems: []
//             };
//         } else {
//             userData = JSON.parse(userData);
//         }
//
//         switch (type) {
//             case 'like':
//                 if (!userData.likedProblems.includes(problem.id)) {
//                     userData.likedProblems.push(problem.id);
//                 }
//                 break;
//             case 'dislike':
//                 if (!userData.dislikedProblems.includes(problem.id)) {
//                     userData.dislikedProblems.push(problem.id);
//                 }
//                 break;
//             case 'star':
//                 if (!userData.starredProblems.includes(problem.id)) {
//                     userData.starredProblems.push(problem.id);
//                 }
//                 break;
//             default:
//                 break;
//         }
//
//         localStorage.setItem(user.id, JSON.stringify(userData));
//
//         setUpdating(false);
//     };
// 	return (
// 		<div className='bg-dark-layer-1'>
// 			{/* TAB */}
// 			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
// 				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
// 					Description
// 				</div>
// 			</div>
//
// 			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
// 				<div className='px-5'>
// 					{/* Problem heading */}
// 					<div className='w-full'>
// 						<div className='flex space-x-4'>
// 							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem?.title}</div>
// 						</div>
// 						{!loading && currentProblem && (
// 							<div className='flex items-center mt-3'>
// 								<div
// 									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
// 								>
// 									{currentProblem.difficulty}
// 								</div>
// 								{(solved || _solved) && (
// 									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
// 										<BsCheck2Circle />
// 									</div>
// 								)}
// 								<div
// 									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
// 									onClick={handleLike}
// 								>
// 									{liked && !updating && <AiFillLike className='text-dark-blue-s' />}
// 									{!liked && !updating && <AiFillLike />}
// 									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
//
// 									<span className='text-xs'>{currentProblem.likes}</span>
// 								</div>
// 								<div
// 									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
// 									onClick={handleDislike}
// 								>
// 									{disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
// 									{!disliked && !updating && <AiFillDislike />}
// 									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
//
// 									<span className='text-xs'>{currentProblem.dislikes}</span>
// 								</div>
// 								<div
// 									className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
// 									onClick={handleStar}
// 								>
// 									{starred && !updating && <AiFillStar className='text-dark-yellow' />}
// 									{!starred && !updating && <TiStarOutline />}
// 									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
// 								</div>
// 							</div>
// 						)}
//
// 						{loading && (
// 							<div className='mt-3 flex space-x-2'>
// 								<RectangleSkeleton />
// 								<CircleSkeleton />
// 								<RectangleSkeleton />
// 								<RectangleSkeleton />
// 								<CircleSkeleton />
// 							</div>
// 						)}
//
// 						{/* Problem Statement(paragraphs) */}
// 						<div className='text-white text-sm'>
// 							<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
// 						</div>
//
// 						{/* Examples */}
// 						<div className='mt-4'>
// 							{problem.examples.map((example, index) => (
// 								<div key={example.id}>
// 									<p className='font-medium text-white '>Example {index + 1}: </p>
// 									{example.img && <img src={example.img} alt='' className='mt-3' />}
// 									<div className='example-card'>
// 										<pre>
// 											<strong className='text-white'>Input: </strong> {example.inputText}
// 											<br />
// 											<strong>Output:</strong>
// 											{example.outputText} <br />
// 											{example.explanation && (
// 												<>
// 													<strong>Explanation:</strong> {example.explanation}
// 												</>
// 											)}
// 										</pre>
// 									</div>
// 								</div>
// 							))}
// 						</div>
//
// 						{/* Constraints */}
// 						<div className='my-8 pb-4'>
// 							<div className='text-white text-sm font-medium'>Constraints:</div>
// 							<ul className='text-white ml-5 list-disc '>
// 								<div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
// 							</ul>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default ProblemDescription;
//
// function useGetCurrentProblem(problemId: string) {
// 	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
// 	const [loading, setLoading] = useState<boolean>(true);
// 	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");
//
// 	useEffect(() => {
// 		// Get problem from DB
// 		const getCurrentProblem = async () => {
// 			setLoading(true);
// 			const docRef = doc(firestore, "problems", problemId);
// 			const docSnap = await getDoc(docRef);
// 			if (docSnap.exists()) {
// 				const problem = docSnap.data();
// 				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
// 				// easy, medium, hard
// 				setProblemDifficultyClass(
// 					problem.difficulty === "Easy"
// 						? "bg-olive text-olive"
// 						: problem.difficulty === "Medium"
// 						? "bg-dark-yellow text-dark-yellow"
// 						: " bg-dark-pink text-dark-pink"
// 				);
// 			}
// 			setLoading(false);
// 		};
// 		getCurrentProblem();
// 	}, [problemId]);
//
// 	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
// }
//
// function useGetUsersDataOnProblem(problemId: string) {
// 	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
// 	const [user] = useAuthState(auth);
//
// 	useEffect(() => {
// 		const getUsersDataOnProblem = async () => {
// 			const userRef = doc(firestore, "users", user!.uid);
// 			const userSnap = await getDoc(userRef);
// 			if (userSnap.exists()) {
// 				const data = userSnap.data();
// 				const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = data;
// 				setData({
// 					liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
// 					disliked: dislikedProblems.includes(problemId),
// 					starred: starredProblems.includes(problemId),
// 					solved: solvedProblems.includes(problemId),
// 				});
// 			}
// 		};
//
// 		if (user) getUsersDataOnProblem();
// 		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
// 	}, [problemId, user]);
//
// 	return { ...data, setData };
// }
