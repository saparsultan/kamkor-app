"use client";
import {useEmptyModal, useHelpInfoModal, useInfoModal} from "@/store";
import InfoData from "@/components/modals/InfoData";
import EmptyData from "@/components/modals/EmptyData";
import HelpInfo from "@/components/modals/HelpInfo";
import "@/sass/modals.scss";

export default function ModalsAll() {
  const {isShow: isShowInfo} = useInfoModal();
  const {isShow: isShowEmpty} = useEmptyModal();
  const {isShow: isShowHelpInfo} = useHelpInfoModal();

  return (
      <>
        {isShowInfo && <InfoData/>}
        {isShowEmpty && <EmptyData/>}
        {isShowHelpInfo && <HelpInfo/>}
      </>
  );
}
