import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <div className="flex items-center justify-center self-center mx-3 lg:mx-6 w-[35px]">
                <Link href="/" className="block h-full w-full">
                  <Image
                    src="/icons/logo.png"
                    alt="Aronova Logo"
                    width={100}
                    height={150}
                    className="h-full w-full object-contain"
                  />
                </Link>
              </div>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link href={item.url ?? "/"} className="mb-4">
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="mb-4 w-full">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pb-0 border-l flex flex-col">
                        {item.children.map((itemChild, idx) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className="w-fit py-2 text-base"
                          >
                            <Link href={itemChild.url ?? "/"}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}

          {!isAuthenticated && (
            <div className="flex flex-col gap-4 w-full mt-6">
              <Button
                className="rounded-full cursor-pointer w-full h-10"
                variant={"secondary"}
              >
                <Link href="/register" className="text-white w-full">
                  <i className="far fa-user-plus mr-2"></i> Create an account
                </Link>
              </Button>
              <Button
                className="rounded-full cursor-pointer w-full h-10"
                variant={"default"}
              >
                <Link href="/login" className="text-white w-full">
                  <i className="far fa-sign-in mr-2"></i> Login
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
