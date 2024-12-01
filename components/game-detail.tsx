'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';


export const GameDetail = () => {

  // 게임의 description을 저장할 상태를 선언합니다.
  return (
    <Card className="-mb-10 w-full bg-white pb-2.5 text-black">
      <CardContent className="grid gap-4">
        <Accordion type="multiple">
          <AccordionItem value="item-1 border-0">
            <AccordionTrigger className="text-[18px] text-base text-black">
              What we need to know (Event Info)
            </AccordionTrigger>
            <AccordionContent
              className="border-0 bg-[#E5E5E5] p-6 text-[#575757] shadow-inner"
              style={{
                boxShadow:
                  'inset 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
