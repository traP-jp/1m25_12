import { Image, ImageProps } from "@/components/Image";

type Props = {
    fileId: string;
} & Omit<ImageProps, "src">;

export default  function PopupImage({ fileId, alt, width, height, fill, ...props }: Props) {


    return (
        <Image
            src={fileId}
            {...{ alt, fill, width, height }}
            {...props}
        />
    );
}
