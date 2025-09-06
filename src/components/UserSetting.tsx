"use client";

import { Card, CardFooter } from "@heroui/card";
import TraqImage from "./TraqImage";
import Link from "next/link";
import { User, Work } from "@/generated/prisma";
import { FileInfo } from "traq-bot-ts";
import TraqAvatar from "./TraqAvatar";
import Form from "next/form";
import { loadChannels } from "@/actions/loadChannels";
import { Switch } from "@heroui/switch";
import {Input} from "@heroui/input";
import { channelPathToId } from "@/actions/loadChannels";

export default function WorkList({ workdetails }: Props) {
    return (
        <div>
            <div className="flex flex-row items-center gap-4">
                <h2>自分の作品に対するレビューを許可</h2>
                <Switch

                />
            </div>
        <div>
            <h2>個人プログレスチャンネル</h2>
           <Input placeholder="個人のプログレスチャンネルを追加" type="text" />
        </div>
        </div>
    );
}
