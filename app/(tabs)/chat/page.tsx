import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { Avatar } from '@nextui-org/avatar';
import { formatToTimeAgo } from "@/lib/utils";

async function getInitialChatRooms() {
  const session = await getSession();
  const chatRooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: session.id
        }
      }
    },
    include: {
      messages: {
        orderBy: {
          created_at: "desc", 
        },
        take: 1,
        select: {
          payload: true,
          created_at: true,
          user: {
            select: {
              username: true,
              avatar: true
            }
          }
        }
      }
    }
  });
  console.log(chatRooms[3].messages)
  return chatRooms;
}

export default async function Chat() {
  const session = await getSession();
  const initialChatRooms = await getInitialChatRooms();
  return (
    <>
    {
      initialChatRooms.map((chatRoom, index) => (
        <Link key={chatRoom.id} href={`/chats/${chatRoom.id}`} className="flex gap-5 hover:bg-[#313131]">
          <div className="flex flex-col gap-1 *:text-white pl-[10px] pr-[15px]">
            {
              chatRoom.messages.length > 0 && 
              (
                <div className="flex gap-3 p-[10px]">
                    <Avatar className="bg-[#3f3f46]" name={chatRoom.messages[0].user.username} />
                    <div>
                      {chatRoom.messages[0].payload}
                      <div>
                      {formatToTimeAgo(chatRoom.messages[0].created_at.toISOString())}
                      </div>
                    </div>
                </div>
              )
            }
          </div>
        </Link>
      ))
    }
    </>
  );
}
