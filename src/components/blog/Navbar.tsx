import Link from 'next/link';
import { ReactElement, useState } from 'react';

import {
    BookOpenIcon, ChatAlt2Icon, ChevronDownIcon, HomeIcon, MenuIcon, PencilIcon, SpeakerphoneIcon,
    UserCircleIcon, ViewBoardsIcon
} from '@heroicons/react/outline';

const Navbar = (props: {
  children: ReactElement;
  course?: {
    name: string;
    id: string;
  };
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <div className="">
        <div className="fixed bottom-0 z-20 flex flex-row justify-around w-screen h-16 text-sm text-center sm:justify-start text-slate-100 sm:flex-col sm:bottom-auto sm:w-20 sm:h-screen bg-gradient-to-r sm:bg-gradient-to-b from-pri_light to-pri_dark">
          <Link href="/">
            <div className="hidden duration-200 cursor-pointer flex-0 bg-sec aspect-square sm:flex sm:flex-initial">
              <HomeIcon className="w-8 h-8 mx-auto" />
            </div>
          </Link>
          <Link href="/">
            <div className="flex-1 py-2 duration-200 cursor-pointer aspect-square sm:flex-initial hover:backdrop-brightness-75 transition-color">
              <HomeIcon className="w-8 h-8 mx-auto" />
              Home
            </div>
          </Link>
          <Link href="/course">
            <div className="flex-1 py-2 duration-200 cursor-pointer aspect-square sm:flex-initial hover:backdrop-brightness-75 transition-color">
              <ViewBoardsIcon className="w-8 h-8 mx-auto" />
              Courses
            </div>
          </Link>
          <Link href="/profile">
            <div className="flex-1 py-2 duration-200 cursor-pointer aspect-square sm:flex-initial hover:backdrop-brightness-75 transition-color">
              <UserCircleIcon className="w-8 h-8 mx-auto" />
              Profile
            </div>
          </Link>
        </div>
        <div className="relative ml-0 sm:ml-20">
          {props.course ? (
            <>
              <div
                className={`absolute transition-all ease-in-out duration-300 flex flex-col ${
                  focus ? "sm:left-0" : "sm:-left-52"
                }`}
              >
                <div className="fixed justify-end hidden w-screen p-2 sm:flex sm:rounded-lg sm:w-64 bg-slate-100">
                  <MenuIcon
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => setFocus(!focus)}
                  />
                </div>
                <div className="fixed z-0 w-screen h-12 sm:w-52 sm:h-screen bg-slate-100">
                  <div className="p-2 font-bold text-center sm:p-8 sm:text-left bg-slate-100">
                    {props.course?.name || "loading..."}
                    <ChevronDownIcon
                      className="inline w-4 h-4 ml-2 cursor-pointer sm:hidden"
                      onClick={() => setFocus(!focus)}
                    />
                  </div>
                  <div
                    className={`transition-all ease-in-out duration-300 relative -z-10 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-48 sm:static flex flex-col sm:w-48 rounded-b-lg bg-slate-100 ${
                      focus ? "top-0" : "-top-60"
                    }`}
                  >
                    <Link href={`/course/${props.course.id}`}>
                      <div className="m-2 duration-200 cursor-pointer hover:underline hover:pl-2 hover:scale-110">
                        <HomeIcon className="inline w-4 h-4 m-2" />
                        Home
                      </div>
                    </Link>
                    <Link href={`/course/${props.course.id}/lesson`}>
                      <div className="m-2 duration-200 cursor-pointer hover:underline hover:pl-2 hover:scale-110">
                        <BookOpenIcon className="inline w-4 h-4 m-2" />
                        Lessons
                      </div>
                    </Link>
                    <Link href={`/course/${props.course.id}/announcement`}>
                      <div className="m-2 duration-200 cursor-pointer hover:underline hover:pl-2 hover:scale-110">
                        <SpeakerphoneIcon className="inline w-4 h-4 m-2" />
                        Announcements
                      </div>
                    </Link>
                    <Link href={`/course/${props.course.id}`}>
                      <div className="m-2 duration-200 cursor-pointer hover:underline hover:pl-2 hover:scale-110">
                        <ChatAlt2Icon className="inline w-4 h-4 m-2" />
                        Discussions
                      </div>
                    </Link>
                    <Link href={`/course/${props.course.id}`}>
                      <div className="m-2 duration-200 cursor-pointer hover:underline hover:pl-2 hover:scale-110">
                        <PencilIcon className="inline w-4 h-4 m-2" />
                        Quizzes
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={` transition ease-in-out duration-300 pt-12 sm:pt-0 ${
                  focus ? "sm:ml-52" : "sm:ml-0"
                }`}
              >
                {props.children}
              </div>
            </>
          ) : (
            props.children
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
