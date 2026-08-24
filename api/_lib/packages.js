// Pacotes da loja MoonMC
// commands: comandos executados pelo console do servidor quando a key e resgatada (%player% = nick)
//
// IMPORTANTE: os ids aqui têm de bater com os ids do bot (bot-loja-semi-auto.js -> PRODUTOS)
// e com os pkg do site (loja.html -> PRODUTOS).
// Os itens usam a sintaxe de componentes 1.20.5+/1.21 (minecraft:enchantments).

export const PACKAGES = {
  /* ===== VIPS ===== */
  vip: {
    name: 'VIP',
    price: 14.9,
    commands: [
      'lp user %player% parent add vip',
      'eco give %player% 5000',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"VIP ativado com sucesso! Aproveite.","color":"white"}]'
    ]
  },
  prime: {
    name: 'PRIME',
    price: 24.9,
    commands: [
      'lp user %player% parent add prime',
      'eco give %player% 15000',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"PRIME ativado com sucesso! Aproveite.","color":"white"}]'
    ]
  },

  /* ===== FERRAMENTAS & ARMAS ===== */
  clava_anti_armor: {
    name: 'Clava Anti-Armor',
    price: 9.9,
    commands: [
      'minecraft:give %player% minecraft:mace[minecraft:enchantments={"minecraft:wind_burst":3,"minecraft:breach":4,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Clava Anti-Armor entregue!","color":"white"}]'
    ]
  },
  clava_pesada: {
    name: 'Clava Pesada',
    price: 9.9,
    commands: [
      'minecraft:give %player% minecraft:mace[minecraft:enchantments={"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Clava Pesada entregue!","color":"white"}]'
    ]
  },
  clava_suprema: {
    name: 'Clava Suprema',
    price: 24.9,
    commands: [
      'minecraft:give %player% minecraft:mace[minecraft:enchantments={"minecraft:wind_burst":3,"minecraft:density":5,"minecraft:breach":4,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Clava Suprema entregue!","color":"white"}]'
    ]
  },
  espada_op: {
    name: 'Espada OP',
    price: 9.9,
    commands: [
      'minecraft:give %player% minecraft:netherite_sword[minecraft:enchantments={"minecraft:sharpness":5,"minecraft:sweeping_edge":3,"minecraft:fire_aspect":2,"minecraft:knockback":2,"minecraft:looting":3,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Espada OP entregue!","color":"white"}]'
    ]
  },
  machado_op: {
    name: 'Machado OP',
    price: 9.9,
    commands: [
      'minecraft:give %player% minecraft:netherite_axe[minecraft:enchantments={"minecraft:sharpness":5,"minecraft:efficiency":5,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Machado OP entregue!","color":"white"}]'
    ]
  },
  picareta_toque_suave: {
    name: 'Picareta Toque Suave',
    price: 7.9,
    commands: [
      'minecraft:give %player% minecraft:netherite_pickaxe[minecraft:enchantments={"minecraft:silk_touch":1,"minecraft:efficiency":5,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Picareta Toque Suave entregue!","color":"white"}]'
    ]
  },
  picareta_fortuna: {
    name: 'Picareta Fortuna',
    price: 7.9,
    commands: [
      'minecraft:give %player% minecraft:netherite_pickaxe[minecraft:enchantments={"minecraft:fortune":3,"minecraft:efficiency":5,"minecraft:unbreaking":3,"minecraft:mending":1}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Picareta Fortuna entregue!","color":"white"}]'
    ]
  },

  /* ===== UTILITÁRIOS ===== */
  shulker_macas_douradas: {
    name: 'Shulker de Maçãs Douradas',
    price: 14.9,
    // Shulker cheia (27 slots x 64 = 1728 maçãs douradas) - formato de itens 1.20.5+
    commands: [
      'minecraft:give %player% minecraft:shulker_box[minecraft:custom_name=\'{"text":"Shulker de Maçãs Douradas","color":"gold","italic":false}\',minecraft:container=[{slot:0,item:{"id":"minecraft:golden_apple","count":64}},{slot:1,item:{"id":"minecraft:golden_apple","count":64}},{slot:2,item:{"id":"minecraft:golden_apple","count":64}},{slot:3,item:{"id":"minecraft:golden_apple","count":64}},{slot:4,item:{"id":"minecraft:golden_apple","count":64}},{slot:5,item:{"id":"minecraft:golden_apple","count":64}},{slot:6,item:{"id":"minecraft:golden_apple","count":64}},{slot:7,item:{"id":"minecraft:golden_apple","count":64}},{slot:8,item:{"id":"minecraft:golden_apple","count":64}},{slot:9,item:{"id":"minecraft:golden_apple","count":64}},{slot:10,item:{"id":"minecraft:golden_apple","count":64}},{slot:11,item:{"id":"minecraft:golden_apple","count":64}},{slot:12,item:{"id":"minecraft:golden_apple","count":64}},{slot:13,item:{"id":"minecraft:golden_apple","count":64}},{slot:14,item:{"id":"minecraft:golden_apple","count":64}},{slot:15,item:{"id":"minecraft:golden_apple","count":64}},{slot:16,item:{"id":"minecraft:golden_apple","count":64}},{slot:17,item:{"id":"minecraft:golden_apple","count":64}},{slot:18,item:{"id":"minecraft:golden_apple","count":64}},{slot:19,item:{"id":"minecraft:golden_apple","count":64}},{slot:20,item:{"id":"minecraft:golden_apple","count":64}},{slot:21,item:{"id":"minecraft:golden_apple","count":64}},{slot:22,item:{"id":"minecraft:golden_apple","count":64}},{slot:23,item:{"id":"minecraft:golden_apple","count":64}},{slot:24,item:{"id":"minecraft:golden_apple","count":64}},{slot:25,item:{"id":"minecraft:golden_apple","count":64}},{slot:26,item:{"id":"minecraft:golden_apple","count":64}}]] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Shulker de Maçãs Douradas entregue!","color":"white"}]'
    ]
  },

  /* ===== CONSUMÍVEIS ===== */
  shulker_foguetes: {
    name: 'Shulker de Foguetes',
    price: 9.9,
    // 27 slots x 64 foguetes = 1728
    commands: [
      'minecraft:give %player% minecraft:red_shulker_box[minecraft:custom_name=\'{"text":"Shulker de Foguetes","color":"gold","italic":false}\',minecraft:container=[{slot:0,item:{"id":"minecraft:firework_rocket","count":64}},{slot:1,item:{"id":"minecraft:firework_rocket","count":64}},{slot:2,item:{"id":"minecraft:firework_rocket","count":64}},{slot:3,item:{"id":"minecraft:firework_rocket","count":64}},{slot:4,item:{"id":"minecraft:firework_rocket","count":64}},{slot:5,item:{"id":"minecraft:firework_rocket","count":64}},{slot:6,item:{"id":"minecraft:firework_rocket","count":64}},{slot:7,item:{"id":"minecraft:firework_rocket","count":64}},{slot:8,item:{"id":"minecraft:firework_rocket","count":64}},{slot:9,item:{"id":"minecraft:firework_rocket","count":64}},{slot:10,item:{"id":"minecraft:firework_rocket","count":64}},{slot:11,item:{"id":"minecraft:firework_rocket","count":64}},{slot:12,item:{"id":"minecraft:firework_rocket","count":64}},{slot:13,item:{"id":"minecraft:firework_rocket","count":64}},{slot:14,item:{"id":"minecraft:firework_rocket","count":64}},{slot:15,item:{"id":"minecraft:firework_rocket","count":64}},{slot:16,item:{"id":"minecraft:firework_rocket","count":64}},{slot:17,item:{"id":"minecraft:firework_rocket","count":64}},{slot:18,item:{"id":"minecraft:firework_rocket","count":64}},{slot:19,item:{"id":"minecraft:firework_rocket","count":64}},{slot:20,item:{"id":"minecraft:firework_rocket","count":64}},{slot:21,item:{"id":"minecraft:firework_rocket","count":64}},{slot:22,item:{"id":"minecraft:firework_rocket","count":64}},{slot:23,item:{"id":"minecraft:firework_rocket","count":64}},{slot:24,item:{"id":"minecraft:firework_rocket","count":64}},{slot:25,item:{"id":"minecraft:firework_rocket","count":64}},{slot:26,item:{"id":"minecraft:firework_rocket","count":64}}]] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Shulker de Foguetes entregue!","color":"white"}]'
    ]
  },
  shulker_totem: {
    name: 'Shulker de Totem',
    price: 19.9,
    // 27 totens (não empilham)
    commands: [
      'minecraft:give %player% minecraft:blue_shulker_box[minecraft:custom_name=\'{"text":"Shulker de Totem","color":"gold","italic":false}\',minecraft:container=[{slot:0,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:1,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:2,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:3,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:4,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:5,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:6,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:7,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:8,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:9,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:10,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:11,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:12,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:13,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:14,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:15,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:16,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:17,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:18,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:19,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:20,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:21,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:22,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:23,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:24,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:25,item:{"id":"minecraft:totem_of_undying","count":1}},{slot:26,item:{"id":"minecraft:totem_of_undying","count":1}}]] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Shulker de Totem entregue!","color":"white"}]'
    ]
  },
  pack_maca_dourada: {
    name: 'Pack Maçã Dourada',
    price: 9.9,
    commands: [
      'minecraft:give %player% minecraft:golden_apple 64',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Pack de Maçãs Douradas entregue!","color":"white"}]'
    ]
  },
  shulker_cpvp: {
    name: 'Shulker cPvP',
    price: 24.9,
    // 1 linha obsidian (9 slots) + 1 linha end crystal (9 slots)
    commands: [
      'minecraft:give %player% minecraft:black_shulker_box[minecraft:custom_name=\'{"text":"Shulker cPvP","color":"gold","italic":false}\',minecraft:container=[{slot:0,item:{"id":"minecraft:obsidian","count":64}},{slot:1,item:{"id":"minecraft:obsidian","count":64}},{slot:2,item:{"id":"minecraft:obsidian","count":64}},{slot:3,item:{"id":"minecraft:obsidian","count":64}},{slot:4,item:{"id":"minecraft:obsidian","count":64}},{slot:5,item:{"id":"minecraft:obsidian","count":64}},{slot:6,item:{"id":"minecraft:obsidian","count":64}},{slot:7,item:{"id":"minecraft:obsidian","count":64}},{slot:8,item:{"id":"minecraft:obsidian","count":64}},{slot:9,item:{"id":"minecraft:end_crystal","count":64}},{slot:10,item:{"id":"minecraft:end_crystal","count":64}},{slot:11,item:{"id":"minecraft:end_crystal","count":64}},{slot:12,item:{"id":"minecraft:end_crystal","count":64}},{slot:13,item:{"id":"minecraft:end_crystal","count":64}},{slot:14,item:{"id":"minecraft:end_crystal","count":64}},{slot:15,item:{"id":"minecraft:end_crystal","count":64}},{slot:16,item:{"id":"minecraft:end_crystal","count":64}},{slot:17,item:{"id":"minecraft:end_crystal","count":64}}]] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Shulker cPvP entregue!","color":"white"}]'
    ]
  },
  shulker_pocao_invisibilidade: {
    name: 'Shulker Poção Invisibilidade',
    price: 14.9,
    // 27 poções de invisibilidade (3:00)
    commands: [
      'minecraft:give %player% minecraft:shulker_box[minecraft:custom_name=\'{"text":"Shulker Poção Invisibilidade","color":"gold","italic":false}\',minecraft:container=[{slot:0,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:1,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:2,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:3,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:4,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:5,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:6,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:7,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:8,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:9,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:10,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:11,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:12,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:13,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:14,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:15,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:16,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:17,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:18,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:19,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:20,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:21,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:22,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:23,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:24,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:25,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}},{slot:26,item:{"id":"minecraft:potion","count":1,"components":{"minecraft:potion_contents":{"potion":"minecraft:invisibility"}}}}]] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Shulker de Poções de Invisibilidade entregue!","color":"white"}]'
    ]
  },
  full_diamond_p4: {
    name: 'Full Dima P4',
    price: 19.9,
    // Armadura completa dentro de shulker renomeada: Helmet, Chestplate, Leggings, Boots - Protection IV, Unbreaking III, Mending, SEM Thorns
    commands: [
      'minecraft:give %player% minecraft:shulker_box[minecraft:custom_name=\'{"text":"Full Dima P4","color":"gold","italic":false}\',minecraft:container=[{slot:0,item:{"id":"minecraft:diamond_helmet","count":1,"components":{"minecraft:enchantments":{"levels":{"minecraft:protection":4,"minecraft:unbreaking":3,"minecraft:mending":1}}}}},{slot:1,item:{"id":"minecraft:diamond_chestplate","count":1,"components":{"minecraft:enchantments":{"levels":{"minecraft:protection":4,"minecraft:unbreaking":3,"minecraft:mending":1}}}}},{slot:2,item:{"id":"minecraft:diamond_leggings","count":1,"components":{"minecraft:enchantments":{"levels":{"minecraft:protection":4,"minecraft:unbreaking":3,"minecraft:mending":1}}}}},{slot:3,item:{"id":"minecraft:diamond_boots","count":1,"components":{"minecraft:enchantments":{"levels":{"minecraft:protection":4,"minecraft:unbreaking":3,"minecraft:mending":1}}}}}] 1',
      'tellraw %player% ["",{"text":"[Loja] ","color":"gold","bold":true},{"text":"Full Dima P4 entregue!","color":"white"}]'
    ]
  }
};
