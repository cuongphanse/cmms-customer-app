"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

const TestPageSuccess = () => {
  const pathname = usePathname();
  console.log(pathname, "test trang page");

  const [showDialog, setShowDialog] = useState(false);

  const handleClosePayment = () => {
    localStorage.removeItem("cartItem");
    window.location.href = "/";
  };
  useEffect(() => {
    // Xóa localStorage khi trang được tải
    setShowDialog(true);
  }, []);

  return (
    <>
      <div className="relative h-screen flex items-center justify-center">
        {/* Nội dung trang */}
        <Dialog open={true} onOpenChange={setShowDialog}>
          {/* DialogContent luôn được hiển thị */}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="flex items-center justify-center">
              <Image
                src="/payment-status.png"
                alt="VNPAY"
                width={300}
                height={300}
                className="h-40 w-40 rounded-lg"
                layout="fixed"
              />
              <div className="flex items-center">
                <DialogDescription className="mr-2 text-black">
                  Thanh toán thành công
                </DialogDescription>
                <div className="animate-bounce w-5 h-5 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L8 14.586l8.293-8.293a1 1 0 0 1 1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                {/* <Label htmlFor="name" className="text-center block">
                  Thông tin thanh toán
                </Label> */}
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="name" className="text-center block ">
                  Đã thanh toán
                </Label>
              </div>
            </div>
            <DialogFooter className="flex justify-center">
              {/* Căn giữa nội dung */}
              <Button
                onClick={() => {
                  handleClosePayment();
                }}
              >
                Trở về trang chủ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Hình nền */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner1.jpg"
            alt="Background image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default TestPageSuccess;
