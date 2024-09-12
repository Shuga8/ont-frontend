import { useAuthContext } from "../../../hooks/useAuthContext";

const Message = () => {
  const { user } = useAuthContext();

  const welcome = {
    english: `Good afternoon/morning. My name is ${user.user.firstname} 
                ${user.user.lastname}. UNICEF, is conducting a health survey in
                Location TBD concerning the health status of children under-two.
                This information will be used to improve health planning in your
                LGA. We would appreciate 15 minutes of your time and your input
                into these important issues. There are no correct or incorrect
                responses. Your responses will be treated confidentially and
                will not be traceable to you. We hope that this study will
                provide key information about the access to health services and
                child health in the areas where you live.`,
    pidgin: `Good afternoon/morning. My name na ${user.user.firstname} 
                ${user.user.lastname}. UNICEF dey do health survey for Alimosho/Ikorodu E concern the health status of children wey never reach two years. We go use this information take improve health planning for your LGA. We go appreciate if you fit give us 15 minutes of your time and your input on these important issues. No correct or wrong answers dey. We go keep your answers confidential, nobody go fit trace am reach you. We hope say this study go provide key information about access to health services and pikin health for the area wey you dey live.`,
    igbo: `Ezigbo ehihie/ụtụtụ Aha m bụ ${user.user.firstname} 
                ${user.user.lastname}. nzukọ na-akwado na-eme nyocha ahụike na ikorodu/alimosho banyere ọnọdụ ahụike ụmụaka na-erubeghị afọ abụọ. A ga-eji ozi a kwalite atụmatụ ahụike na LGA gị. Anyị ga-enwe ekele maka nkeji iri na ise nke oge gị yana ntinye gị n'okwu ndị a dị mkpa. Enweghị nzaghachi ziri ezi ma ọ bụ ezighi ezi. A ga-emeso nzaghachi gị na nzuzo na agaghị ahụ gị ya. Anyị na-atụ anya na ọmụmụ ihe a ga-enye ozi dị mkpa gbasara ịnweta ọrụ ahụike na ahụike ụmụaka na mpaghara ebe ị bi`,
    hausa: `Inna dagin/sa'a. Sunana ${user.user.firstname} 
                ${user.user.lastname}. UNICEF, na gudanar da binciken lafiya a Alimosho/Ikorodu akan halin lafiyar yara ƙarƙashin shekaru biyu. Wannan bayani za a yi amfani da shi don inganta shirye-shiryen lafiya a ƙaramar hukuma ku. Muna son mu karɓi mintina 15 na lokacinku da shawarwarinku akan waɗannan muhimman batutuwa. Babu amsoshi da suka dace ko kuma marasa dacewa. Amsoshin ku za su kasance a boye kuma ba za a iya samun alaka da ku ba. Muna fatan wannan binciken zai samar da muhimmin bayani game da samun damar kula da lafiya da lafiyar yara a wuraren da kuke zaune.`,
    yoruba: `Ẹ káàárọ̀ /àárọ̀. Orúkọ mi ni ${user.user.firstname} 
                ${user.user.lastname}. UNICEF, ń ṣe ìwádìí ìlera ní Alimosho àti Ikorodu nípa ipò ìlera àwọn ọmọdé tí kò tíì pé ọmọ ọdún méjì. Alaye yii yoo lo lati mu eto ilera dara si ni LGA rẹ. A máa mọrírì ìṣẹ́jú 15 nínú àkókò rẹ àti ìwọlé rẹ sínú àwọn ọ̀rọ̀ pàtàkì wọ̀nyí. Kò sí ìdáhùn tí ó tọ́ tàbí tí kò tọ̀nà. A máa tọpinpin àwọn èsì rẹ ní ìkọ̀kọ̀ kò sì ní ṣe é tọpinpin sí ọ. A nireti pe iwadi yii yoo pese alaye pataki nipa iraye si awọn iṣẹ ilera ati ilera ọmọde ni awọn agbegbe ti o ngbe.
`,
  };

  const goodbye = {
    english:
      "We would like to thank you for your contribution to the research and your time.",
    hausa:
      "Muna so mu gode muku don gudummawar da kuka bayar ga bincike da lokacin ku.",
    igbo: "Ọ ga-amasị anyị ikele gị maka ntinye aka gị na nyocha na oge gị.",
    pidgin:
      "We wan thank you for your contribution to the research and for your time.",
    yoruba: "A  fẹ  dupẹ lọwọ rẹ fun ilowosi rẹ si iwadii ati akoko rẹ",
  };

  return { welcome, goodbye };
};

export default Message;
