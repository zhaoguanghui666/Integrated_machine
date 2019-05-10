// id=app
var storage = window.localStorage;
const app = new Vue({
    data() {
        return {
            denglu: true,
            cebian: 1,
            xinzeng: '',
            tj: 1,
            sc: '',
            gsgllinger: true,
            xg: [],
            cke: 1,
            user: '',
            pad: '',
            msge: '',
            imgBase64: [],
            guanggao: true,
            // 需提交的公司内容
            gs_name: '',
            gs_title: '',
            gs_xiangqing: '',
            // 需提交的报修内容
            bx_name: '',
            bx_id: '',
            bx_pic: '',
            bx_xiangqing: '',
            // 新添公司
            bus_desc: '',
            bus_name: '',
            bus_title: '',
            bus_logo: '',
            bus_ywu: '',
            go: [],
            lo:'',
            storeg: '',
            gsid: '',
            xg_01: '',
            bx: [],
            gg: [],
            g_imge: '',
            logo_imge: '',
            meng:false,

        }
    },

    beforeCreate: function () {

        this.denglu = false;
        console.log(2323);
    },
    mounted: function () {
        if (localStorage.getItem('_user')) {
            this.denglu = false;
            axios
                .get('duqugongsi?')
                .then((response) => {
                    console.log(response);
                    this.go = response.data;
                });
            // 维修请求
            axios
                .get('duqugongbx?')
                .then((response) => {
                    console.log(response);
                    this.bx = response.data;
                });
            // 广告请求
            axios
                .get('_guanggao')
                .then((response) => {
                    console.log("==" + response.data);
                    this.gg = response.data;
                });
        }

    },
    methods: {
        cn(e) {
            this.gsgllinger = true;
            this.cebian = e;
        },
        // 修改公司介绍
        tianjia_xg() {
            this.meng = true;
            let params = new URLSearchParams();
            params.append('name', this.bus_name);
            params.append('title', this.bus_title);
            params.append('id', this.gsid);
            params.append('desc', this.bus_desc);
            params.append('logo', this.logo_imge);
            params.append('yewu', this.bus_ywu);
            params.append('lo', this.lo);

            if (this.xg_01 == 1) {
                if (this.bus_name != '' && this.bus_title != '' && this.bus_desc != '' && this.logo_imge != '' && this.bus_ywu != '' && this.lo !='') {
                    // this.bus_logo =  this.logo_imge;
                    axios
                        .post('gs_xinzeng',
                         params, 
                         {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then((response) => {
                           
                            if (response) {
                                // this.meng = false;
                                // this.gsgllinger = true;
                                axios
                                    .get('duqugongsi?')
                                    .then((response) => {
                                        console.log('shuju' + response);
                                        this.go = response.data;
                                        this.meng = false;
                                        this.gsgllinger = true;
                                    });
                            }
                        });

                } else {
                    this.sc = confirm("请填写完整内容!");
                }
            } else {
    
                axios
                    .post('gs_xinzeng', params, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then((response) => {
                       
                        axios
                            .get('duqugongsi?')
                            .then((response) => {
                                console.log('shuju' + response);
                                this.go = response.data;
                                this.meng = false;
                                this.gsgllinger = true;
                            });
                    });
            }



        },
        shanchu(e) {
            this.sc = confirm("确认要删除'" + this.go[e].name + "'吗?");
            if (this.sc) {
                // 删除
                axios
                    .get('_dele?id=' + this.go[e].id)
                    .then((response) => console.log(response));
                this.go.splice(e, 1);
            }


        },
        xiugai(e) {
    
            this.gsgllinger = false;
            this.xg_01 = 1;
            this.gsid = this.go[e].id;
            this.bus_name = this.go[e].bus_name;
            this.bus_title = this.go[e].bus_title;
            this.bus_desc = this.go[e].bus_desc;
            this.logo_imge = this.go[e].bus_logo;
            this.bus_ywu = this.go[e].bus_ywu;
            this.lo =  this.go[e].lo;
            console.log("e::" + this.logo_imge);
            // 
        },
        shanch(e) {
            this.sc = confirm("确认要删除'" + this.bx[e].name + "'吗?");
            if (this.sc) {
                // 删除
                axios
                    .get('_dele_?id=' + this.bx[e].id)
                    .then((response) => console.log(response));
                this.bx.splice(e, 1);
            }

        },
        xiuga(e) {
            this.gsgllinger = false;
            this.xg_01 = 2;
            this.bx_id = this.bx[e].id;
            this.bx_name = this.bx[e].name,
                this.bx_pic = this.bx[e].price,
                this.bx_xiangqing = this.bx[e].detail
        },
        gsg() {
            this.gsgllinger = false;
            this.xg_01 = 0;
            this.bus_name = '';
            this.bus_title = '';
            this.bus_desc = '';
            // bx
            this.bx_name = '';
            // this.bx_id= '',
            this.bx_pic = '';
            this.bx_xiangqing = '';
            this.logo_imge = '';
            this.lo = '';
            this.bus_ywu='';
        },
        inpt() {
            // if(this.cke==1){
            //     console.log(this.gg[0].imge);
            //     // this.imgBase64 =[];
            //     // this.imgBase64=this.gg[0].imge;
            // }else{
            //     // this.imgBase64 = [];
            //     // this.imgBase64=this.gg[1].imge;
            // }
        },
        // 判断输入是不是数字
        changeCount() {
            let int = /^[0-9]*$/;
            if (!int.test(this.bx_pic)) {
                this.sc = confirm("请填写正确的价格格式，纯数字格式");
                this.bx_pic = "";
            }
        },
        // 修改&添加
        tianjia() {
            this.meng = true;
            if (this.xg_01 == 2) {
                if (this.bx_name != '' && this.bx_pic != '' && this.bx_xiangqing != '') {
                    axios
                        .get('bx_xinzeng?name=' + this.bx_name +
                            '&title=' + this.bx_pic +
                            '&id=' + this.bx_id +
                            '&bus_desc=' + this.bx_xiangqing)
                        .then((response) => {
                            if (response) {
                             
                                this.sc = confirm("修改成功!");
                                this.gsgllinger = true;
                                axios
                                    .get('duqugongbx?')
                                    .then((response) => {
                                        console.log(response);
                                        this.bx = response.data;
                                    });
                            }
                        });

                } else {
                    this.sc = confirm("请填写完整内容!");
                }
            } else {
                axios
                    .get('bx_xinzeng?name=' + this.bx_name +
                        '&title=' + this.bx_pic + '&bus_desc=' + this.bx_xiangqing)
                    .then((response) => {
                        if (response) {
                            
                            this.sc = confirm("添加成功!请刷新!");
                            this.gsgllinger = true;
                            if (response) {

                                this.gsgllinger = true;
                                axios
                                    .get('duqugongbx?')
                                    .then((response) => {
                                        console.log(response);
                                        this.bx = response.data;
                                    });
                            }

                        }
                    });

            }


        },
        tijiao() {
            let params = new URLSearchParams();
            if (this.cke == 1) {
                // 首页
                console.log("huhu" + this.g_imge);
                let id = 1;
                params.append('id', id);
                params.append('img', this.g_imge);
                axios
                    .post("gg_xinzeng",
                        params,
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                    .then((response) => {
                        if (response) {
                            this.sc = confirm("修改/添加成功!");
                            if (this.sc) {
                                // 
                                axios
                                    .get('_guanggao')
                                    .then((response) => {
                                        console.log("==" + response.data);
                                        this.gg = response.data;
                                        this.guanggao = true;
                                    });
                                // 
                            }
                        }
                    })
                    .catch((err) => console.log('错误!' + err));

            } else {
                let id = 2;
                params.append('id', id);
                params.append('img', this.g_imge);
                axios
                    .post("gg_xinzeng",
                        params,
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                    .then((response) => {
                        if (response) {
                            this.sc = confirm("修改/添加成功!");
                            if (this.sc) {
                                // 
                                axios
                                    .get('_guanggao')
                                    .then((response) => {
                                        console.log("==" + response.data);
                                        this.gg = response.data;
                                        this.guanggao = true;
                                    });
                                // 
                            }
                        }
                    })
            }
        },
        // 广告删除
        gg_shanchu(e) {
            axios
                .get('gg_shanchu?id=' + e)
                .then((response) => {
                    if (response) {
                        this.sc = confirm("删除成功!");
                        if (this.sc) {
                            // 
                            axios
                                .get('_guanggao')
                                .then((response) => {
                                    console.log("==" + response.data);
                                    this.gg = response.data;
                                });
                            // 
                        }
                    }

                });

        },
        dengl() {
            let params = new URLSearchParams();
            params.append('user', this.user);
            params.append('pad', this.pad);
            //axios.defaults.withCredentials = true;
            axios
                .post('_user',
                    params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }

                )
                .then((response) => {
                    
                    if (response.data != '') {
                        localStorage.setItem('_user', response.config.data);
                        this.storeg = localStorage.getItem('_user');
                        this.denglu = false;
                    } else {
                        this.sc = confirm("输入的密码或账号错误，请重新输入!");
                    }
                });
            // 请求数据
            console.log("初始请求");
            axios
                .get('duqugongsi?')
                .then((response) => {
                    this.go = response.data;
                    console.log(this.go);
                });
        },
        logo() {
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader();
            //转base64
            reader.onload = (e) => {
                _this.imgBase64 = [];
                this.logo_imge = e.target.result;

                _this.imgBase64.push(e.target.result);
            }
            reader.readAsDataURL(file);
        },
        lo1() {
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader();
            //转base64
            reader.onload = (e) => {
                _this.imgBase64 = [];
                console.log("===::"+e.target.result);
                this.lo = e.target.result;

                _this.imgBase64.push(e.target.result);
            }
            reader.readAsDataURL(file);
        },
        tupian(e) {
            console.dir(e);
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader();
            //转base64
            reader.onload = (e) => {
                _this.imgBase64 = [];
                this.g_imge = e.target.result;
                _this.imgBase64.push(e.target.result);
                console.log(this.g_imge);
            }
            reader.readAsDataURL(file);
        },
        tuich() {
            this.sc = confirm("是否退出后台.并删除登陆信息?");
            if (this.sc) {
                storage[1] == '';
                this.denglu = true;
                this.user == '';
                this.pad == '';
                alert('退出成功!');

            }
        }
    },
}).$mount('#app')
