#include <iostream>
#include <iomanip>
using namespace std;
int qcal(long long n, long long k, double q){
    double comq[5050][5050]; //com[n][k]=nCk
    double powq[5050]; //qの累乗
    int p = 1000000007; //nCk modPのP  1000000007=10^9+7
    comq[0][0]  = 1;
    powq[0] = 1;
    for (int i = 1; i <= k; i++){
        powq[i] = powq[i-1] * q;
    }
    for (int i = 1; i <= n;i++){
        comq[i][0] = 1;
        for (int j = 1; j <= k; j++){
            comq[i][j] = (double)(comq[i-1][j-1] + powq[j] * comq[i-1][j]);
        }
    }
    return comq[n][k];
}
int main(){
    long long n,k;
    double q;
    int deg;//degree of polynomial - 1
    double a[1010][1010]; //Matrix A
    double b[1010]; // Vector B
    double l[1010][1010];//Matrix L
    double u[1010][1010];//Matrix U
    double tempsum;
    double sampleq[1010]; //sample of q value
    double y[1010];
    double x[1010];
    cin >> n >> k;
    deg = n*k-k*k;
    for (int i = 0; i <= deg; i++){
        if (i % 2){
            sampleq[i] = -(i+1)/2;
        } else {
            sampleq[i] = i/2+1;
        }
    }
    for (int i = 0; i <= deg; i++){
        a[i][0] = 1;
        for (int j = 1; j <= deg; j++){
            a[i][j] = a[i][j-1]*sampleq[i];
        }
        b[i] = qcal(n,k,sampleq[i]);
    }
    //LU分解
    l[0][0] = 1;
    for (int i = 0; i <= deg ;i++){
        for (int j = i; j <= deg; j++){ //loop of U
            tempsum = 0;
            for (int k = 0;k < i;k++) tempsum+=u[k][j]*l[i][k];
            u[i][j] = a[i][j]-tempsum;
        }
        l[i][i] = 1;
        for (int j = (i+1); j <= deg; j++){ //loop of L
            tempsum=0;
            for (int k = 0; k < i;k++) tempsum += u[k][i]*l[j][k];
            l[j][i] = (a[j][i]-tempsum) / u[i][i];
        }
    }
  
    cout << "A" << endl;
    for (int i = 0; i <= deg;i++){
        for (int j = 0; j <= deg; j++){
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
/*    cout << "L" << endl;
    for (int i = 0; i <= deg;i++){
        for (int j = 0; j <= deg; j++){
            cout << l[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl << "U" << endl;
    for (int i = 0; i <= deg;i++){
        for (int j = 0; j <= deg; j++){
            cout << u[i][j] << " ";
        }
        cout << endl;
    }*/
    for (int i = 0; i <= deg; i++){
        tempsum = 0;
        for (int j = 0; j <i;j++){
            tempsum += l[i][j] * y[j];
        }
        y[i] = b[i]-tempsum;
    }
    for (int i = 0; i <= deg; i++){
        tempsum = 0;
        for (int j = 0; j <i;j++){
            tempsum += l[i][j] * y[j];
        }
        y[i] = b[i]-tempsum;
    }
    for (int i = deg; i >= 0; i--){
        tempsum = 0;
        for (int j = i+1; j <= deg; j++){
            tempsum += u[i][j] * x[j];
        }
        x[i] = (y[i] - tempsum) / u[i][i];
    }
    /*
    for (int i = 0; i <= deg; i++){
        cout << x[i] << " ";
    }
    */
}