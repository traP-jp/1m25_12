"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

import { Textarea } from "@heroui/input";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

// --- Icon Components ---
function SendIcon() {
  return <span className="i-material-symbols-send"></span>;
}

// このコンポーネントは作品IDなどをpropsで受け取ることができる
// interface ReviewFormProps {
//   workId: string;
// }

export default function ReviewForm() {
  const [comment, setComment] = useState("");
  const [evaluation, setEvaluation] = useState<string | null>(null);

  // Client Component内なのでイベントハンドラを定義できる
  const handleClear = () => {
    setComment("");
  };

  const handleSubmit = () => {
    // ここでAPIを呼び出してレビューをサーバーに送信する
    console.log("Submitting review:", { evaluation, comment });
    // 例: await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ workId, evaluation, comment }) });
  };

  const evaluates = [
    { label: "Good", value: "good",color:"bg-blue-400" },
    { label: "More", value: "more" ,color:"bg-pink-400"},
  ];

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h1 className="text-2xl font-bold">レビュー</h1>
      <div className="flex w-full flex-col gap-2">
        <Autocomplete
          label="レビューの種類"
          className="max-w-xs"
          onSelectionChange={(key) => setEvaluation(key as string)}
        >
          {evaluates.map((item) => (
            <AutocompleteItem key={item.value} >{item.label}</AutocompleteItem>
          ))}
        </Autocomplete>
        <div className="flex items-center gap-2">
          <Textarea
            isClearable
            className="flex-1"
            placeholder="レビューを入力してください"
            variant="flat"
           
          />
          <Button
            size="md"
            radius="full"
            color="secondary"
            startContent={<SendIcon />}
            onPress={handleSubmit}
          >
            送信
          </Button>
        </div>
      </div>
    </div>
  );
}