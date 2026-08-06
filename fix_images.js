const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/api/buffet', 'utf8'));

// Map placeholder images to correct real images based on dish names
const imageMap = {
    // Starters
    "chicken_satay_new.jpg": "90fda180-3c60-4ede-b8f6-d23ece956883.jpg",  // use pork satay (similar)
    "sai_ua_new.jpg": "Pork Sausage Saladbox.jpg",
    "isan_sausage_new.jpg": "Pork Sausage Saladbox.jpg",
    "thung_thong_new.jpg": "ec66c9e5-348b-49d0-b53a-94f58b3b941f.jpg",
    "goong_hom_sabai.jpg": "Khao Kriap Pak Mor.jpg",
    "tod_mun_goong.jpg": "de8fafb8-521d-4420-9913-62aafbe3f5e4.jpg",
    "tom_yum_goong.jpg": "31069432-168d-44ec-b0e9-80f828aa322e.jpg",
    "crispy_prawn_spring_rolls.jpg": "fd82bc4b-8027-41f2-a6f9-97c217d7297f.jpg",
    "fresh_spring_rolls_enoki.jpg": "a763fe7b-c7e7-4b7c-8a93-5da8057971ad.jpg",
    "tom_kha_chicken.jpg": "446681d2.jpg",
    "tom_kha_prawn.jpg": "446681d2.jpg",
    
    // Mains - Curries  
    "green_curry_chicken_pork.jpg": "Green Curry Chicken launch box.jpg",
    "green_curry_pork.jpg": "Green Curry Chicken launch box.jpg",
    "green_curry_prawns.jpg": "Green Curry Chicken launch box.jpg",
    "green_curry_beef.jpg": "Green Curry Chicken launch box.jpg",
    "green_curry_veg.jpg": "Green Curry Chicken launch box.jpg",
    "thai_curry_chicken.jpg": "panang curry.jpg",
    "panang_pork.jpg": "panang curry.jpg",
    "panang_chicken.jpg": "panang curry.jpg",
    "panang_beef.jpg": "panang curry.jpg",
    "panang_prawns.jpg": "panang curry.jpg",
    "panang_curry_veg.jpg": "panang curry.jpg",
    "taepo_beef.jpg": "Gaeng Moo Tae Po.jpg",
    "taepo_chicken.jpg": "Gaeng Moo Tae Po.jpg",
    "taepo_prawn.jpg": "Gaeng Moo Tae Po.jpg",
    "taepo_pork_new.jpg": "Gaeng Moo Tae Po.jpg",
    "taepo_porkbelly.jpg": "Gaeng Moo Tae Po.jpg",
    "taepo_veg.jpg": "Gaeng Moo Tae Po.jpg",
    "crab_curry.jpg": "Crab Meat Curry.jpg",
    
    // Mains - Fish & Seafood
    "seabass_fishsauce.jpg": "pla seabass lui suan.jpg",
    "seabass_3flavor.jpg": "pla seabass lui suan.jpg",
    "gaeng_som_pae_sa.jpg": "780f7b8bb98d.jpg",
    "steamed_seabass_lime.jpg": "pla seabass lui suan.jpg",
    "steamed_squid_lime.jpg": "Spicy Stuffed Squid Salad box.jpg",
    "grilled_river_prawns.jpg": "a165f8a8-9de3-432d-8fe2-1760a2f1710b.jpg",
    "squid_chili_paste.jpg": "spicy stuffed squid salad.jpg",
    "phad_cha_seabass.jpg": "sea_bass_lui_suan.jpg",
    
    // Mains - Stir-fried
    "pad_phed_pork_updated.jpg": "Pad Phed1.jpg",
    "pad_phed_beef_final.jpg": "Pad Phed 5.jpg",
    "sweet_sour_seabass.jpg": "sweet_sour_chicken.jpg",
    "stir_fried_chicken_ginger.jpg": "moo krob kau prik klua.jpg",
    
    // Mains - Grilled
    "nam_prik_kapi.jpg": "Kor Moo Yang sum tum.jpg",
    "grilled_pork_neck_new.jpg": "Grilled Pork Neck.jpg",
    "crying_tiger.jpg": "Kor Moo Yang sum tum.jpg",
    "pla_goong.jpg": "Saeng Wa Prawn Salad box.jpg",
    "grilled_chicken.jpg": "Hat Yai Fried Chicken.jpg",
    "hatyai_fried_chicken.jpg": "Hat Yai Fried Chicken (2).jpg",
    
    // Rice & Noodles
    "pineapple_fried_rice.jpg": "Prawn Fried Rice.jpg",
    "pad_thai_prawns.jpg": "780f7b8bb98d.jpg",
    "pad_thai_chicken.jpg": "780f7b8bb98d.jpg",
    "pad_thai_veg.jpg": "780f7b8bb98d.jpg",
    "yum_woon_sen_shrimp.jpg": "Glass Noodle Salad  box.jpg",
    "yum_woon_sen_moo_yor.jpg": "Glass Noodle Salad  box.jpg",
    
    // Vegetables
    "bok_choy.jpg": "f7c5f80d-eea3-43ea-b086-42896599d5eb.jpg",
    "asparagus.jpg": "f7c5f80d-eea3-43ea-b086-42896599d5eb.jpg",
    
    // Desserts
    "krong_krang_butterfly_pea.jpg": "Butterfly Pea Tapioca Shells with Young Coconut.jpg",
    "bua_loy_sago.jpg": "Sago Balls with Coconut Milk.jpg",
    "bua_loy_5_color.jpg": "Sweet Potato & Pumpkin Bua Loy.jpg",
    "lod_chong_butterfly_pea.jpg": "Butterfly Pea Pandan Lod Chong1.jpg",
    "khanom_tom.jpg": "Thai Khanom Tom.jpg",
    "khanom_chan_pandan.jpg": "Pandan Layer Sweet Cake.jpg",
    "khanom_chan_butterfly_pea.jpg": "Butterfly Pea Layer Sweet Cake.jpg",
    "pandan_coconut_jelly.jpg": "Pandan Coconut Jelly.jpg",
    "butterfly_pea_coconut_jelly.jpg": "Butterfly Pea Coconut Jelly with Young Coconut.jpg",
    "khanom_mo_kaeng.jpg": "Thai Khanom Tom.jpg",
    "khanom_piak_poon.jpg": "Sago Balls with Coconut Milk.jpg",
    "tako_corn.jpg": "Sweet Corn Som Tum Kratong Tong1.jpg",
    "tako_taro.jpg": "Pandan Coconut Jelly.jpg",
    "coconut_ice_cream.jpg": "Thapthim krop With Chestnuts milk.jpg",
    "mango_ice_cream.jpg": "mango sticky rice.jpeg"
};

let updated = 0;
data.forEach(cat => {
    cat.items.forEach(item => {
        if (imageMap[item.img]) {
            const oldImg = item.img;
            item.img = imageMap[item.img];
            console.log(`FIXED: ${item.th} => ${oldImg} -> ${item.img}`);
            updated++;
        }
    });
});

fs.writeFileSync('public/api/buffet', JSON.stringify(data, null, 4), 'utf8');
console.log(`\nTotal updated: ${updated}`);
