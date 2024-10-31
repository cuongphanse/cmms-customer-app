"use client";
import React, { useState, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Rating from "@mui/material/Rating";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
export default function DetailsPage() {
  const productData = {
    name: "Seeds of Change Organic Quinoa, Brown",
    price: 38,
    originalPrice: 52,
    discount: "26% Off",
    rating: 4,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi.",
    sizeOptions: ["50g", "60g", "80g", "100g", "150g"],
    colors: ["Xanh", "Đỏ", "Vàng", "Tím", "Hồng"],
    sku: "FWM15VKT",
    mfgDate: "Jun 4, 2022",
    shelfLife: "70 days",
    tags: ["Snack", "Organic", "Brown"],
    stock: 8,
    images: [
      {
        src: "https://storage.googleapis.com/a1aa/image/SFugHfITaRQGLyavvykKGxIs1e5hLff8trk68uBVudegeaA7E.jpg",
        alt: "Main product image",
      },
      {
        src: "https://storage.googleapis.com/a1aa/image/Pt3asJ56WfwJICsfzigVqFFzaiL2fJs87zfLHIw3c53OvGwOB.jpg",
        alt: "Mango juice",
      },
      {
        src: "https://storage.googleapis.com/a1aa/image/CVaoYsf7EaW3cyQ5PO0rJNJqHygiftgG9v4d4EXau6GwrBsTA.jpg",
        alt: "Bananas",
      },
      {
        src: "https://storage.googleapis.com/a1aa/image/C0XU1GB0Ic5RFNLgehfcGFac0chmuDqUceOX8AIB4qJeuGwOB.jpg",
        alt: "Sliced watermelon",
      },
      {
        src: "https://storage.googleapis.com/a1aa/image/teabFYGONcWDba9e5R5fWDUTmL8WZPOyrZiUSaJGhJccXDYnA.jpg",
        alt: "Durian fruit",
      },
    ],
  };
  const reviews = [
    {
      name: "Sienna",
      date: "December 4, 2022 at 3:12 pm",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Delectus, suscipit exercitationem accusantium obcaecati quos voluptate nesciunt facilis itaque modi commodi dignissimos sequi repudiandae minus ab deleniti totam officia id incidunt?",
      imageUrl:
        "https://cdn.oneesports.vn/cdn-data/sites/4/2022/11/t1-faker-thumb.jpg",
    },
    {
      name: "Brenna",
      date: "December 4, 2022 at 3:12 pm",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Delectus, suscipit exercitationem accusantium obcaecati quos voluptate nesciunt facilis itaque modi commodi dignissimos sequi repudiandae minus ab deleniti totam officia id incidunt?",
      imageUrl:
        "https://cdn.oneesports.vn/cdn-data/sites/4/2023/03/LeagueofLegends_LCK_Faker_Rose_Wallpaper-1536x864-1-450x253.jpg",
    },
    {
      name: "Gemma",
      date: "December 4, 2022 at 3:12 pm",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Delectus, suscipit exercitationem accusantium obcaecati quos voluptate nesciunt facilis itaque modi commodi dignissimos sequi repudiandae minus ab deleniti totam officia id incidunt?",
      imageUrl:
        "https://phunuso.mediacdn.vn/603486343963435008/2023/11/3/faker-instagram-1-169898142287573429224-1698982303099-1698982303212197077047.png",
    },
  ];
  const fakeProducts = [
    {
      category: "vat_tu_noi_that",
      discount: "Up to 35% off",
      isFavorite: false,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
      title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
      rating: 5.0,
      reviews: 455,
      delivery: "Fast Delivery",
      price: "1,699,699",
      shippingIcon: "fas fa-shipping-fast",
      priceIcon: "fas fa-tag",
    },
    {
      category: "gach",
      discount: "Up to 15% off",
      isFavorite: true,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/HK1eMFUFPXWtOSupifnfYkSQgwdMqxyU1FzRvDN4kjyR74WnA.jpg",
      title: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
      rating: 4.5,
      reviews: 1233,
      delivery: "Best Seller",
      price: "1,199,199",
      shippingIcon: "fas fa-crown",
      priceIcon: "fas fa-tag",
    },
    {
      category: "vat_tu_noi_that",
      discount: "Up to 35% off",
      isFavorite: false,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/7FaRzFXljfSIZSMnL8Ny6WNdTbyIgMoteB0uhfFJ0QrS74WnA.jpg",
      title: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
      rating: 4,
      reviews: 879,
      delivery: "Shipping Today",
      price: "799,199",
      shippingIcon: "fas fa-shipping-fast",
      priceIcon: "fas fa-tag",
    },
    {
      category: "gach",
      discount: "Up to 10% off",
      isFavorite: false,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/w9j3qd5LMxLjG1P0FaAkJoBScpkxfJJfw5edDawzmJlK74WnA.jpg",
      title: "PlayStation®5 Console – 1TB, PRO Controller",
      rating: 4.5,
      reviews: 2957,
      delivery: "Fast Delivery",
      price: "499,199",
      shippingIcon: "fas fa-shipping-fast",
      priceIcon: "fas fa-tag",
    },
    {
      category: "san",
      discount: "Up to 35% off",
      isFavorite: true,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/kTGOfrYVKoTrQyvha64sqOyzbE5EXYyDfkfFuc2T26QN74WnA.jpg",
      title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
      rating: 3.0,
      reviews: 455,
      delivery: "Fast Delivery",
      price: "1,699,199",
      shippingIcon: "fas fa-shipping-fast",
      priceIcon: "fas fa-tag",
    },
    {
      category: "vat_tu_noi_that",
      discount: "Up to 15% off",
      isFavorite: false,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/HK1eMFUFPXWtOSupifnfYkSQgwdMqxyU1FzRvDN4kjyR74WnA.jpg",
      title: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
      rating: 4.5,
      reviews: 1233,
      delivery: "Best Seller",
      price: "1,199,199",
      shippingIcon: "fas fa-crown",
      priceIcon: "fas fa-tag",
    },
    {
      category: "vat_tu_noi_that",
      discount: "Up to 35% off",
      isFavorite: false,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/7FaRzFXljfSIZSMnL8Ny6WNdTbyIgMoteB0uhfFJ0QrS74WnA.jpg",
      title: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
      rating: 4,
      reviews: 879,
      delivery: "Shipping Today",
      price: "799,199",
      shippingIcon: "fas fa-shipping-fast",
      priceIcon: "fas fa-tag",
    },
    {
      category: "san",
      discount: "Up to 10% off",
      isFavorite: false,
      imgSrc:
        "https://storage.googleapis.com/a1aa/image/w9j3qd5LMxLjG1P0FaAkJoBScpkxfJJfw5edDawzmJlK74WnA.jpg",
      title: "PlayStation®5 Console – 1TB, PRO Controller",
      rating: 3.5,
      reviews: 2957,
      delivery: "Fast Delivery",
      price: "499,199",
      shippingIcon: "fas fa-shipping-fast",
      priceIcon: "fas fa-tag",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? productData.images.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === productData.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    openModal();
  };
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setCount(value);
    } else {
      setCount(0);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-[85%] mx-auto lg:w-[70%]">
        <div className="p-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl" href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xl" href="/components">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl">Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-lg">
          <div className="container mx-auto grid gap-8 md:grid-cols-2">
            <div>
              <div className="w-full sm:h-[600px] h-[40vh] m-auto py-5 relative group">
                <div
                  style={{
                    backgroundImage: `url(${productData.images[currentIndex].src})`,
                  }}
                  onClick={handleClick}
                  className="w-full h-full rounded-xl bg-center bg-cover duration-500 cursor-pointer"
                >
                  {/* Left Arrow */}
                  <div
                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                    onClick={prevSlide}
                  >
                    <FaChevronLeft size={30} />
                  </div>
                  {/* Right Arrow */}
                  <div
                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                    onClick={nextSlide}
                  >
                    <FaChevronRight size={30} />
                  </div>
                </div>
              </div>

              {/* Full-size Image Modal */}
              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                  onClick={handleOutsideClick}
                >
                  <div className="relative w-full max-w-4xl">
                    {/* Full-size Image */}
                    <img
                      src={productData.images[currentIndex].src}
                      alt=""
                      className="w-full h-auto rounded-lg"
                    />

                    {/* Prev and Next Buttons */}
                    <button
                      className="absolute top-1/2 left-4 text-white text-3xl transform -translate-y-1/2 p-2 bg-black/40 rounded-full"
                      onClick={prevSlide}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="absolute top-1/2 right-4 text-white text-3xl transform -translate-y-1/2 p-2 bg-black/40 rounded-full"
                      onClick={nextSlide}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}
              <div>
                <div className="flex justify-center w-full py-2 gap-5">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm"
                  >
                    <CarouselContent className="-ml-1">
                      {productData.images.map((slide, slideIndex) => (
                        <CarouselItem
                          key={slideIndex}
                          className="pl-1 basis-1/4"
                        >
                          <img
                            src={slide.src}
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`border-2 h-20 w-20 rounded-sm cursor-pointer ${
                              currentIndex === slideIndex
                                ? " border-red-300"
                                : ""
                            }`}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  {/* {productData.images.map((slide, slideIndex) => (
                    <img
                      src={slide.src}
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className={`border-2 h-20 w-20 rounded-sm cursor-pointer ${
                        currentIndex === slideIndex ? " border-red-300" : ""
                      }`}
                    />
                  ))} */}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-pink-200 text-pink-600 text-xs font-semibold px-2 py-1 rounded">
                  Sale Off
                </span>
              </div>
              <h1 className="text-3xl font-bold">{productData.name}</h1>

              <div className="flex items-center">
                <Rating
                  name="half-rating-read"
                  defaultValue={productData.rating}
                  precision={0.5}
                  readOnly
                />
                <span className="text-gray-600 ml-2">(32 reviews)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-red-500">
                  {productData.price}đ
                </span>
                <span className="text-gray-500 line-through">
                  {productData.originalPrice}đ
                </span>
                <span className="text-red-500 text-sm">
                  {productData.discount}
                </span>
              </div>

              <p className="text-gray-600">{productData.description}</p>

              <div>
                <span className="text-gray-600">Size / Weight:</span>
                <div className="flex items-center mt-2 space-x-2">
                  {productData.sizeOptions.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 hover:bg-red-100 hover:text-red-600 py-1 border rounded ${
                        selectedSize === size ? "bg-red-100 text-red-600" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Options */}
              <div>
                <span className="text-gray-600">Màu sắc:</span>
                <div className="flex items-center mt-2 space-x-2">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 hover:bg-red-100 hover:text-red-600 py-1 border rounded ${
                        selectedColor === color ? "bg-red-100 text-red-600" : ""
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded">
                  <button className="px-3 py-2" onClick={decrement}>
                    -
                  </button>
                  <input
                    type="text"
                    value={count}
                    onChange={handleChange}
                    className="w-12 text-center border-l border-r"
                  />
                  <button className="px-3 py-2" onClick={increment}>
                    +
                  </button>
                </div>
                <button className="flex items-center px-6 py-2 bg-red-500 text-white rounded">
                  <i className="fas fa-shopping-cart mr-2"></i> Thêm vào vỏ hàng
                </button>
                <button className="px-2 py-2 border rounded hover:bg-red-500 hover:text-white transition ease-in-out duration-500 hover:-translate-y-2">
                  <CiHeart size={25} className="font-bold" />
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600">
                  <span className="font-semibold">Type:</span> Organic
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">SKU:</span> {productData.sku}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">MFG:</span>{" "}
                  {productData.mfgDate}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">LIFE:</span>{" "}
                  {productData.shelfLife}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Tags:</span>{" "}
                  {productData.tags.join(", ")}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Stock:</span>{" "}
                  {productData.stock} Items In Stock
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 mt-5 rounded-sm shadow-lg">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-2 lg:w-[400px]">
              <TabsTrigger className="font-bold" value="info">
                Mô tả
              </TabsTrigger>
              <TabsTrigger className="font-bold" value="rating">
                Đánh giá
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="max-w-full m-10 mx-8">
                <h1 className="text-red-600 text-2xl font-bold mb-4">
                  ẤM SIÊU TỐC WMF LONO 0413130011
                </h1>
                <p className="mb-4">
                  ẤM SIÊU TỐC WMF LONO 0413130011 là một sản phẩm tiện ích với
                  thiết kế hiện đại, giúp đun sôi nước nhanh chóng. Ấm được làm
                  từ inox chất lượng cao, có khả năng chống gỉ và dễ dàng vệ
                  sinh. Ngoài ra, sản phẩm còn có các tính năng an toàn như tự
                  ngắt khi nước sôi và đế xoay 360 độ, thuận tiện cho người sử
                  dụng.
                </p>

                <h2 className="text-lg font-bold mb-2">Thông số kỹ thuật:</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>Màu sắc: Bạc, Đen</li>
                  <li>Công suất: 2400 W</li>
                  <li>Dung tích 1.6L</li>
                  <li>
                    Chất liệu cao cấp thép không gỉ 18/10 Cromargan bóng mờ, bền
                    mãi với thời gian
                  </li>
                  <li>Vạch đo nước hiển thị bên ngoài thân ấm: Có</li>
                  <li>Lưới lọc cặn có thể tháo rời</li>
                  <li>Chống cháy, ngắt tự động khi có sự cố về điện: Có</li>
                  <li>Chỉ báo mực nước ngoài: Có</li>
                  <li>
                    Ấm đun nước không dây với đế thiết bị riêng biệt bao gồm
                    trạm lắp
                  </li>
                  <li>Mở nắp một tay bằng cách ấn nút</li>
                  <li>Bộ lọc nước với có thể tháo rời, rửa được</li>
                  <li>Tự động dừng nấu và khóa nắp: Có</li>
                </ul>

                <h2 className="text-lg font-bold mb-2">Tính năng nổi bật:</h2>
                <p className="mb-4">
                  Vẻ bề ngoài hiện đại, sang trọng, thiết kế tinh tế, vượt thời
                  gian phù hợp với mọi phong cách nhà bếp.
                </p>
                <p className="mb-4">
                  Ấm siêu tốc được làm bằng chất liệu thép không gỉ Cromargan
                  giúp sản phẩm mang vẻ đẹp hiện đại, thời thượng, bền bỉ cùng
                  thời gian, có khả năng chống trầy xước tốt, chịu được tính
                  axit và rất an toàn cho sức khỏe người dùng. Trong khi đó,
                  nhựa cao cấp giúp cách nhiệt, cách điện giúp sản phẩm an toàn
                  với người dùng và rất dễ dàng trong quá trình sử dụng.
                </p>
                <p className="mb-4">
                  Với công suất 2400W, bạn có thể đun sôi nước trong khoảng thời
                  gian ngắn. Dung tích 1.6L rất phù hợp cho việc đun nước pha
                  trà, pha cà phê trong buổi trà chiều.
                </p>
                <p className="mb-4">
                  Chất liệu Cromargan không những giúp sản phẩm có độ bền cao mà
                  còn giúp người dùng dễ dàng vệ sinh. Hơn thế nữa, bộ lọc cặn
                  với có thể tháo rời, dễ dàng hơn trong việc vệ sinh cũng như
                  đảm bảo vệ sinh trong quá trình sử dụng.
                </p>
                <p className="mb-4">
                  Thiết kế thông minh, an toàn với chế độ cháy khô, bảo vệ quá
                  nhiệt, tự động ngừng nấu và khóa nắp ấm. Bộ phận làm nóng bằng
                  thép không gỉ được thiết kế an bền trong và cũng an toàn.
                </p>

                <h2 className="text-lg font-bold mb-2">
                  Hãy liên hệ với VLXDgixdat để được tư vấn chọn sản phẩm phù
                  hợp cho gia đình.
                </h2>
                <p className="mb-4">Hotline tư vấn: 0938619989</p>
                <p className="mb-4">
                  VLXDgixdat cam kết chỉ bán hàng chính hãng, nói không với hàng
                  nhái hàng giả và hàng kém chất lượng
                </p>
                <p className="mb-4">
                  Tư vấn chân thành, nhiệt tình và chế độ bảo hành tốt.
                </p>
                <p className="mb-4">Miễn phí giao hàng</p>
              </div>
            </TabsContent>
            <TabsContent value="rating">
              <div className="max-w-full m-10 mx-8">
                <h2 className="text-xl font-semibold mb-4">
                  Customer questions & answers
                </h2>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        alt={`Profile picture of ${review.name}`}
                        className="w-12 h-12 rounded-full object-cover"
                        src={review.imageUrl}
                        width="60"
                        height="60"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-semibold">
                              {review.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {review.date}
                            </p>
                          </div>
                          <Rating
                            name="half-rating-read"
                            defaultValue={review.rating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  Add a review
                </h2>
                <form className="space-y-4">
                  <Rating
                    name="half-rating-read"
                    defaultValue={productData.rating}
                    precision={0.5}
                  />
                  <textarea
                    className="w-full p-4 border rounded-lg"
                    placeholder="Write Comment"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      className="p-4 border rounded-lg"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="p-4 border rounded-lg"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="p-4 border rounded-lg"
                      placeholder="Website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <button
                    className="px-6 py-3 bg-red-500 text-white rounded-lg"
                    type="submit"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <div className="flex items-center justify-center p-5 w-[50%] mx-auto border-b-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Sản phẩm liên quan
            </h2>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-full py-5"
          >
            <CarouselContent className="-ml-1">
              {fakeProducts.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                >
                  <div className="p-2">
                    <Card
                      className="pt-6 max-h-[550px] overflow-hidden hover:overflow-y-auto [&::-webkit-scrollbar]:w-2 rounded-xl
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300 cursor-pointer group"
                    >
                      <CardContent className="flex flex-col items-center">
                        <img
                          src={product.imgSrc}
                          alt={product.title}
                          className="w-full h-72 object-cover mb-4 group-hover:scale-110 ease-in-out duration-300"
                        />
                        <div className="flex w-full justify-between">
                          <div className="bg-blue-400 px-2 py-1 rounded-sm my-1">
                            {product.discount}
                          </div>
                          <div className="flex items-center gap-2 mr-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="text-stone-500 hover:text-black hover:bg-white"
                                >
                                  <HoverCard>
                                    <HoverCardTrigger>
                                      <FaRegEye size={25} />
                                    </HoverCardTrigger>
                                    <HoverCardContent
                                      side="top"
                                      className="w-fit p-2 bg-slate-950 text-white border-none"
                                    >
                                      Xem nhanh
                                    </HoverCardContent>
                                  </HoverCard>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit profile</DialogTitle>
                                  <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Name
                                    </Label>
                                    <Input
                                      id="name"
                                      defaultValue="Pedro Duarte"
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="username"
                                      className="text-right"
                                    >
                                      Username
                                    </Label>
                                    <Input
                                      id="username"
                                      defaultValue="@peduarte"
                                      className="col-span-3"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <HoverCard>
                              <HoverCardTrigger>
                                {product.isFavorite && (
                                  <CiHeart
                                    className="text-stone-500 hover:text-black"
                                    size={25}
                                  />
                                )}
                                {!product.isFavorite && (
                                  <FaHeart className="text-red-300" size={25} />
                                )}
                              </HoverCardTrigger>
                              <HoverCardContent
                                side="top"
                                className="w-fit p-2 bg-slate-950 text-white border-none"
                              >
                                Yêu thích
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                        <h2 className="text-lg font-semibold text-start w-full my-2 lg:h-[55px] hover:text-red-300 transition ease-in-out duration-300 overflow-hidden line-clamp-2 text-ellipsis">
                          {product.title}
                        </h2>
                        <div className="flex w-full justify-start items-center gap-4">
                          <Rating size="small"
                            name="product-rating"
                            value={product.rating}
                            precision={0.5}
                            readOnly
                          />
                          <span className="text-black text-sm font-semibold">
                            {product.rating}
                          </span>
                          <span className="text-gray-600 text-sm overflow-hidden text-ellipsis line-clamp-1">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex w-full justify-between items-center mt-3">
                          <div className="flex gap-2">
                            <div className="text-2xl font-normal text-stone-400 line-through">
                              {product.price}đ
                            </div>
                            <div className="text-2xl font-semibold">
                              {product.price}đ
                            </div>
                          </div>

                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}