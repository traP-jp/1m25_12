import { prisma } from "@/lib/prisma";
import { traqClient } from "@/lib/traq";
import { Card, CardFooter } from "@heroui/card";
import { UserDetail } from "traq-bot-ts";
import TraqImage from "@/components/TraqImage";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import TrapIcon from "@/components/TrapIcon";
import {Image} from "@heroui/image";
import {Link} from "@heroui/link";
import { Avatar } from "@heroui/avatar";
import {Divider} from "@heroui/divider"
import {Textarea} from "@heroui/input"
import {Autocomplete, AutocompleteItem} from "@heroui/autocomplete";
import ReviewForm from "@/components/ReViewForm"


export default async function WorkDetail() {

    const handleClear = () => {
    console.log("Input cleared!");
  };
   const evaluates = [
    
    {label: "Good", key: "good"},
    {label: "More", key: "more"}
    ];
    return (
        <div className="flex min-h-screen flex-col md:flex-row gap-1">
      
      {/* 2. 左側の要素: flex-1で幅を均等に分ける */}
      <div className="flex-col flex-1 items-center justify-start bg-white p- rounded-sm">
        <Image
                src="https://pbs.twimg.com/media/Gz6DhaBX0AAQMkS?format=png&name=900x900" // ここに表示したい画像のパスを指定
                alt="Hero Image"
                width={400} // 画像の幅を指定
                height={300} // 画像の高さを指定
                className="rounded-lg shadow-lg bg-gray-500 object-cover"
        />
        <div className=" flex flex-row">
            
            <Button size="sm" className="i-material-symbols-favorite-outline"></Button>
            <Button size="sm" className="i-material-symbols-download"></Button>
        </div>
        <h1>タイトル</h1>
        <Link href="https://q.trap.jp/channels/team/graphics/progress" size="sm">#team/graphics/progress</Link>
        <p>文章</p>
        <div className="flex flex-row">
            <p>いらすと</p>
            <p>いらすと</p>
            <p>いらすと</p>
            <Button size="sm" className="i-material-symbols-add"></Button>
        </div>
        <div className="flex flex-row">
            <Avatar></Avatar>
            <p>@aaaaaaaaaaaaa</p>
            <Button
                size = "sm"
                radius="full"
                color="secondary"
                startContent={<UnBookMarkIcon/>}
            >
                ブックマーク
            </Button>

        </div>
        <Divider className="my-4 " />
      </div>
      
      {/* 3. 右側の要素: こちらもflex-1で幅を均等に分ける */}
      <div className="flex flex-1 flex-col items-start justify-start bg-white p-8 rounded-sm">
    <ReviewForm/>
    <Divider className="my-2" />
      <div>
        <h2 className="font-semibold text-lg">Good</h2>
        <p className="text-gray-700 p-3 bg-gray-50 rounded-md">
          ここに既存のレビューが表示されます。
        </p>
        <p className="text-xs text-gray-500">投稿日: 2025/5/2 22:55</p>
      </div>
      </div>

    </div>
    );
}

export  function UnBookMarkIcon(){
    return(
        <span className="i-material-symbols-bookmark-outline"></span>
    );
}

export  function BookMarkIcon(){
    return(
        <span className="i-material-symbols-bookmark"></span>
    );
}

export  function SendIcon(){
    return(
        <span className="i-material-symbols-send"></span>
    );
}