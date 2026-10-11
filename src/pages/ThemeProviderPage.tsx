import { useEffect, useState } from "react";
import { ThemeProvider, styled } from "styled-components";
import { useTheme } from "../hooks/useTheme";
import { lightTheme, darkTheme } from "../themes/theme";

const Page = styled.main`
  min-height: 100vh;
  padding: 48px 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition:
    background 0.2s,
    color 0.2s;
`;

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
`;

const Card = styled.section`
  padding: 28px;
  border-radius: 18px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  margin: 8px 0;
  font-size: 30px;
`;

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.muted};
  font-size: 14px;
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 12px 16px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
`;

const Divider = styled.hr`
  margin: 26px 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

function ProfileSettings() {
  const { theme, toggleTheme } = useTheme("provider-theme");

  const [name, setName] = useState(() => {
    return localStorage.getItem("profile-name") ?? "Frontend Developer";
  });

  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("profile-notifications") !== "false";
  });

  useEffect(() => {
    localStorage.setItem("profile-name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("profile-notifications", String(notifications));
  }, [notifications]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Page>
        <Container>
          <Header>
            <div>
              <Muted>EXPERIMENT 03</Muted>
              <Title>Profile Settings</Title>
              <Muted>ThemeProvider를 활용한 사용자 설정</Muted>
            </div>

            <Button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Header>

          <Card>
            <h2>내 프로필</h2>
            <Muted>개인 정보를 설정하고 미리 확인하세요.</Muted>

            <Divider />

            <h3>{name || "이름 없음"}</h3>
            <Muted>실시간 프로필 미리보기</Muted>

            <Divider />

            <label htmlFor="profile-name">표시 이름</label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              placeholder="이름을 입력하세요"
            />

            <SettingRow>
              <div>
                <strong>알림 받기</strong>
                <Muted>서비스 알림 수신 여부를 설정합니다.</Muted>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                aria-label="알림 받기"
              />
            </SettingRow>
          </Card>
        </Container>
      </Page>
    </ThemeProvider>
  );
}

export default ProfileSettings;
