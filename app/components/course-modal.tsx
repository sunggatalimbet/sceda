import { ICourse } from "../types";
import { useCallback } from "react";

interface CourseModalProps {
    course: ICourse;
    isOpen: boolean;
    onClose: () => void;
}

export const CourseModal = ({ course, isOpen, onClose }: CourseModalProps) => {
    if (!isOpen) return null;

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const shouldShowTeacherAndRoom = course.id !== "FEAP020";

    const getMathDay = (label: string) => {
        const lowercaseLabel = label.toLowerCase();
        if (lowercaseLabel.includes("monday")) return "mon";
        if (lowercaseLabel.includes("tuesday")) return "tue";
        if (lowercaseLabel.includes("wednesday")) return "wed";
        if (lowercaseLabel.includes("thursday")) return "thu";
        if (lowercaseLabel.includes("friday")) return "fri";

        // Try abbreviated versions
        if (lowercaseLabel.includes("mon")) return "mon";
        if (lowercaseLabel.includes("tue")) return "tue";
        if (lowercaseLabel.includes("wed")) return "wed";
        if (lowercaseLabel.includes("thu")) return "thu";
        if (lowercaseLabel.includes("fri")) return "fri";

        return null;
    };

    const getClassType = () => {
        if (course.id === "FLDP095") {
            const durationInMinutes =
                (course.time.end.hh * 60 + course.time.end.mm) -
                (course.time.start.hh * 60 + course.time.start.mm);
            return {
                type: durationInMinutes <= 50 ? "Seminar" : "Lecture",
                color: "blue"
            };
        }
        return null;
    };

    const classType = getClassType();

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
                            <p className="text-sm text-gray-500">{course.label}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {shouldShowTeacherAndRoom && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <p className="text-gray-700"><span className="font-medium">Teacher:</span> {course.teacher}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <p className="text-gray-700"><span className="font-medium">Room:</span> {course.cab}</p>
                                </div>
                            </>
                        )}

                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-700">
                                <span className="font-medium">Time:</span>{' '}
                                {`${String(course.time.start.hh).padStart(2, '0')}:${String(course.time.start.mm).padStart(2, '0')} - ${String(course.time.end.hh).padStart(2, '0')}:${String(course.time.end.mm).padStart(2, '0')}`}
                            </p>
                        </div>
                    </div>
                </div>
                {classType && (
                    <div className="flex items-center mt-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                                    ${classType.color === 'blue'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'}`}
                        >
                            <span className={`w-2 h-2 rounded-full mr-2 
                                        ${classType.color === 'blue' ? 'bg-blue-400' : 'bg-purple-400'}`}
                            ></span>
                            {classType.type}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}; 