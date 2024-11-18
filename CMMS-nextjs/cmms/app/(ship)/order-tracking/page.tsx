"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useShippoing } from "@/lib/actions/delivery/react-query/delivery-query";
import { IShippingDetails } from "@/lib/actions/delivery/type/delivery-type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateShipping } from "@/lib/actions/delivery/action/delivery";
const formatDate = (
  isoDateString: string,
  format: "dd-MM-yyyy" | "dd/MM/yyyy HH:mm" = "dd-MM-yyyy"
): string => {
  const date = new Date(isoDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  if (format === "dd/MM/yyyy HH:mm") {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return `${day}-${month}-${year}`;
};
const getInvoiceStatus = (
  status: number
): { text: string; className: string } => {
  switch (status) {
    case 0:
      return { text: "Đang chờ", className: "text-yellow-600" }; // Màu vàng
    case 1:
      return { text: "Đã phê duyệt", className: "text-blue-600" }; // Màu xanh
    case 2:
      return { text: "Đang vận chuyển", className: "text-orange-600" }; // Màu cam
    case 3:
      return { text: "Hoàn tất", className: "text-green-600" }; // Màu xanh lá
    case 4:
      return { text: "Hủy", className: "text-red-600" }; // Màu đỏ
    case 5:
      return { text: "Hoàn tiền", className: "text-purple-600" }; // Màu tím
    default:
      return { text: "Không xác định", className: "text-gray-600" }; // Màu xám
  }
};

export default function OrderPage() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<number | null>(null);
  const ShipperId = session?.user?.user.id
    ? { ShipperId: session.user.user.id }
    : null;
  const { data: dataShipper, isLoading: isDataShipper } = useShippoing(
    ShipperId || {}
  );

  const handleSubmit = async () => {
    if (!selectedCustomer) {
      toast({
        title: "Không có đơn hàng được chọn",
        variant: "destructive",
      });
      return;
    }
    if (!deliveryDate || paymentMethod === null) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      id: selectedCustomer.id,
      address: selectedCustomer.address,
      phoneReceive: selectedCustomer.phoneReceive,
      shippingDate: deliveryDate,
      estimatedArrival: selectedCustomer.estimatedArrival,
      transactionPaymentType: paymentMethod,
      invoiceId: selectedCustomer.invoice.id,
      shipperId: selectedCustomer.shipperCode,
    };

    try {
      const result = await updateShipping(requestData);
      if (result) {
        toast({
          title: "Thành công",
          description: "Đơn hàng đã được cập nhật thành công.",
        });
        closeDialog(); // Đóng dialog sau khi cập nhật thành công
      } else {
        toast({
          title: "Lỗi",
          description: "Cập nhật thất bại.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi hệ thống",
        description: error?.message || "Đã xảy ra lỗi không xác định.",
        variant: "destructive",
      });
    }
  };
  const [selectedCustomer, setSelectedCustomer] =
    useState<IShippingDetails | null>(null);

  const shippingData: IShippingDetails[] = dataShipper?.data || [];
  const handleViewCustomer = (customer: IShippingDetails) => {
    setSelectedCustomer(customer);
  };

  const closeDialog = () => setSelectedCustomer(null);

  if (!shippingData || shippingData.length === 0) {
    return <p>No orders found.</p>;
  }
  const invoiceStatus = getInvoiceStatus(
    selectedCustomer?.invoice?.invoiceStatus || 0 // Gán 0 nếu invoiceStatus là undefined
  );
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <DataTable columns={columns(handleViewCustomer)} data={shippingData} />
      </div>

      {/* Dialog */}
      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Thông tin chi tiết</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p>
                    <strong>Mã đặt hàng:</strong> {selectedCustomer.invoice.id}
                  </p>
                  <p>
                    <strong>Khách hàng:</strong>{" "}
                    {selectedCustomer.invoice.userVM.fullName}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {selectedCustomer.invoice.totalAmount.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "vnd",
                      }
                    )}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span className={invoiceStatus.className}>
                      {invoiceStatus.text}
                    </span>
                  </p>
                  <p>
                    <strong>Ngày đã giao:</strong>{" "}
                    {selectedCustomer.shippingDate
                      ? formatDate(
                          selectedCustomer.shippingDate,
                          "dd/MM/yyyy HH:mm"
                        )
                      : "Chưa giao hàng"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Nhận hàng tại:</strong>{" "}
                    {selectedCustomer.invoice.storeId} -{" "}
                    {selectedCustomer.invoice.storeName}
                  </p>
                  <p>
                    <strong>Thời gian:</strong>{" "}
                    {formatDate(
                      selectedCustomer.invoice.invoiceDate,
                      "dd/MM/yyyy HH:mm"
                    )}
                  </p>
                  <p>
                    <strong>Ngày giao dự kiến:</strong>{" "}
                    {formatDate(selectedCustomer.estimatedArrival)}
                  </p>
                  <p>
                    <strong>Mua tại:</strong> {selectedCustomer.invoice.buyIn}
                  </p>
                </div>
              </div>
              <div className="border rounded max-h-[250px] overflow-y-auto overflow-hidden">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-2 px-4 border-b text-center">
                        Hình ảnh
                      </th>
                      <th className="py-2 px-4 border-b text-center">
                        Tên hàng
                      </th>
                      <th className="py-2 px-4 border-b text-center">
                        Số lượng
                      </th>
                      <th className="py-2 px-4 border-b text-center">
                        Giá bán
                      </th>
                      <th className="py-2 px-4 border-b text-center">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer.invoice.invoiceDetails.map(
                      (product, index) => (
                        <tr key={index} className="h-9 bg-green-100">
                          <td className="py-2 px-4 border-b text-center">
                            <img
                              src={product.imageUrl}
                              className="w-10 h-10 object-cover mx-auto"
                              alt=""
                            />
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {product.itemName}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {product.quantity}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {product.salePrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "vnd",
                            })}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {product.itemTotalPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "vnd",
                            })}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <div className="flex gap-10">
                  <p>
                    <strong>Tổng tiền hàng:</strong>{" "}
                    {selectedCustomer.invoice.totalAmount.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "vnd",
                      }
                    )}
                  </p>
                  <p>
                    <strong>Giảm giá:</strong>{" "}
                    {selectedCustomer.invoice.discount !== null
                      ? selectedCustomer.invoice.discount.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "vnd",
                          }
                        )
                      : "0 ₫"}
                  </p>
                  <p>
                    <strong>Khác hàng đã trả trước:</strong>{" "}
                    {selectedCustomer.invoice.customerPaid !== null
                      ? selectedCustomer.invoice.customerPaid.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "vnd",
                          }
                        )
                      : "0 ₫"}
                  </p>
                </div>
                <p>
                  <strong>Tiền cần thu:</strong>{" "}
                  {selectedCustomer.invoice.needToPay !== null
                    ? selectedCustomer.invoice.needToPay.toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "vnd",
                        }
                      )
                    : "0"}
                </p>
              </div>
              <div className="mt-4 space-x-10">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white hover:bg-red-400 hover:text-white"
                    >
                      Hủy đơn
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
                    >
                      Cập nhật
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[50vh]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cập nhật đơn hàng</AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="space-y-2 text-black">
                          <Label htmlFor="date">Ngày giao hàng</Label>
                          <Input
                            type="date"
                            id="date"
                            placeholder="Ngày giao hàng"
                            value={deliveryDate || ""}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 mt-5 text-black">
                          <Label htmlFor="payment-method">
                            Hình thức giao hàng
                          </Label>
                          <Select
                            value={paymentMethod?.toString() || ""}
                            onValueChange={(value) =>
                              setPaymentMethod(Number(value))
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Chọn hình thức giao hàng" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Tiền mặt</SelectItem>
                              <SelectItem value="1">Chuyển khoản</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <Button onClick={handleSubmit}>
                        Cập nhật
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <button
              className="mt-4 btn bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeDialog}
            >
              Close
            </button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}