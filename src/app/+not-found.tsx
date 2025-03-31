import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import VcPress from '@/components/vcPress';
import { VcConstant } from '@/utils/constant';
import { VcText } from '@/components/vcText';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons
          name="error-outline"
          size={120}
          color={VcConstant.colors.primary}
        />
        <VcText type="headerLarge" style={styles.errorText} text='404' />
        <VcText type="subHeader" style={styles.messageText} text='Trang không tồn tại!' />
        <Text style={styles.description}>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Text>
      </View>

      <VcPress
        title="Quay về đăng nhập"
        skin="primary"
        onPress={() => router.replace('/')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    gap: 15
  },
  errorText: {
    color: VcConstant.colors.primary,
    marginTop: 20
  },
  messageText: {
    color: VcConstant.colors.black,
  },
  description: {
    textAlign: 'center',
    color: VcConstant.colors.gray,
    marginBottom: 30
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%'
  }
});