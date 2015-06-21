package bean;

public class Teacher {
	private int tid;
	private String tname;
	private String tpwd;
	private String tnickname;
	private int tage;
	private String signature;
		
	public Teacher() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Teacher(int tid, String tname, String tpwd, String tnickname,
			int tage, String signature) {
		super();
		this.tid = tid;
		this.tname = tname;
		this.tpwd = tpwd;
		this.tnickname = tnickname;
		this.tage = tage;
		this.signature = signature;
	}



	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public String getTpwd() {
		return tpwd;
	}
	public void setTpwd(String tpwd) {
		this.tpwd = tpwd;
	}
	public String getTnickname() {
		return tnickname;
	}
	public void setTnickname(String tnickname) {
		this.tnickname = tnickname;
	}
	public int getTage() {
		return tage;
	}
	public void setTage(int tage) {
		this.tage = tage;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	
}
