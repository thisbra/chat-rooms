import {} from "react";


export default function Message({isAuthor, content, timestamp, author}) {
    
    const formattedTimestamp = `${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`;

    if (isAuthor) {
        return (
            <div>
                <div className="w-full justify-end pr-2 pl-10 mt-1">
                    <div className="flex bg-green-500 py-2 px-4 rounded-2xl w-fit ml-auto break-all">
                        {content}
                    </div>
                    <div className="text-xs mr-4 text-right">{formattedTimestamp}</div>
                </div>
            </div>
        );
    }

    if (!isAuthor) {
        return (
            <div className="pl-2 pr-10 mt-1">
                <div className="text-xs ml-4">{author}</div>
                <div className="flex bg-blue-500 py-2 px-4 rounded-2xl w-fit break-all">
                    {content}
                </div>
                <div className="text-xs ml-4">{formattedTimestamp}</div>
            </div>
        );
    }

}
  
