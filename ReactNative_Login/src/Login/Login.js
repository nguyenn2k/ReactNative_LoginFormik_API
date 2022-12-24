import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Formik, validateYupSchema } from 'formik';
import { useDispatch } from 'react-redux';
import { LoginThunk } from './LoginThunk';
import * as Yup from 'yup'

export default function Login () {
    const lock = require('../assets/lock.png');
    const email = require('../assets/email.png')
    //Định nghĩa Scheme:
    const validScheme = Yup.object().shape({
        //Email: Kiểu dữ liệu là String và không được phép rỗng và có định dạng mặc định là dạng email và đó là bắt buột:
        /**
         * /Email: Kiểu dữ liệu là String và không được phép rỗng và có định dạng mặc định là dạng email:
         * -> email: Yup.string().min(1,'Vui lòng nhập email').email
         * 
         * Email: Kiểu dữ liệu là String và không được phép rỗng và có định dạng mặc định là dạng email và đó là bắt buột:
         * ->email: Yup.string().min(1,'Vui lòng nhập email').email.require
         */
        email: Yup.string().min(1, 'Vui long nhap email').email.require,

        //Password: Kiểu String (Phải bao gồm CHỮ HOA, thường, ký tự đặc biệt và số & Lớn hơn 8 ký tự)
        password: Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
    })
    //dispatch:
    const dispatch = useDispatch()
    //Tạo hàm signIgn:
    const signIn = (data)=>{
        //Khi SignIn-> dispatch:
        dispatch(LoginThunk(data))
    }
  return (
    // Backgroung Tổng:
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.header__title}>Register Now</Text>
        </View>
        {/* Body */}
        <Formik
            //Khởi tạo giá trị mặc định:
            initialValues={
                {
                    //Sẽ có 2 key:
                    email: '',
                    password: '',
                }
            }
            validationSchema={validScheme}
            onSubmit={(value)=> signIn(value)}
        >
            {({errors,handleSubmit,handleChange})=>{
            //Xuất ra thử:
            console.log(errors)
            return <View style={styles.body}>
                {/* Form */}
                <View>
                    {/* Column*/}

                    {/* Email */}
                    <View style={styles.containerInput}>
                        <Text>Email</Text>
                        {/* Row*/}
                        <View style={styles.containerInput__input}>
                            <Image style={styles.containerInput__input__images} source={email}/>
                            <TextInput style={styles.containerInput__input__textInput} onChangeText={handleChange('email')}/>
                        </View>
                    </View>

                    {/* Password */}
                    <View style={styles.containerInput}>
                        <Text>Password</Text>
                        {/* Row*/}
                        <View style={styles.containerInput__input}>
                            <Image style={styles.containerInput__input__images} source={lock}/>
                            <TextInput secureTextEntry={true} style={styles.containerInput__input__textInput} onChangeText={handleChange('password')}/>
                        </View>
                    </View>
                </View>
                {/* Button */}
                {/* Button được hình thành từ 1 View và 1 Text */}
                <TouchableOpacity style={[styles.btn, styles.btn__signIn]} onPress={handleSubmit}>
                    <Text style={[styles.btn__text, styles.btn__text_white]}>SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btn__signUp]}>
                    <Text style={[styles.btn__text, styles.btn__text_green]}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
            }}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#009387'
    },
    header:{
        flex:1,
        // Tại sao dùng justifyContent? Ví chúng ta đang columnn:
        justifyContent:'flex-end',
        //Đang dùng flex-end chỉ có paddingLeft vs paddingBottom:
        paddingLeft: 30,
        paddingBottom: 30,
    },
    header__title:{
        //Màu:
        color:'white',
        //Kích thước cho chữ:
        fontSize:30,
        //Độ đậm nhạt:
        fontWeight:'500'
    },
    body:{
        flex:3,
        //Màu nền:
        backgroundColor:'white',
        //Bo góc trái và phải:
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //Canh 4 góc:
        padding: 30,
    },
    containerInput:{
        borderBottomWidth:1,
        borderBottomColor:'#CCC',
        marginTop:20,
    },
    containerInput__input:{
        //Hiển thị theo dòng:
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    containerInput__input__images:{
        width:24,
        height: 24,
    },
    containerInput__input__textInput:{
        flex:1,
        padding: 2,
    },
    btn:{
        // btn: Thuộc tính dùng chung 2 Button;
        //Mặc định 2 Button là Flex;
        //2 Button đều có bo góc:
        borderRadius: 80,
        //2 Button điều có Text canh giữa:
        justifyContent:'center',
        alignItems:'center',
        //Màu sắc:
        backgroundColor:'white',
        //Chiều cao:
        height:42,
        //Canh trên:
        marginTop: 24,
    },
    btn__signIn:{
        backgroundColor: '#009387',
    },
    btn__signUp:{
        borderColor:'#009387',
        borderWidth: 1,
    },
    btn__text:{
        fontSize: 16,
    },
    btn__text_white:{
        color: 'white',
    },
    btn__text_green:{
        color:'#009387'
    }
})
