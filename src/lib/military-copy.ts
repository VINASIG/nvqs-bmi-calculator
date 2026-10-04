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
    title: 'BMI & Phân loại sức khỏe NVQS',
    description:
      'Đối chiếu BMI tuyển quân, điểm thể lực và số đo trong hồ sơ khám NVQS. Có căn cứ pháp lý, phiếu tự đo và hướng dẫn yêu cầu kiểm tra lại. Tính tại chỗ, không lưu dữ liệu.',
    lead: 'Hiểu tiêu chuẩn. Đối chiếu số đo.',
    intro:
      'Công cụ tham khảo tiêu chuẩn tuyển quân vào Quân đội Việt Nam. Chấm các chỉ tiêu thể lực đã nhập. Không thay thế khám sức khỏe đầy đủ hoặc hồ sơ chính thức.',
    formTitle: 'Số đo bạn tự đo',
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
    resultTitle: 'Kết quả đối chiếu',
    empty: 'Nhập số đo để xem BMI và điểm thể lực.',
    skip: 'Đến công cụ đối chiếu',
    navigation: 'Ngôn ngữ',
    footer: 'Một công cụ của VINASIG.',
    sourceLink: 'Mã nguồn',
    noScript:
      'Bật JavaScript để tính tại chỗ. Bảng tiêu chuẩn và hướng dẫn vẫn đọc được khi tắt JavaScript.',
    error: 'Kiểm tra các số đo được đánh dấu.',
    done: 'Đã đối chiếu các chỉ tiêu được nhập.',
    exact: 'BMI chi tiết hơn là',
    bmiExplanation: 'Vì sao số BMI được làm tròn?',
    bmiNote:
      'Số BMI ở trên được làm tròn cho dễ đọc. Việc xét điều kiện và chấm điểm BMI vẫn dùng số đầy đủ, nên kết quả không đổi chỉ vì làm tròn.',
    rounding:
      'BMI hiển thị 1 chữ số thập phân. So sánh ngưỡng trên giá trị chính xác. Chiều cao, cân nặng, vòng ngực khi chấm điểm được làm tròn đến đơn vị nguyên, phần lẻ từ 0,5 làm tròn lên - Phụ lục I, Mục IV.1.a, Thông tư 105/2023. BMI chỉ tính từ chiều cao và cân nặng bạn nhập, không dùng vòng ngực.',
    grade: 'Loại sức khỏe tham khảo theo thể lực đã nhập',
    score: 'điểm',
    rounded: 'Chấm với số đo làm tròn',
    drivers: 'Chỉ tiêu quyết định loại',
    missing:
      'Chưa có vòng ngực. Loại thể lực tham khảo chỉ dựa trên chiều cao, cân nặng và BMI. Thêm vòng ngực có thể làm loại thể lực thay đổi. BMI và kết luận riêng theo tiêu chí BMI vẫn giữ nguyên.',
    eligible:
      'Các chỉ tiêu thể lực đã nhập đáp ứng loại 1, 2 hoặc 3 theo điểm a khoản 3 Điều 4 Thông tư 148/2018 - sửa bởi Thông tư 68/2025. Điều này chưa kết luận đủ mọi điều kiện nhập ngũ.',
    ineligible:
      'Thể lực thuộc loại 4, 5 hoặc 6 nên không đáp ứng tiêu chuẩn tuyển loại 1, 2, 3 tại điểm a khoản 3 Điều 4 Thông tư 148/2018 - sửa bởi Thông tư 68/2025.',
    uncertain:
      'Bảng in để lại khoảng giữa hai mốc thập phân. Cần cơ quan khám làm rõ điểm BMI trước khi chốt loại thể lực.',
    bmiWithin:
      'Theo số đo đã nhập, BMI nằm từ 18,0 đến 29,9 nên không bị loại trực tiếp bởi tiêu chí BMI tại điểm c khoản 3 Điều 4 Thông tư 148/2018 - sửa bởi Thông tư 68/2025. Vẫn phải đáp ứng tiêu chuẩn loại 1, 2, 3.',
    bmiOutside:
      'Theo điểm c khoản 3 Điều 4 Thông tư 148/2018/TT-BQP - sửa bởi Thông tư 68/2025/TT-BQP, chỉ số BMI nhỏ hơn 18,0 hoặc lớn hơn 29,9 thuộc trường hợp không gọi nhập ngũ vào Quân đội.',
    lowGap:
      'BMI từ 18,0 đến dưới 18,5 không bị tiêu chí BMI của Thông tư 68/2025 loại trực tiếp, nhưng điểm BMI là 4 theo bảng thể lực Thông tư 105/2023, nên không đáp ứng tiêu chuẩn tuyển loại 1, 2, 3.',
    tableGap:
      'BMI chưa làm tròn nằm trong khoảng không được ghi tường minh giữa hai dòng của bảng. Công cụ không tự gán điểm bằng một quy tắc làm tròn BMI chưa có căn cứ. Các điểm số đo khác và ngưỡng không gọi nhập ngũ vẫn được đối chiếu độc lập.',
    limitation:
      'Đây là loại thể lực tham khảo, không phải loại sức khỏe tổng thể. Khám mắt, răng-hàm-mặt, tai-mũi-họng, tim mạch, thần kinh, tâm thần và các chỉ tiêu khác có thể làm điểm cao hơn, tức sức khỏe xếp loại kém hơn. Khi số đo trong hồ sơ khác thực tế, cần yêu cầu đo lại chính thức và ghi nhận đúng số đo.',
    boundaryTitle: 'Ngưỡng BMI và vùng biên',
    distance: 'Khoảng cách số học đến ngưỡng',
    boundaryNote:
      'Các mốc kg bên dưới chỉ để kiểm tra số đo, không phải mục tiêu thay đổi cân nặng. Giả định dao động ±0,5 cm và ±0,5 kg là minh họa sai số, không phải dung sai pháp lý.',
    borderline:
      'Vùng biên: trong giả định sai số này, BMI có thể ở hai bên ngưỡng. Đề nghị đo lại chính thức, đối chiếu và ghi nhận số đo trong hồ sơ.',
    stable:
      'Trong giả định sai số minh họa này, BMI không đổi phía so với ngưỡng 18,0 và 29,9. Vẫn cần đối chiếu số đo chính thức.',
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
    comparisonTitle: 'Đối chiếu với hồ sơ khám',
    comparisonIntro:
      'Dùng số tự đo ở trên và nhập số đã ghi trong hồ sơ. Chênh lệch không tự chứng minh có vi phạm. Hãy kiểm tra điều kiện đo và yêu cầu đo lại, ghi nhận hoặc đính chính khi có sai sót.',
    recordHeight: 'Chiều cao trong hồ sơ tính bằng cm',
    recordWeight: 'Cân nặng trong hồ sơ tính bằng kg',
    recordChest: 'Vòng ngực trong hồ sơ tính bằng cm nếu có',
    automaticComparison: 'Chênh lệch tự cập nhật khi nhập số đo trong hồ sơ.',
    comparisonWaiting:
      'Nhập đủ chiều cao và cân nặng ở cả hai bên để đối chiếu.',
    comparisonResult: 'Chênh lệch hồ sơ − tự đo',
    self: 'Số đo bạn tự đo cho kết quả sau',
    record: 'Số đo trong hồ sơ cho kết quả sau',
    comparisonMissing:
      'Chưa đủ số đo vòng ngực ở cả hai bên để so sánh chỉ tiêu này.',
    printTitle: 'Phiếu tự đo để đối chiếu',
    date: 'Ngày tự đo nếu có',
    dateHint: 'Nhập năm-tháng-ngày hoặc chọn trên lịch. Ví dụ 2026-10-03.',
    dateError: 'Nhập ngày có thật theo thứ tự năm-tháng-ngày, hoặc để trống.',
    dateOpen: 'Mở lịch chọn ngày tự đo',
    dateTitle: 'Chọn ngày tự đo',
    dateClose: 'Đóng lịch',
    datePrevious: 'Tháng trước',
    dateNext: 'Tháng sau',
    dateToday: 'Hôm nay',
    dateClear: 'Xóa ngày',
    dateHelp:
      'Dùng phím mũi tên để chọn ngày, Page Up và Page Down đổi tháng. Enter chọn, Escape đóng.',
    weekdays: [
      ['Nhật', 'Chủ nhật'],
      ['Hai', 'Thứ hai'],
      ['Ba', 'Thứ ba'],
      ['Tư', 'Thứ tư'],
      ['Năm', 'Thứ năm'],
      ['Sáu', 'Thứ sáu'],
      ['Bảy', 'Thứ bảy'],
    ],
    witness: 'Người chứng kiến nếu có',
    method: 'Cách đo và ghi chú nếu có',
    print: 'In phiếu tự đo',
    download: 'Tải phiếu văn bản',
    recordNotice:
      'Phiếu tự ghi số đo, không phải phiếu khám chính thức, chứng nhận y tế hoặc kết luận tuyển quân. Không lưu hay gửi thông tin. Bạn tự chọn giữ bản tải xuống hoặc bản in.',
    sheetTitle: 'VINASIG - Phiếu tự ghi số đo',
    blank: 'Không ghi',
    methodDefault:
      'Đo chiều cao khi đi chân trần và đứng thẳng trên nền phẳng. Đo cân nặng bằng cân đặt trên nền phẳng, kiểm tra cân và ghi điều kiện đo. Đo vòng ngực nam ngang núm vú, lấy trung bình khi hít vào và thở ra. Ghi thời điểm, trang phục và dụng cụ để đối chiếu.',
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
      'Nếu không đồng ý với kết luận khám sức khỏe, gửi yêu cầu giám định sức khỏe đến Hội đồng NVQS cấp xã để lập hồ sơ chuyển Hội đồng giám định y khoa cấp tỉnh theo hướng dẫn của Bộ Quốc phòng. Với dấu hiệu vi phạm, gửi khiếu nại hoặc tố cáo kèm thông tin, tài liệu thực tế tới Ủy ban nhân dân/cơ quan có thẩm quyền. Điểm e khoản 1 Điều 6 quy định địa phương phải tiếp nhận và giải quyết. Phiếu tự đo là tài liệu đối chiếu, không tự thay thế kết luận khám.',
    privacyTitle: 'Quyền riêng tư',
    privacyText:
      'Tất cả phép tính, so sánh và tạo phiếu chạy trong trình duyệt. Không tài khoản, cookie, analytics, lưu trữ số đo hay số đo trong URL. Đổi ngôn ngữ, xóa hoặc tải lại để bỏ dữ liệu. Cần mạng ở lần tải trang đầu.',
    reviewed:
      'Đối chiếu nguồn ngày 03/10/2026. Thông tư 68/2025 hiệu lực 01/07/2025. Thông tư 105/2023 hiệu lực 01/01/2024. Thông tư 106/2025 hiệu lực 30/09/2025.',
    englishNote: 'Văn bản tiếng Việt là căn cứ đối chiếu.',
    chooseTitle: 'Bạn nên dùng công cụ nào?',
    chooseMilitary:
      'Dùng công cụ này để đối chiếu tiêu chuẩn thể lực tuyển quân Việt Nam và số đo hồ sơ.',
    chooseAdult:
      'Để tham khảo phân loại BMI sức khỏe người lớn theo CDC, dùng công cụ BMI sức khỏe riêng.',
    otherLink: 'Mở BMI sức khỏe',
  },
  en: {
    brandHome: 'VINASIG home',
    title: 'Vietnam Military BMI & Physique',
    description:
      'Check Vietnam military recruitment BMI thresholds, physique scores and recorded measurements. Includes official sources, a self-measurement record and review guidance. No data collection.',
    lead: 'Understand the rules. Check the measurements.',
    intro:
      'A reference for recruitment into the Vietnamese military. Scores the entered physique indicators. Does not replace a complete health examination or official record.',
    formTitle: 'Your own measurements',
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
    resultTitle: 'Your comparison',
    empty: 'Enter measurements to see BMI and physique scores.',
    skip: 'Skip to the calculator',
    navigation: 'Language',
    footer: 'A VINASIG tool.',
    sourceLink: 'View source',
    noScript:
      'Enable JavaScript to calculate locally. Standards and guidance remain readable without JavaScript.',
    error: 'Check the highlighted measurements.',
    done: 'Entered indicators checked.',
    exact: 'BMI in more detail is',
    bmiExplanation: 'Why is the BMI number rounded?',
    bmiNote:
      'The BMI above is rounded to make it easier to read. Eligibility and BMI scoring still use the full number, so rounding alone cannot change the result.',
    rounding:
      'BMI displays 1 decimal place. Thresholds use the exact value. Height, weight and chest scores use whole units, with fractions of 0.5 rounded up - Circular 105/2023, Appendix I, Section IV.1.a. BMI uses only the entered height and weight, never chest.',
    grade: 'Reference health grade from entered physique indicators',
    score: 'score',
    rounded: 'Scored with rounded measurement',
    drivers: 'Indicators determining the grade',
    missing:
      'Chest was not entered. The reference physique grade uses only height, weight and BMI. Adding chest can change the physique grade. BMI and the separate BMI-criterion conclusion remain unchanged.',
    eligible:
      'Entered physique indicators meet grade 1, 2 or 3 under Article 4 - 3 - a of Circular 148/2018, amended by Circular 68/2025. This does not establish all recruitment requirements.',
    ineligible:
      'Physique grade 4, 5 or 6 does not meet the grade 1, 2 or 3 recruitment standard under Article 4 - 3 - a of Circular 148/2018, amended by Circular 68/2025.',
    uncertain:
      'The printed table leaves a gap between decimal limits. The examining authority needs to clarify the BMI score before confirming a physique grade.',
    bmiWithin:
      'For the entered measurements, BMI is between 18.0 and 29.9, so it is not directly excluded by the BMI criterion in point c of clause 3 of Article 4 of Circular 148/2018, amended by Circular 68/2025. Grade 1, 2 or 3 is still required.',
    bmiOutside:
      'Under point c of clause 3 of Article 4 of Circular 148/2018/TT-BQP, amended by Circular 68/2025/TT-BQP, BMI below 18.0 or above 29.9 falls within cases not called up for enlistment into the Vietnamese military.',
    lowGap:
      'BMI from 18.0 to below 18.5 is not directly excluded by Circular 68/2025, but scores 4 under the Circular 105/2023 physique table and therefore does not meet the grade 1, 2 or 3 recruitment standard.',
    tableGap:
      'The unrounded BMI falls between explicitly printed ranges. This tool does not invent an unsupported BMI rounding rule to assign a score. Other measurement scores and the enlistment-exclusion thresholds are checked independently.',
    limitation:
      'This is a reference physique grade, not an overall health grade. Eye, dental, ear-nose-throat, cardiovascular, neurological, mental-health and other examinations can increase the numerical grade, meaning a poorer classification. If recorded measurements differ from reality, request official remeasurement and correct recording.',
    boundaryTitle: 'BMI thresholds and measurement uncertainty',
    distance: 'Arithmetic distance to the threshold',
    boundaryNote:
      'The kilogram thresholds below are for checking measurements, not weight-change goals. The assumed ±0.5 cm and ±0.5 kg variation illustrates uncertainty. It is not a legal measurement tolerance.',
    borderline:
      'Boundary zone: this assumed variation can move BMI across a threshold. Request official remeasurement and verify that the measurements are correctly recorded.',
    stable:
      'Under this illustrative variation, BMI stays on the same side of the 18.0 and 29.9 thresholds. Official measurements still need verification.',
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
    comparisonTitle: 'Compare with an examination record',
    comparisonIntro:
      'Use your own measurements above and enter those recorded at the examination. A discrepancy alone does not prove misconduct. Check measurement conditions and request official remeasurement, recording or correction when needed.',
    recordHeight: 'Recorded height in cm',
    recordWeight: 'Recorded weight in kg',
    recordChest: 'Recorded chest in cm if available',
    automaticComparison:
      'The comparison updates automatically as you enter recorded measurements.',
    comparisonWaiting:
      'Enter height and weight on both sides to compare the measurements.',
    comparisonResult: 'Difference between the record and your own measurement',
    self: 'Your own measurements give the following result',
    record: 'Measurements in the examination record give the following result',
    comparisonMissing:
      'Chest measurements are needed on both sides to compare this indicator.',
    printTitle: 'A self-measurement record',
    date: 'Measurement date if available',
    dateHint:
      'Enter year-month-day or choose from the calendar. For example 2026-10-03.',
    dateError: 'Enter a real date in year-month-day order, or leave it blank.',
    dateOpen: 'Open measurement-date calendar',
    dateTitle: 'Choose measurement date',
    dateClose: 'Close calendar',
    datePrevious: 'Previous month',
    dateNext: 'Next month',
    dateToday: 'Today',
    dateClear: 'Clear date',
    dateHelp:
      'Use arrow keys to move between days and Page Up or Page Down to change month. Enter selects. Escape closes.',
    weekdays: [
      ['Su', 'Sunday'],
      ['Mo', 'Monday'],
      ['Tu', 'Tuesday'],
      ['We', 'Wednesday'],
      ['Th', 'Thursday'],
      ['Fr', 'Friday'],
      ['Sa', 'Saturday'],
    ],
    witness: 'Witness if available',
    method: 'Measurement method and notes if available',
    print: 'Print self-measurement record',
    download: 'Download text record',
    recordNotice:
      'A personal measurement record, not an official examination form, medical certificate or recruitment conclusion. Nothing is saved or sent. You choose whether to keep a downloaded or printed copy.',
    sheetTitle: 'VINASIG - Personal measurement record',
    blank: 'Not entered',
    methodDefault:
      'Measure height barefoot while standing upright on a flat surface. For weight, check the scales on a flat surface and note measurement conditions. Measure the male chest at nipple level and average inhaling and exhaling. Note time, clothing and equipment for comparison.',
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
      'If you disagree with an examination conclusion, request medical assessment through the commune Military Service Council, which prepares the file for the provincial Medical Assessment Council under Ministry guidance. For suspected violations, submit a complaint or denunciation with factual supporting materials to the competent authority. Article 6 - 1 - e requires local authorities to receive and resolve them. A personal measurement record is supporting material and does not replace an examination conclusion.',
    privacyTitle: 'Privacy',
    privacyText:
      'Calculations, comparisons and record generation happen in your browser. No account, cookies, analytics, measurement storage or measurements in URLs. Clear, change language or reload to remove data. The initial load needs an internet connection.',
    reviewed:
      'Sources checked 3 October 2026. Circular 68/2025 effective 1 July 2025. Circular 105/2023 effective 1 January 2024. Circular 106/2025 effective 30 September 2025.',
    englishNote:
      'English text is an explanatory translation. The Vietnamese legal text is authoritative.',
    chooseTitle: 'Which tool should you use?',
    chooseMilitary:
      'Use this tool for Vietnamese military physique standards and examination-record comparisons.',
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
    ? `Kiểm tra đơn vị. Khoảng nhập kỹ thuật: ${range}.`
    : `Check the unit. Technical input range: ${range}.`;
}
