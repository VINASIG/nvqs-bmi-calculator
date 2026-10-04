import type { Locale, InputError } from './math.ts';
import type { Indicator } from './military.ts';

export const sources = {
  physique:
    'https://xaydungchinhsach.chinhphu.vn/toan-van-thong-tu-quy-dinh-kham-suc-khoe-cho-cac-doi-tuong-thuoc-quan-ly-cua-bo-quoc-phong-119231211181442997.htm',
  recruitment:
    'https://xaydungchinhsach.chinhphu.vn/thong-tu-68-2025-tt-bqp-sua-doi-bo-sung-mot-so-dieu-ve-tuyen-chon-va-goi-cong-dan-nhap-ngu-119250707223401315.htm',
  amendment:
    'https://xaydungchinhsach.chinhphu.vn/thong-tu-so-106-2025-tt-bqp-sua-doi-bo-sung-quy-dinh-ve-tieu-chuan-suc-khoe-kham-suc-khoe-nghia-vu-quan-su-119251004201237596.htm',
  law: 'https://xaydungchinhsach.chinhphu.vn/van-ban-hop-nhat-133-2026-vbhn-lq-vpqh-luat-nghia-vu-quan-su-119260929164231976.htm',
  review:
    'https://xaydungchinhsach.chinhphu.vn/quy-trinh-so-tuyen-kham-suc-khoe-va-giai-quyet-khieu-nai-trong-thuc-hien-nghia-vu-quan-su-119260903152349204.htm',
  health:
    'https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/healthy-ways-to-gain-weight/',
};
export const copy = {
  vi: {
    brandHome: 'Trang chủ VINASIG',
    title: 'BMI nghĩa vụ quân sự',
    description:
      'Tính BMI và kiểm tra yêu cầu thể lực nghĩa vụ quân sự từ chiều cao, cân nặng và vòng ngực nếu có. Kết luận dễ hiểu, có căn cứ quy định. Tính tại chỗ, không lưu số đo.',
    lead: 'Hiểu BMI và yêu cầu thể lực khi tuyển quân.',
    intro:
      'Kiểm tra chiều cao, cân nặng và BMI theo quy định tuyển quân vào Quân đội Việt Nam. Công cụ giúp hiểu phần thể lực, không thay thế việc khám sức khỏe đầy đủ.',
    formTitle: 'Số đo của bạn',
    bmiFormula:
      'BMI chỉ dùng chiều cao và cân nặng. Lấy cân nặng tính bằng kg chia cho bình phương chiều cao tính bằng mét.',
    height: 'Chiều cao tính bằng cm',
    heightExample: 'Ví dụ 170',
    weightExample: 'Ví dụ 55',
    chestExample: 'Ví dụ 81',
    weight: 'Cân nặng tính bằng kg',
    chest: 'Bổ sung vòng ngực tính bằng cm nếu có',
    table: 'Bảng thể lực',
    male: 'Bảng nam',
    female: 'Bảng nữ',
    chestHint:
      'Vòng ngực chỉ dùng chấm điểm thể lực của bảng nam, không dùng tính BMI. Có thể để trống. Nếu nhập, dùng trung bình số đo khi hít vào và thở ra tối đa. Bảng nữ không chấm chỉ tiêu này.',
    hint: 'Nhập trực tiếp, dấu phẩy hoặc dấu chấm, tối đa 3 chữ số thập phân.',
    automatic: 'Kết quả tự cập nhật khi nhập số đo hoặc đổi bảng thể lực.',
    clear: 'Xóa tất cả',
    privacy: 'Xử lý tại chỗ. Không gửi hay lưu số đo.',
    resultTitle: 'Kết quả',
    empty: 'Nhập chiều cao và cân nặng để xem kết quả.',
    skip: 'Đến công cụ tính BMI',
    navigation: 'Ngôn ngữ',
    footer: 'Một công cụ của VINASIG.',
    sourceLink: 'Mã nguồn',
    noScript:
      'Bật JavaScript để tính tại chỗ. Bảng tiêu chuẩn và hướng dẫn vẫn đọc được khi tắt JavaScript.',
    error: 'Kiểm tra các số đo được đánh dấu.',
    done: 'Đã cập nhật kết quả theo số đo bạn nhập.',
    exact: 'BMI chi tiết hơn là',
    bmiExplanation: 'Vì sao số BMI được làm tròn?',
    bmiNote:
      'Số BMI ở trên được làm tròn cho dễ đọc. Việc xét điều kiện và chấm điểm BMI vẫn dùng số đầy đủ, nên kết quả không đổi chỉ vì làm tròn.',
    rounding:
      'BMI hiển thị 1 chữ số thập phân. So sánh ngưỡng trên giá trị chính xác. Chiều cao, cân nặng, vòng ngực khi chấm điểm được làm tròn đến đơn vị nguyên, phần lẻ từ 0,5 làm tròn lên - Phụ lục I, Mục IV.1.a, Thông tư 105/2023. BMI chỉ tính từ chiều cao và cân nặng bạn nhập, không dùng vòng ngực.',
    score: 'điểm',
    rounded: 'Chấm với số đo làm tròn',
    conclusionTitle: 'Kết luận về việc gọi nhập ngũ',
    callupMet: 'Đủ điều kiện về BMI và thể lực để gọi nhập ngũ',
    callupRejected: 'Không đủ điều kiện gọi nhập ngũ theo số đo đã nhập',
    callupMetScope:
      'Kết luận này xét BMI và các số đo thể lực bạn đã nhập. Đạt phần này có nghĩa là có thể được tuyển, chưa có nghĩa là sẽ bị gọi nhập ngũ. Các yêu cầu sức khỏe khác vẫn cần được kiểm tra khi khám chính thức.',
    callupRejectedScope:
      'Với số đo này, có ít nhất một yêu cầu về BMI hoặc thể lực không đạt. Nếu số đo được ghi nhận chính thức đúng như đã nhập, bạn không đủ điều kiện nhập ngũ theo yêu cầu này. Hãy kiểm tra số đo được ghi đúng khi khám. Kết quả này không hủy giấy gọi đi khám.',
    scoringTitle: 'Vì sao có kết quả này?',
    scoringIntro:
      'Mỗi số đo được chấm từ 1 đến 6 điểm theo bảng quy định. Điểm cao nhất được dùng làm loại thể lực. Vì vậy, chỉ một số đo bị chấm 4 điểm thì phần thể lực đã tương ứng loại 4, dù các số đo khác được chấm 1 hoặc 2 điểm.',
    physiqueRule:
      'Tiêu chuẩn tuyển quân yêu cầu sức khỏe loại 1, 2 hoặc 3 theo điểm a khoản 3 Điều 4 Thông tư 148/2018 - sửa bởi Thông tư 68/2025. Cách cho điểm và phân loại được quy định tại Điều 6 Thông tư 105/2023.',
    missing:
      'Bạn chưa nhập vòng ngực, nên kết quả mới xét chiều cao, cân nặng và BMI. Bổ sung vòng ngực có thể làm kết quả thể lực thay đổi. Vòng ngực không dùng để tính BMI.',
    eligible:
      'Các số đo đã nhập phù hợp với yêu cầu thể lực loại 1, 2 hoặc 3. Những phần khám khác vẫn cần được đánh giá.',
    ineligible:
      'Tiêu chuẩn tuyển quân yêu cầu sức khỏe loại 1, 2 hoặc 3. Kết quả thể lực loại 4, 5 hoặc 6 không đáp ứng yêu cầu này.',
    uncertain:
      'Chưa thể chốt loại thể lực vì bảng quy định không ghi rõ điểm cho số BMI này. Cần cơ quan khám xác nhận cách chấm.',
    bmiWithin:
      'BMI của bạn từ 18,0 đến 29,9, nên đạt yêu cầu riêng về BMI theo điểm c khoản 3 Điều 4 Thông tư 148/2018 - sửa bởi Thông tư 68/2025. Kết quả thể lực vẫn cần đáp ứng loại 1, 2 hoặc 3.',
    bmiOutside:
      'Theo điểm c khoản 3 Điều 4 Thông tư 148/2018/TT-BQP - sửa bởi Thông tư 68/2025/TT-BQP, chỉ số BMI nhỏ hơn 18,0 hoặc lớn hơn 29,9 thuộc trường hợp không gọi nhập ngũ vào Quân đội.',
    lowGap:
      'BMI từ 18,0 đến dưới 18,5 đạt yêu cầu riêng về BMI, nhưng được chấm 4 điểm trong bảng thể lực của Thông tư 105/2023. Vì vậy, kết quả này không đáp ứng yêu cầu tuyển sức khỏe loại 1, 2 hoặc 3.',
    tableGap:
      'BMI tính được nằm giữa hai khoảng ghi trong bảng quy định. Công cụ không tự chọn điểm BMI khi chưa có căn cứ. Cần cơ quan khám làm rõ cách chấm. Các số đo khác và điều kiện riêng về BMI vẫn được kiểm tra.',
    limitation:
      'Công cụ mới tính phần thể lực. Loại sức khỏe cuối cùng còn phụ thuộc khám mắt, tim mạch và các phần khám khác. Kết luận chính thức dùng số đo được ghi nhận khi khám.',
    boundaryTitle: 'Khi số đo gần mốc BMI',
    distance: 'Chênh lệch với cân nặng đã nhập',
    boundaryNote:
      'Các mốc cân nặng này để kiểm tra số đo, không phải mục tiêu tăng hay giảm cân. Ví dụ bên dưới xét sai lệch 0,5 cm và 0,5 kg theo cả hai chiều. Đây không phải mức sai số do pháp luật cho phép.',
    borderline:
      'Bạn đang gần mốc BMI. Sai lệch nhỏ khi đo có thể làm kết quả vượt qua mốc này. Nên yêu cầu đo lại chính thức và kiểm tra số đo được ghi.',
    stable:
      'Trong ví dụ sai lệch số đo ở trên, BMI vẫn nằm cùng phía với hai mốc 18,0 và 29,9. Kết quả khám dùng số đo chính thức.',
    adviceTitle: 'Cân nặng và lời khuyên',
    reference: 'Với chiều cao của bạn, cân nặng tham khảo là',
    weightMethod: 'Cách tính khoảng cân nặng',
    healthScope:
      'Phần này dành cho người từ 20 tuổi, không dùng trong thai kỳ. Đây là thông tin sức khỏe, không phải tiêu chuẩn tuyển quân.',
    referenceNote:
      'Khoảng cân nặng này được tính từ chiều cao của bạn, với BMI từ 18,5 đến 24,9. Hai đầu khoảng được làm tròn đến 0,1 kg, số nhỏ làm tròn lên và số lớn làm tròn xuống để vẫn nằm trong khoảng đó. Nhóm BMI bình thường kéo dài đến dưới 25, nên cân nặng hơi cao hơn số cuối khoảng vẫn có thể thuộc nhóm bình thường.',
    maintain:
      'Cân nặng của bạn ở mức bình thường theo BMI. Không cần cố đạt một số cân duy nhất.',
    underAdvice:
      'Nên hỏi bác sĩ hoặc chuyên gia dinh dưỡng về cách tăng cân phù hợp, nhất là khi bạn yếu, mệt hoặc sụt cân dù không định giảm. Ăn đủ bữa, có thể thêm bữa nhỏ và các món như trứng, cá, thịt hoặc đậu. Không tiếp tục giảm cân.',
    overAdvice:
      'Nên hỏi bác sĩ để biết bạn có cần giảm cân hay không, vì BMI không phân biệt cơ và mỡ. Ăn đủ bữa, thêm rau và vận động phù hợp với sức khỏe. Nếu cần giảm cân, hãy thay đổi từ từ. Tránh nhịn ăn hoặc giảm cân cấp tốc.',
    normalAdvice:
      'Tiếp tục ăn uống đa dạng và vận động phù hợp. Nếu cân nặng thay đổi dù bạn không định tăng hay giảm, hãy hỏi bác sĩ. BMI bình thường không có nghĩa là đã đạt mọi yêu cầu khám sức khỏe nghĩa vụ quân sự.',
    adviceDisclaimer:
      'Khoảng này để tham khảo, không phải số cân bạn bắt buộc phải đạt. Lời khuyên không thay thế việc khám bác sĩ hoặc hướng dẫn riêng từ chuyên gia dinh dưỡng.',
    tableTitle: 'Bảng điểm thể lực và quy tắc',
    tableIntro:
      'Phụ lục I, Mục I Thông tư 105/2023/TT-BQP. Mỗi chỉ tiêu cho điểm 1-6. Điểm cao nhất quyết định loại thể lực tham khảo. Thông tư 106/2025/TT-BQP không sửa bảng này hoặc quy tắc làm tròn số đo tại Mục IV.1.a.',
    headers: [
      'Điểm',
      'Nam cao - cm',
      'Nam nặng - kg',
      'Nam ngực - cm',
      'Nữ cao - cm',
      'Nữ nặng - kg',
      'BMI',
    ],
    tableCaption: 'Bảng thể lực. Có thể cuộn ngang trên màn hình nhỏ',
    legalTitle: 'Điều kiện nhập ngũ và giấy gọi đi khám',
    legalText:
      'Chỉ tuyển sức khỏe loại 1, 2, 3. BMI <18,0 hoặc >29,9 thuộc trường hợp không gọi nhập ngũ vào Quân đội theo Thông tư 68/2025. Cận thị lớn hơn 1,5 diop và viễn thị các mức độ cũng là tiêu chí loại trừ riêng. Công cụ không khám hoặc chấm điểm mắt.',
    examText:
      'Không gọi nhập ngũ khác với không phải đi khám. Theo hướng dẫn của Bộ Quốc phòng, người không đạt thể lực ở sơ tuyển vẫn có thể phải tham gia khám theo giấy gọi. Kết luận ở đây áp dụng cho tiêu chuẩn tuyển nhập ngũ trên số đo đã nhập, không hủy giấy gọi khám.',
    rightsTitle: 'Số đo chính xác và quyền của công dân',
    rightsLaw:
      'Điều 10 khoản 3 Luật Nghĩa vụ quân sự hiện hành cấm gian dối trong đăng ký, sơ tuyển và khám sức khỏe. Khoản 4 cấm lợi dụng chức vụ, quyền hạn làm trái quy định. Đối chiếu bản hợp nhất 133/2026/VBHN-LQ-VPQH, có sửa đổi hiệu lực từ 01/09/2026.',
    disclosure:
      'Điểm đ khoản 3 Điều 6 Thông tư 148/2018 - sửa bởi Thông tư 68/2025 yêu cầu Ủy ban nhân dân cấp xã công khai chỉ tiêu, tiêu chuẩn, danh sách thuộc diện gọi, tạm hoãn, miễn, đủ điều kiện, kết quả sơ tuyển và phân loại sức khỏe, danh sách trúng tuyển tại trụ sở và cổng thông tin điện tử. Bạn có thể đối chiếu thông tin và gửi yêu cầu kiểm tra, đính chính số đo sai.',
    complaint:
      'Nếu không đồng ý với kết luận khám sức khỏe, gửi yêu cầu giám định sức khỏe đến Hội đồng nghĩa vụ quân sự cấp xã để lập hồ sơ chuyển Hội đồng giám định y khoa cấp tỉnh theo hướng dẫn của Bộ Quốc phòng. Với dấu hiệu vi phạm, gửi khiếu nại hoặc tố cáo kèm thông tin, tài liệu thực tế tới cơ quan có thẩm quyền. Điểm e khoản 1 Điều 6 quy định địa phương phải tiếp nhận và giải quyết.',
    privacyTitle: 'Quyền riêng tư',
    privacyText:
      'BMI và kết quả được tính trong trình duyệt. Không có tài khoản, theo dõi hoạt động, lưu số đo hay đưa số đo vào đường dẫn. Đổi ngôn ngữ, xóa hoặc tải lại để bỏ dữ liệu. Cần mạng ở lần tải trang đầu.',
    reviewed:
      'Đối chiếu cách trình bày với nguồn ngày 05-10-2026. Thông tư 68/2025 hiệu lực 01-07-2025. Thông tư 105/2023 hiệu lực 01-01-2024. Thông tư 106/2025 hiệu lực 30-09-2025.',
    englishNote: 'Văn bản tiếng Việt là căn cứ đối chiếu.',
    chooseTitle: 'Bạn nên dùng công cụ nào?',
    chooseMilitary:
      'Dùng công cụ này để kiểm tra BMI và yêu cầu thể lực khi tuyển quân Việt Nam.',
    chooseAdult:
      'Để tham khảo phân loại BMI sức khỏe người lớn theo CDC, dùng công cụ BMI sức khỏe riêng.',
    otherLink: 'Mở BMI sức khỏe',
  },
  en: {
    brandHome: 'VINASIG home',
    title: 'Vietnam Military BMI',
    description:
      'Calculate BMI and check Vietnam military physical requirements using height, weight and optional chest measurement. Clear explanations with official sources. Calculations stay in your browser.',
    lead: 'Understand BMI and the physical requirements for recruitment.',
    intro:
      'Check height, weight and BMI against Vietnam military recruitment rules. This tool covers physical measurements and does not replace a complete health examination.',
    formTitle: 'Your measurements',
    bmiFormula:
      'BMI uses only height and weight. Divide weight in kg by the square of height in metres.',
    height: 'Height in cm',
    heightExample: 'For example 170',
    weightExample: 'For example 55',
    chestExample: 'For example 81',
    weight: 'Weight in kg',
    chest: 'Additional chest measurement in cm if available',
    table: 'Physique table',
    male: 'Male table',
    female: 'Female table',
    chestHint:
      'Chest is a separate male-table physique indicator, not a BMI input. You can leave it blank. If entered, use the average measurement at maximum inhalation and exhalation. The female table does not score it.',
    hint: 'Type directly, with a point or comma and up to 3 decimal places.',
    automatic:
      'Your result updates automatically as you enter measurements or change the physique table.',
    clear: 'Clear all',
    privacy: 'Local processing. Measurements are never sent or saved.',
    resultTitle: 'Your result',
    empty: 'Enter height and weight to see your result.',
    skip: 'Go to the BMI calculator',
    navigation: 'Language',
    footer: 'A VINASIG tool.',
    sourceLink: 'View source',
    noScript:
      'Enable JavaScript to calculate locally. Standards and guidance remain readable without JavaScript.',
    error: 'Check the highlighted measurements.',
    done: 'Results updated from your measurements.',
    exact: 'BMI in more detail is',
    bmiExplanation: 'Why is the BMI number rounded?',
    bmiNote:
      'The BMI above is rounded to make it easier to read. Eligibility and BMI scoring still use the full number, so rounding alone cannot change the result.',
    rounding:
      'BMI displays 1 decimal place. Thresholds use the exact value. Height, weight and chest scores use whole units, with fractions of 0.5 rounded up - Circular 105/2023, Appendix I, Section IV.1.a. BMI uses only the entered height and weight, never chest.',
    score: 'score',
    rounded: 'Scored with rounded measurement',
    conclusionTitle: 'Enlistment eligibility summary',
    callupMet:
      'BMI and entered physical measurements meet enlistment requirements',
    callupRejected: 'Entered measurements do not meet enlistment requirements',
    callupMetScope:
      'This conclusion checks BMI and the physical measurements you entered. Passing this part means recruitment is possible, not that you will be called up. Other health requirements still need assessment at the official examination.',
    callupRejectedScope:
      'At least one BMI or physical requirement is not met. If the officially recorded measurements match your entries, you do not meet that enlistment requirement. Check that your measurements are recorded correctly during the examination. This result does not cancel an examination summons.',
    scoringTitle: 'Why did I get this result?',
    scoringIntro:
      'Each measurement receives 1 to 6 points under the official table. The highest score becomes the physical grade. One measurement with 4 points therefore gives physical grade 4, even if the other measurements receive 1 or 2 points.',
    physiqueRule:
      'Recruitment requires health grade 1, 2 or 3 under point a of clause 3 of Article 4 of Circular 148/2018, amended by Circular 68/2025. Scoring and grading are set out in Article 6 of Circular 105/2023.',
    missing:
      'Chest was not entered, so this result uses height, weight and BMI. Adding chest can change the physical grade. Chest is not used to calculate BMI.',
    eligible:
      'The entered measurements meet the grade 1, 2 or 3 physical requirement. Other parts of the health examination still need assessment.',
    ineligible:
      'Recruitment requires health grade 1, 2 or 3. A physical grade of 4, 5 or 6 does not meet that requirement.',
    uncertain:
      'The physical grade cannot be confirmed because the table does not clearly assign a score to this BMI. The examining authority needs to confirm how it should be scored.',
    bmiWithin:
      'Your BMI is from 18.0 to 29.9 and meets the separate BMI requirement under point c of clause 3 of Article 4 of Circular 148/2018, amended by Circular 68/2025. The physical result still needs to meet grade 1, 2 or 3.',
    bmiOutside:
      'Under point c of clause 3 of Article 4 of Circular 148/2018/TT-BQP, amended by Circular 68/2025/TT-BQP, BMI below 18.0 or above 29.9 falls within cases not called up for enlistment into the Vietnamese military.',
    lowGap:
      'BMI from 18.0 to below 18.5 meets the separate BMI requirement, but receives 4 points in the Circular 105/2023 physical table. It therefore does not meet the grade 1, 2 or 3 recruitment requirement.',
    tableGap:
      'The calculated BMI falls between two ranges printed in the table. This tool does not choose a BMI score without a supported rule. The examining authority needs to clarify how it is scored. Other measurements and the separate BMI requirement are still checked.',
    limitation:
      'This tool only checks physical measurements. The final health grade also depends on eye, heart and other examinations. Official conclusions use the measurements recorded at the examination.',
    boundaryTitle: 'When measurements are near a BMI limit',
    distance: 'Difference from your entered weight',
    boundaryNote:
      'These weight limits help check measurements and are not targets for gaining or losing weight. The example below uses variation of 0.5 cm and 0.5 kg in both directions. This is not a legally allowed measurement error.',
    borderline:
      'Your measurements are near a BMI limit. A small measurement difference can move the result across it. Request official remeasurement and check the recorded values.',
    stable:
      'In the example variation above, BMI stays on the same side of the 18.0 and 29.9 limits. The examination uses official measurements.',
    adviceTitle: 'Your weight and next steps',
    reference: 'At your height, the reference weight range is',
    weightMethod: 'How this weight range is calculated',
    healthScope:
      'This section is for adults aged 20 and older, outside pregnancy. It provides health information, not recruitment standards.',
    referenceNote:
      'This range uses your height and BMI from 18.5 to 24.9. Both ends are rounded to 0.1 kg, the smaller weight up and the larger weight down, to stay within that range. The healthy BMI category extends to below 25, so a weight slightly above the last number may still be in the healthy category.',
    maintain:
      'Your weight is in the healthy BMI category. There is no single weight you need to reach.',
    underAdvice:
      'Ask a doctor or dietitian about a suitable way to gain weight, especially if you feel weak, tired or lose weight without trying. Eat regular meals, add smaller meals if helpful, and include foods such as eggs, fish, meat or beans. Do not continue losing weight.',
    overAdvice:
      'Ask a doctor whether you need to lose weight, because BMI cannot tell muscle from fat. Eat regular meals, include vegetables and stay active in a way that suits your health. If weight loss is needed, make gradual changes. Avoid fasting or rapid weight loss.',
    normalAdvice:
      'Keep eating varied meals and staying active in a way that suits your health. Ask a doctor if your weight changes without trying to gain or lose it. A healthy BMI does not mean every military health requirement is met.',
    adviceDisclaimer:
      'This range is a reference, not a weight you must reach. The guidance does not replace medical care or advice tailored to you by a dietitian.',
    tableTitle: 'Physique scoring table and rules',
    tableIntro:
      'Circular 105/2023/TT-BQP, Appendix I, Section I. Each indicator scores 1-6. The highest score determines the reference physique grade. Circular 106/2025 does not amend this table or the whole-unit rounding rule in Section IV.1.a.',
    headers: [
      'Score',
      'Male height in cm',
      'Male weight in kg',
      'Male chest in cm',
      'Female height in cm',
      'Female weight in kg',
      'BMI',
    ],
    tableCaption:
      'Physique scoring table. Scroll horizontally on narrow screens',
    legalTitle: 'Enlistment criteria and examination notices',
    legalText:
      'Only health grades 1, 2 and 3 are recruited. BMI below 18.0 or above 29.9 is excluded from enlistment under Circular 68/2025. Myopia over 1.5 diopters and hyperopia at any level are separate exclusions. This tool does not examine or score eyesight.',
    examText:
      'An enlistment exclusion is different from an examination exemption. Ministry of Defence guidance says a person failing physique screening may still need to attend an examination when officially called. These results concern enlistment criteria for entered measurements and do not cancel an examination notice.',
    rightsTitle: 'Accurate measurements and citizens’ rights',
    rightsLaw:
      'Article 10 - 3 of the current Military Service Law prohibits dishonesty in registration, preliminary screening and health examinations. Article 10 - 4 prohibits misuse of official powers contrary to the law. See consolidated text 133/2026/VBHN-LQ-VPQH, including amendments effective 1 September 2026.',
    disclosure:
      'Article 6 - 3 - đ of Circular 148/2018, amended by Circular 68/2025, requires commune authorities to publish quotas, standards, call-up, deferral, exemption and eligible lists, preliminary screening and health classifications, and selected candidates at their offices and online portals. Check the information and request verification or correction of inaccurate measurements.',
    complaint:
      'If you disagree with an examination conclusion, request medical assessment through the commune Military Service Council, which prepares the file for the provincial Medical Assessment Council under Ministry guidance. For suspected violations, submit a complaint or denunciation with factual supporting materials to the competent authority. Article 6 - 1 - e requires local authorities to receive and resolve them.',
    privacyTitle: 'Privacy',
    privacyText:
      'BMI and results are calculated in your browser. No account, activity tracking, stored measurements or measurements in URLs. Clear, change language or reload to remove data. The initial load needs an internet connection.',
    reviewed:
      'Presentation checked against sources on 5 October 2026. Circular 68/2025 effective 1 July 2025. Circular 105/2023 effective 1 January 2024. Circular 106/2025 effective 30 September 2025.',
    englishNote:
      'English text is an explanatory translation. The Vietnamese legal text is authoritative.',
    chooseTitle: 'Which tool should you use?',
    chooseMilitary:
      'Use this tool to check BMI and physical requirements for Vietnamese military recruitment.',
    chooseAdult:
      'For CDC adult health BMI categories and a reference weight range, use the separate Adult BMI calculator.',
    otherLink: 'Open Adult BMI',
  },
} as const;
export const indicatorLabels: Record<Locale, Record<Indicator, string>> = {
  vi: {
    height: 'Chiều cao',
    weight: 'Cân nặng',
    chest: 'Vòng ngực',
    bmi: 'BMI',
  },
  en: { height: 'Height', weight: 'Weight', chest: 'Chest', bmi: 'BMI' },
};
export function inputError(
  lang: Locale,
  error: InputError,
  field: 'height' | 'weight' | 'chest',
): string {
  if (error === 'required')
    return lang === 'vi' ? 'Nhập số đo này.' : 'Enter this measurement.';
  if (error === 'decimal')
    return lang === 'vi'
      ? 'Dùng số dương, tối đa 3 chữ số thập phân. Không kèm đơn vị hay dấu tách hàng nghìn.'
      : 'Use a positive number with up to 3 decimal places, without units or thousands separators.';
  const range =
    field === 'height'
      ? '50-300 cm'
      : field === 'weight'
        ? '1-1000 kg'
        : '10-300 cm';
  return lang === 'vi'
    ? `Kiểm tra đơn vị. Số đo cần nằm trong khoảng ${range}.`
    : `Check the unit. Enter a measurement within ${range}.`;
}
