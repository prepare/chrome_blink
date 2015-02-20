// Returns a repeatable series of pseudo-random numbers
Math.scriptedRandom = function scriptedRandom()
{
    if (!Math.scriptedRandom.randoms) {
        Math.scriptedRandom.randoms = [0.40280160047244357,0.8864991403587624,0.39105200971991383,0.41112736259173943,0.8175830793648879,0.11881488567162998,0.9217834830851217,0.41500021164072687,0.9085570456965626,0.11826702212834127,0.7138409110316266,0.5241917085480837,0.09004556764384991,0.39585539018542293,0.14154284640287182,0.9106194930666217,0.7818199707110506,0.04824774062645051,0.8997767087536755,0.5471440230250098,0.8495949813395716,0.14285137417858995,0.9030458195614842,0.4910893698647103,0.7390393161862341,0.03378714203545225,0.860496189845957,0.359462740998465,0.4902879612009451,0.2697639042836446,0.9219392952145726,0.03373467132157398,0.9786209016938792,0.68149476902629,0.882583024856906,0.572898770017968,0.7096276919867972,0.7126192221011125,0.9912658533972063,0.20519804684687315,0.7635733553970109,0.3773841575614103,0.6955361346227751,0.8758146049807848,0.8160659120492945,0.6197838124911226,0.706536538296629,0.7595991514435034,0.5829383109616759,0.4441923328881116,0.5405388504921174,0.8364602210169938,0.3869346326156215,0.21037037075048795,0.6948212034510547,0.8599664018768661,0.45531634448809377,0.5018018113923267,0.7830440708357115,0.6216985358026338,0.8872912348654546,0.7037843836954722,0.504136769801442,0.02669005283466077,0.5797179921435741,0.3202939570510266,0.18053615660431616,0.27118404874167595,0.7903072013474569,0.6931330467076661,0.4871160157430526,0.9588765934849515,0.8389067015791809,0.5049334412929292,0.4163478102611135,0.5576470585342715,0.37411278550238947,0.7135859386593038,0.23887104691884994,0.7056855651110809,0.45729282193691134,0.7204582936691392,0.7425416972220604,0.898305211168856,0.8156841149626691,0.2029201775802859,0.4794245918651226,0.6891154771154353,0.9638238791207894,0.9879363831076475,0.24679089023116552,0.8144921151988638,0.16898014730260713,0.04933571491825195,0.1853606310604888,0.35612623363552903,0.4136087123367976,0.5216282445572448,0.005906273613640235,0.2667406244514234,0.10967515507232173,0.3103313005111792,0.7381676913882456,0.3843891622425938,0.4286498112737433,0.3173780778038213,0.17335364882524762,0.5547758059365562,0.11697037570037432,0.9211043961910086,0.001586782281094595,0.669049798356858,0.719960983712208,0.38425325107958785,0.14439089463296853,0.7777660963021992,0.914780551062329,0.7167217045634621,0.9416885981064702,0.9602683754452822,0.23058610885897005,0.4607315927095393,0.5158786692264856,0.3727936895437509,0.5435401618217771,0.2794997386073227,0.5521067732722065,0.25853838597356266,0.2546530576677309,0.9539402215527092,0.8733036363838723,0.6142167037419122,0.14013979031710877,0.32945585964687907,0.16463308509654975,0.988261217711615,0.7062860791135049,0.5501316606766226,0.06282099199612672,0.8324124789016379,0.35653289982887587,0.24844742391651842,0.655853764925084,0.9342270958862393,0.5548005600249397,0.5330123391621804,0.3383842987652795,0.2249093480524185,0.05141271699751388,0.09353457721580499,0.03563926603442024,0.9891442405009383,0.547250099269324,0.6324184195289474,0.056377023019072145,0.5286258815455371,0.6151911358419765,0.5174200960981753,0.2795551220325544,0.4829360011419915,0.7053711934505827,0.17364832394460603,0.507380536993677,0.5446852527301225,0.525042635167503,0.3915692602244994,0.10455659316133549,0.28266126256560037,0.6878399400449544,0.5258723355484531,0.33634356285275124,0.9262608661904284,0.6663780625287341,0.8160969204344307,0.14094174147627397,0.8078489917366993,0.5180041187061016,0.09522309344970765,0.4145316092365103,0.03275643802841959,0.5374539436481213,0.9884308939745794,0.5580350307552308,0.8947619031624691,0.2633064516183485,0.39153234958254374,0.48419943381296443,0.9398840944934097,0.6319761507362016,0.6231654233407068,0.5412700872594817,0.1263565701089597,0.6748738212859602,0.6043143531327668,0.7113331024122113,0.3754522420351637,0.2258318849959559,0.5564911270311527,0.9463720125827808,0.6744154787968917,0.9009521393575483,0.3026061823138065,0.902106148145211,0.6980318765612468,0.821749364874209,0.1415754408303534,0.45843403574937674,0.900838839775342,0.39838010417222053,0.5744108225099793,0.12269392522177376,0.11680120235160049,0.07780792334946242,0.7177677344147897,0.5223123093705216,0.5029835903565323,0.6452031222382575,0.9288754583936536,0.6098292221360976,0.3997364413923288,0.37037048087006924,0.8166719832535237,0.8060225419728191,0.8208629371695514,0.24338500864961418,0.5718403740654887,0.9211669186694393,0.05240207726713367,0.7217126287155378,0.8241508220434891,0.502866084921577,0.6702892769455394,0.5518776236809221,0.40722120525651667,0.16679674627575872,0.35291465667677796,0.4366347666069096,0.520522362329309,0.4193436686970963,0.9090397920967265,0.23178576968227782,0.6234310500432881,0.005658077544373496,0.09530928828535103,0.8632082118947098,0.9404173143861896,0.5938028886885396,0.04515018828453039,0.8392144981022992,0.6780696053421449,0.31585698542923524,0.6083541091570417,0.6075126023998078,0.4643085335680789,0.6335236787020805,0.6324679458665047,0.8887661783438019,0.4931594242775624,0.5304438329909201,0.1695010783940093,0.804624568114348,0.3251162978471798,0.22961791755148112,0.18834028774329475,0.4352161015547887,0.67701883133362,0.6554982241501558,0.9586532916681157,0.0858730660220017,0.268620631782627,0.7069583706124491,0.849334883433457,0.7713858661108585,0.6822517251978869,0.6047454008854671,0.9559526820461977,0.6967271504442799,0.8932175170132972,0.3068084424858952,0.52949286044086,0.1865054295335456,0.5967541703007901,0.6473402453806905,0.847504113264151,0.0016316305853573748,0.422815248101398,0.2558748401961638,0.4884391769247312,0.19724657395726375,0.12316849973200285,0.092974995771877,0.6307539379367391,0.08143490277297558,0.6764109054004824,0.4380870659081671,0.9293167185640506,0.026088905998547053,0.4762431175803035,0.21807717216111588,0.22303251187458287,0.5074270761140748,0.32686824925563684,0.6746652394880844,0.09868007623529065,0.5160412865299924,0.1059027095818439,0.9068399420505575,0.2589060437208535,0.4338768163853683,0.16765298888443642,0.7437841807230302,0.7807254119686435,0.6519989569913591,0.1464701537724911,0.7238744542579514,0.1579527133879963,0.7112539120536548,0.04449988577724429,0.9095802581448016,0.3153986396805377,0.9049371107970071,0.2780211652992392,0.7017251843128937,0.8951727468032263,0.16835552182437644,0.551255302294742,0.9478656677286447,0.7782775153304811,0.5102001593961382,0.9340789708933229,0.06526380407869062,0.8887551505531907,0.30781534747584505,0.4525450265279715,0.9242608556171231,0.05220035698832961,0.331399902855698,0.8381672957158495,0.07773909628285984,0.5609912260253873,0.5795358086840882,0.2583365534703883,0.8624541768163695,0.26734975272200523,0.34729399874214734,0.9702368592704818,0.7708937589874928,0.41140730279097676,0.5225380079460041,0.2962995484919751,0.9065115046252085,0.7388582358783382,0.9903704072303933,0.15543432121883813,0.3846367250125095,0.5894372852469968,0.6724531462753439,0.9200294497050482,0.9349611927452316,0.8927664691082977,0.7260463031595789,0.6602172030416398,0.27053152083909676,0.8232707426991643,0.7113725448545872,0.03836137104703177,0.7395631874630056,0.8384916907355616,0.5298461925843014,0.12495876435421349,0.1819525012662413,0.07568878171764723,0.1013543284970123,0.4621990492857057,0.17942134485553082,0.5345429869063865,0.06398093563689894,0.32758524936045763,0.7252860012116311,0.8818223638841055,0.7884698001614165,0.8119313129279443,0.12957637995927426,0.790217975522493,0.1935146065398653,0.3999921155162119,0.6674854809732574,0.42847871753781974,0.44180565813640393,0.42769629854135977,0.29168958463319095,0.42684893003983837,0.04996717956381253,0.7983869289971827,0.48911565564997295,0.5668245090948532,0.6195243571975847,0.34587141980690483,0.06095269464932042,0.43193897112828633,0.5982877531080916,0.4222664876944695,0.03285868094901493,0.25585071009390553,0.08288454827055547,0.04060278322575744,0.4109776753052034,0.3017888545532659,0.16527847673989762,0.8353585674592101,0.8714432869439215,0.3473236664884368,0.4688626711577469,0.17491414825195173,0.7820896705529139,0.5810929828235382,0.4297623152051877,0.015231653589397508,0.998401877003909,0.1403468046990907,0.8087465776171286,0.6037300110811973,0.8902962416830921,0.20893396772860268,0.5531956146253253,0.5586950078414264,0.9869967908537932,0.45506387970180434,0.25862614822509983,0.7296732192531569,0.6177959878080506,0.2971670899061333,0.4872800523821637,0.7158403870257737,0.1293847421786677,0.5693617968677365,0.26371995604770254,0.3413012937369297,0.2508438365770708,0.93236135082895,0.19722338216249988,0.7333840051355697,0.9849743135203488,0.46328733650189236,0.47026458730467807,0.7369188297246205,0.3947711816964537,0.9192507722970334,0.8477299962415034,0.7980468309475327,0.7730877351821809,0.2855652069140064,0.4944326037049445,0.9287704690027845,0.8452725297982211,0.495408318701856,0.32761242209356856,0.18197812660689378,0.5063738820638386,0.6258358469353225,0.42307944196419767,0.696181092269803,0.7156177785785952,0.38800457044877323,0.19281553253196904,0.6506552648035135,0.5630355526521036,0.9385334239055092,0.9312555798940619,0.6125312794989586,0.8132145389976048,0.6967569327432461,0.393768615738381,0.06912471496924978,0.779084488180971,0.07299285757960419,0.7909573404076311,0.6200202310551052,0.6800233431533088,0.15232837766051682,0.1830433403062836,0.40942052770844684,0.13080919586625378,0.5101549241273454,0.17380980829420026,0.22144800062358752,0.8765464806354355,0.11670003976519222,0.3775683335855456,0.7909825722644955,0.044092049377081936,0.055073880616144225,0.6267115155359319,0.1404416124059081,0.4021797060976642,0.43432038344178364,0.6226845060580803,0.45849331815656896,0.8971982574542976,0.21111303438018683,0.17676882780006567,0.953688835703623,0.6482616707907346,0.3339009798755408,0.873768768214513,0.4316873813195561,0.36981783777932536,0.5283995571212841,0.8113565374218656,0.4693244492957948,0.9360193144232125,0.676617510931854,0.910506231668641,0.8782356548487374,0.5066510427308506,0.28407517740692717,0.4515066782252429,0.4727409316565566,0.35683835174741146,0.38217781874452617,0.2625996392511761,0.5121368945167106,0.4847861423551972,0.8006945637989298,0.2735337686136057,0.28204908887019803,0.39903664141848527,0.6088323204819264,0.6448103397361983,0.32737994628370737,0.27475719026977063,0.8440968640353982,0.7359938429370494,0.8485182429889767,0.04610991573245726,0.9693537154092238,0.9278948828242229,0.12929562671542896,0.07159820621441966,0.35105184575126125,0.1283715414481105,0.5404971183931907,0.13506883435653003,0.10189903020015872,0.6170005740677009,0.9286483558493892,0.7929167606834866,0.5519968073591575,0.41034128536020464,0.6059830489596273,0.7571038644561097,0.6446499138347106,0.6311018199804713,0.9282884117813262,0.7433368087482345,0.2617446315762329,0.14202290174645507,0.9789096526703377,0.5345324303649983,0.8865571445257203,0.3659280437817462,0.15263183980837083,0.2833316592887657,0.9551976662851859,0.007177255119745273,0.6281267975587989,0.9270865707318702,0.5439942905418548,0.9120411369539989,0.6753887858592853,0.25932393700784256,0.45740929080984055,0.6779506409903758,0.31642312524673677,0.1234660219044732,0.09343014848112602,0.2805055222848922,0.4563130421826211,0.2532999633128289,0.21248339871525923,0.2084822073618333,0.9604591303320877,0.4366034913978556,0.9948799237585068,0.9468786092227691,0.1887852070800891,0.9129753950578046,0.37746473652192614,0.04982672401230164,0.4377504747536734,0.27222918498899285,0.3559121100026705,0.8148328148828973,0.895119736853577,0.27741729806988374,0.5525286605360585,0.34919762953612843,0.9645596137105299,0.35342763287640533,0.05822575374423794,0.6002431794070839,0.28711629486042833,0.5635677192190511,0.8826569145930264,0.8147635649958456,0.7312368851766162,0.8983291633885024,0.2182490705597443,0.11212889762228768,0.5503823377892293,0.2759512235764187,0.9122146488689886,0.5916035410908999,0.08071511475402635,0.5789336709207547,0.13820716512305994,0.8478242232686953,0.38172047696156447,0.5760562930144631,0.7781166940825603,0.8072774455916497,0.9120280588567388,0.455585205208317,0.020543936183929412,0.2819354433016551,0.48899557091714607,0.5485604044741766,0.6547179974870374,0.8453837646382786,0.3649322755471488,0.4167551209296822,0.40331746516903744,0.5566370960123078,0.3996726788578893,0.29871356454617976,0.47887932764314084,0.5248596982680539,0.31694879118211045,0.9583333977304089,0.7094156549821681,0.14891328529869824,0.7855860152214701,0.34415782724700766,0.2606025404579018,0.9468974759554944,0.5058783839949772,0.297999803581275,0.4826987904881587,0.71857173448362,0.035141466201814575,0.62262245389755,0.41558265612254974,0.6977014516935225,0.26829861303246516,0.29478923664185647,0.5227002396819649,0.02292833478326366,0.35652270231234034,0.07705776350435696,0.10983121772754528,0.9332763468535973,0.5755615684090003,0.4632802500684188,0.35116289991473915,0.9948588670207462,0.5929780176808024,0.18154316124578154,0.19591105785030455,0.6771492900686102,0.848118183132316,0.3223039048362076,0.9617285821408632,0.7722800414880179,0.7106572891169495,0.017058188569293444,0.6969752841149341,0.06360011969860649,0.9272117744792308,0.6482936724313971,0.871752554491047,0.5451833310281781,0.8962445905880279,0.18283401298468654,0.8912562336266303,0.3435185627748811,0.5164845574258289,0.5559566559064931,0.9635158204303662,0.8103939731653752,0.29150699046044937,0.3579886687723867,0.7155560575032403,0.35065845695820563,0.5166860965623922,0.9432249241244164,0.7812997590663376,0.305050627936167,0.9859037231588288,0.08387513043539371,0.689317227662223,0.3546453189824919,0.5238761387410928,0.7862638215470424,0.7360487411432195,0.7711923940904403,0.43056747803025297,0.5476032544614763,0.5678977340310336,0.6572158595813512,0.8269519837698676,0.5819912201641086,0.5264372981742198,0.8316704141123549,0.8846499863474863,0.3123205422015491,0.17135278143517338,0.9261975809588086,0.6027431746957559,0.3045371115694461,0.3552341476805667,0.4203200672847778,0.3193708552603474,0.6659643606589941,0.8630095957140483,0.6022751660096809,0.4387151247070707,0.4851009517373056,0.09169584889509522,0.13213237986533546,0.7489083966933695,0.9034232254621681,0.8341503426591634,0.5648090725600762,0.746082517200188,0.4088665835600656,0.820669894023179,0.9989088475699112,0.661001107497607,0.4456137122798775,0.4296622879009984,0.3340727520799603,0.7607442078929134,0.8279020561966589,0.5498584972461027,0.4717632152474314,0.924358663579616,0.6960587826073443,0.6599592816363831,0.9356464626899206,0.41009842949458325,0.5243045154606479,0.9859913471089635,0.5565708603507703,0.28644991539719045,0.36372808057988437,0.17785030611690614,0.13009490684144892,0.5050992842321747,0.20367009015924767,0.08320530647561201,0.431585935611085,0.6648198155056777,0.6266392039259147,0.9251003828482238,0.16213453009824014,0.9950473611220007,0.7609983774651766,0.09973005722264296,0.16307174096027005,0.7467503192586593,0.6326157802867777,0.3734192798721694,0.0578368115508169,0.06329173457962076,0.7441830796861011,0.48502028430114513,0.7359182493462778,0.5780167628908608,0.7277339066973579,0.023769862495255593,0.5000789577607433,0.8270430848128363,0.11312644933961633,0.31623405093151796,0.9456940060228547,0.27915922611912675,0.8291133841635256,0.9086476363747602,0.6408245505955185,0.3382218588787233,0.4947821747021667,0.8040102193150717,0.9997560284099337,0.8995694857554368,0.06434709162653754,0.48156896721644743,0.7296320068322271,0.9251388292411057,0.8083030552641969,0.14944982535645823,0.8032147659935126,0.6305720529661384,0.02449420188762909,0.674051125382097,0.777264296904795,0.48103807888973416,0.8069918997618332,0.11285929713065704,0.8262068749527479,0.05894733083385384,0.727789324581525,0.9551782416902381,0.6807080878320654,0.6608321935221703,0.6066765271158314,0.4123912357782904,0.05949972572713146,0.011890295898490723,0.8402031659335844,0.29460984575311183,0.5076775725501019,0.5369618495632716,0.7178056099069331,0.15888570582442252,0.3920577910691769,0.315294499655857,0.15465571598832295,0.29861861574399223,0.8830748092769993,0.8383195185280962,0.6361479017120544,0.7377840744973087,0.9369400762659219,0.15186180134856225,0.3412952652859014,0.14952366014454685,0.04415604939877803,0.13072224526234075,0.04877612416109821,0.7803187755776191,0.8176611330442415,0.43066307456729147,0.15429425246747874,0.22350122091523428,0.38501992234262633,0.029834812520926266,0.4336940392077407,0.09571696449803047,0.7150223183981247,0.3801053172816082,0.43006755198820845,0.14534626581955062,0.8346896291871972,0.628597749224211,0.8423712113138154,0.7329485512957669,0.6663016279536773,0.531461017453792,0.2653203458829412,0.23905325459272286,0.7680499398932094,0.6153397851695026,0.01576934383053768,0.03536175984673284,0.32509774403883973,0.917784060778927,0.19670951142753917,0.09675856265088477,0.22116247342022252,0.07769077367973085,0.7488332352362728,0.6401846160367991,0.5828417304823369,0.8209642166369427,0.9455890170976469,0.5146103601505096,0.056323049616219034,0.6214948997932929,0.4647808258723378,0.571340436381912,0.518714270796028,0.030749268844141284,0.8029614634825668,0.3733167515012048,0.33464248074900477,0.33617394852273813,0.0755528216602061,0.8162736430839979,0.11111931275162813,0.5822894166141234,0.5382250335711171,0.9481392297652267,0.3760346641652447,0.014600625268463337,0.39270888706329693,0.2582648728314158,0.6577176776052069,0.26100751071283945,0.7532325506923871,0.5794794869513621,0.31173719154286067,0.3669782608593713,0.8036302634531773,0.613837857550866,0.7728718574032523,0.6573073764598497,0.3650761606940423,0.8350327847688611,0.3960136102493916,0.8007474615242087,0.16258583737657678,0.5801687881258171,0.8968220306079937,0.8878684285505993,0.4046786499231489,0.4340692583630184,0.40202530725022095,0.8393389544632933,0.769807664570309,0.15741843318446466,0.7316065312976048,0.11097151884388715,0.09831720921132583,0.4173352147533257,0.1529543591444168,0.703914140213241,0.6849545639403885,0.03135614610805928,0.0027476381523290827,0.17955442619489245,0.7712410575576317,0.248454371117267,0.7726153679064547,0.34648840378340723,0.4306023877256561,0.13433050510209543,0.6927992509178814,0.8770101768323267,0.910042020916027,0.07624553566623737,0.4587179424514612,0.6724587817082456,0.01474417048261695,0.8052733013430952,0.2283756734004131,0.309942840742852,0.20932436511354724,0.1146044633884935,0.15721617041026065,0.33217608525053416,0.8834648057275754,0.39298986335889896,0.980633473014754,0.506780958970441,0.46757741620185667,0.5736341046046625,0.06839609056170848,0.5330940706343829,0.7120451520718845,0.34287087216175666,0.6307484226444496,0.9887393852643387,0.7428481377395094,0.04865098793462431,0.6771542172306936,0.9309289962662984,0.12364024767821666,0.02164272778744005,0.7493259235049253,0.9207963472794725,0.8242087260932702,0.4760594495926329,0.13116930338142874,0.5624819316726559,0.6338256223284758,0.7072344746939998,0.489816182055425,0.3405718055277,0.9903355040542481,0.5688166397478509,0.10126424212998908,0.9481174787264864,0.010464956057474462,0.8845164579732886,0.06810915706125514,0.7106027285152128,0.10005815518091347,0.6774141256126641,0.2992091720454437,0.8085545677731534,0.37662056338815975,0.8618088648011017,0.42159071211777194,0.6750985633931582,0.3815549488093494,0.7940246387357007,0.17210323092159965,0.5390020993254158,0.00828336226208292,0.2184695388276454];
        Math.scriptedRandom.index = 0;
    }
    
    if (Math.scriptedRandom.index >= Math.scriptedRandom.randoms.length)
        Math.scriptedRandom.index = 0;
    return Math.scriptedRandom.randoms[Math.scriptedRandom.index++];
}

// Returns a repeatable pseudo-random integer in the range [0, max)
Math.scriptedRandomInt = function scriptedRandomInt(max)
{
    return Math.floor(Math.scriptedRandom() * max);
}
